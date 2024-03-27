from django.core.exceptions import ValidationError
from django.contrib.auth import get_user_model
UserModel = get_user_model()

# custome form data validation
def custom_validation(data):
    email = data['email'].strip()
    password = data['password'].strip()
    userType = data['userType'].strip()
    ## check same email
    if not email or UserModel.objects.filter(email = email).exists():
        raise ValidationError('choose another email')
    ## password validation
    if not password or len(password) < 8:
        raise ValidationError('choose another passowrd (minimum 8 characters)')
    ## user type validation
    if not userType or (userType != 'BUYER' and userType != 'SELLER'):
        raise ValidationError('choose a type of user')
    return data

# custom email validation (existence of email in data)
def validate_email(data):
    email = data['email'].strip()
    if not email:
        raise ValidationError("An email is required!")
    return True

# existence of username
def validate_username(data):
    username = data['username'].strip()
    if not username:
        raise ValidationError("An username is required!")
    return True

# custom password validation
def validate_password(data):
    password = data['password'].strip()
    if not password:
        raise ValidationError("An password is required!")
    return True

# custom user type validation
def validate_userType(data):
    userType = data['userType'].strip()
    if not userType:
        raise ValidationError("An userType is required!")
    return True