from rest_framework import serializers
from django.contrib.auth import get_user_model, authenticate
from django.core.exceptions import ValidationError

UserModel = get_user_model()

# Serializers allow complex data such as querysets and model instances to be
# converted to native Python datatypes that cna then be easily rendered into
# JSON, XML or other content types.

class UserRegisterSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserModel
        fields = '__all__'
    def create(self, clean_data):
        user_obj = UserModel.objects.create_user(email=clean_data['email'], password=clean_data['password'], phone=clean_data['phone'], userType=clean_data['userType'])
        user_obj.username = clean_data['username']
        user_obj.phone = clean_data['phone']
        user_obj.userType = clean_data['userType']
        user_obj.save()
        return user_obj

class UserLoginSerializer(serializers.Serializer):
    # responsible to authenticate username (in this case email) and password of user
    email = serializers.EmailField()
    password = serializers.CharField()
    ##
    def check_user(self, clean_data):
        user = authenticate(username = clean_data['email'], password=clean_data['password'])
        if user.userType != clean_data['userType']:
            raise ValidationError('user is not of given type')
        if not user:
            raise ValidationError('user not found')
        return user

class UserSerializer(serializers.ModelSerializer):
    # this serializer is based on Modle and returns the user
    class Meta:
        model = UserModel
        fields = ('id', 'email', 'username', 'phone', 'userType', 'last_login')