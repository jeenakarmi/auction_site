from django.contrib.auth import get_user_model, login, logout
from rest_framework.authentication import SessionAuthentication
from rest_framework.views import APIView
from rest_framework.parsers import MultiPartParser, FormParser
from rest_framework.response import Response
from .serializers import UserRegisterSerializer, UserLoginSerializer, UserSerializer, UserPublicSerializer, BidItemCreationSerializer, BidItemSerializer
from rest_framework import permissions, status
from .validations import custom_validation, validate_email, validate_password, validate_userType
from .models import BidItem, AppUser

from django.core.mail import send_mail
from django.http import JsonResponse
from django.views import View
from django.views.decorators.csrf import csrf_exempt
import json
import os
from django.conf import settings


class UserRegister(APIView):
    # anyone can register
    permission_classes = (permissions.AllowAny,)
    def post(self, request):
        # validate the data to be clean using our custom validation method
        clean_data = custom_validation(request.data)
        serializer = UserRegisterSerializer(data=clean_data)
        if serializer.is_valid(raise_exception=True):
            user = serializer.create(clean_data)
            if user:
                return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(status=status.HTTP_400_BAD_REQUEST)

class UserLogin(APIView):
    # anyone can login
    permission_classes = (permissions.AllowAny,)
    authentication_classes = (SessionAuthentication, )
    ##
    def post(self, request):
        data = request.data
        assert validate_email(data)
        assert validate_password(data)
        assert validate_userType(data)
        serializer = UserLoginSerializer(data=data)
        if serializer.is_valid(raise_exception = True):
            user = serializer.check_user(data)
            login(request, user)
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_406_NOT_ACCEPTABLE)
        
class UserLogout(APIView):
    # assume user request is authenticated (anyone can logout)
    permission_classes = (permissions.AllowAny,)
    authentication_classes = ()
    ##
    def post(self, request):
        logout(request)
        return Response(status=status.HTTP_200_OK)

class UserView(APIView):
    permission_classes = (permissions.IsAuthenticated,)
    authentication_classes = (SessionAuthentication, )
    ##
    def get(self, request):
        serializer = UserSerializer(request.user)
        return Response({'user': serializer.data}, status=status.HTTP_200_OK)
    
class UserPublicView(APIView):
    permission_classes = (permissions.AllowAny,)
    ##
    def get(self,request, pk):
        user = AppUser.objects.get(pk = pk)
        serializer = UserPublicSerializer(user)
        return Response({'seller': serializer.data}, status=status.HTTP_200_OK)

# view for bit item creation
class BidItemCreationView(APIView):
    permission_classes = (permissions.IsAuthenticated,)
    # have to use these parsers for file uploads via form
    parser_classes = (MultiPartParser, FormParser,)
    def post(self, request, format=None):
        print(request.data)
        serializer = BidItemCreationSerializer(data = request.data)
        if serializer.is_valid():
            if not serializer.validated_data.get('currentPrice'):
                serializer.validated_data['currentPrice'] = serializer.validated_data.get('startingPrice', 0)
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

# view to get individual bid item
class AllBidItemView(APIView):
    permission_classes = (permissions.AllowAny,)
    ##
    def get(self, request):
        bid_items = BidItem.objects.all()
        serialzer = BidItemSerializer(bid_items, many=True)
        return Response({'bidLots': serialzer.data}, status=status.HTTP_200_OK)

# view to get individual bid item
class IndividualBidItemView(APIView):
    permission_classes = (permissions.AllowAny,)
    ##
    def get(self, request, pk):
        try:
            # Fetch the bid item with specified id
            bid_item = BidItem.objects.get(pk=pk)
        except BidItem.DoesNotExist:
            return Response({'error': 'Bid item does not exist!'}, status=status.HTTP_404_NOT_FOUND)
        
        serializer = BidItemSerializer(bid_item)
        return Response(serializer.data, status=status.HTTP_200_OK)

class SendEmailView(APIView):
    permission_classes = (permissions.AllowAny,)

    def post(self, request):
        data = json.loads(request.body)
        name = data.get('name', '')
        email = data.get('email', '')
        message = data.get('message', '')

        try:
            # Send email
            send_mail(
                subject='New Contact Form Submission',
                message=f'Name: {name}\nEmail: {email}\nMessage: {message}',
                from_email='sujalkoju97@gmail.com',  # Replace with your email
                recipient_list=['sujalkoju97@gmail.com'],  # Replace with your email address to receive form submissions
            )
            return JsonResponse({'success': True, 'message': 'Email sent successfully'})
        except Exception as e:
            return JsonResponse({'success': False, 'message': str(e)})

    def get(self, request):
        return JsonResponse({'success': False, 'message': 'Method not allowed'}, status=405)
# view for placing bid by buyer
class PlaceBidView(APIView):
    queryset = BidItem.objects.all()
    permission_classes = (permissions.IsAuthenticated,)

    def post(self, request):
        bid_item = BidItem.objects.get(pk=request.data.get("bidItemId"))
        ## if bid about is not greater that current price
        bid_amount = request.data.get("bidAmount")
        if (float(bid_amount) <= float(bid_item.currentPrice)):
            return Response({"error": "Bid amount should be greater that current price!"}, status=status.HTTP_400_BAD_REQUEST)
        
        bid_item.currentPrice = bid_amount
        bid_item.bidder = request.user
        bid_item.save()
        serializer = BidItemSerializer(bid_item)
        return Response(serializer.data, status=status.HTTP_200_OK)

# view to get items that top bidder is the user
class PlacedTopBidsView(APIView):
    permission_classes = (permissions.IsAuthenticated,)
    ##
    def get(self, request):
        bid_items = BidItem.objects.filter(bidder=request.user)
        serializer = BidItemSerializer(bid_items, many=True)
        return Response({'bidLots': serializer.data}, status=status.HTTP_200_OK)

class SellerActiveLotsView(APIView):
    permission_classes = (permissions.IsAuthenticated,)
    ##
    def get(self, request):
        bid_items = BidItem.objects.filter(seller=request.user)
        serializer = BidItemSerializer(bid_items, many=True)
        return Response({'bidLots': serializer.data}, status=status.HTTP_200_OK)
    

# view to close the auction at current price
class CloseAuctionView(APIView):
    permission_classes = (permissions.IsAuthenticated,)
    ##
    def post(self, request):
        bid_item = BidItem.objects.get(pk=request.data.get("bidItemId"))
        if (bid_item.bidder is None):
            return Response({'error': 'No bidder yet!'}, status=status.HTTP_406_NOT_ACCEPTABLE)
        bid_item.isSold = True
        bid_item.isPendingPayment = True
        bid_item.save()
        serializer = BidItemSerializer(bid_item)
        return Response(serializer.data, status=status.HTTP_200_OK)
    
class DeleteBidItem(APIView):
    permission_classes = (permissions.IsAuthenticated,)
    ##
    def delete(self, request, pk):
        try:
            bid_item = BidItem.objects.get(pk = pk)
        except BidItem.DoesNotExist:
            return Response({"error": "Bid Item does not exist"}, status=status.HTTP_400_BAD_REQUEST)
        os.remove(os.path.join(settings.MEDIA_ROOT, bid_item.itemImage.path))
        bid_item.delete()
        serializer = BidItemSerializer(bid_item)
        return Response(serializer.data, status=status.HTTP_200_OK)
    
class PaymentReceivedView(APIView):
    permission_classes = (permissions.IsAuthenticated,)
    ##
    def post(self, request):
        bid_item = BidItem.objects.get(pk=request.data.get("bidItemId"))
        if (bid_item.bidder is None):
            return Response({'error': 'No bidder yet!'}, status=status.HTTP_406_NOT_ACCEPTABLE)
        bid_item.isPendingPayment = False
        bid_item.save()
        serializer = BidItemSerializer(bid_item)
        return Response(serializer.data, status=status.HTTP_200_OK)