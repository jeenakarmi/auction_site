from django.contrib.auth import get_user_model, login, logout
from rest_framework.authentication import SessionAuthentication
from rest_framework.views import APIView
from rest_framework.parsers import MultiPartParser, FormParser
from rest_framework.response import Response
from .serializers import UserRegisterSerializer, UserLoginSerializer, UserSerializer, BidItemCreationSerializer
from rest_framework import permissions, status
from .validations import custom_validation, validate_email, validate_password, validate_userType

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