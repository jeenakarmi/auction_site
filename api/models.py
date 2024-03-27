from django.contrib.auth.models import AbstractBaseUser, PermissionsMixin
from django.db import models
from django.utils.translation import gettext_lazy as _

from .managers import AppUserManager

class AppUser(AbstractBaseUser, PermissionsMixin):
    email = models.EmailField(_("email address"), unique = True)
    username = models.CharField(max_length = 50)
    phone = models.CharField(max_length=10, default='')
    userType = models.CharField(max_length=6, default='')

    USERNAME_FIELD = "email"
    REQUIRED_FIELDS = []

    objects = AppUserManager()

    def __str__(self):
        return self.username # return email when self is referenced