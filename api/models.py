from django.contrib.auth.models import AbstractBaseUser, PermissionsMixin
from django.db import models
from django.utils.translation import gettext_lazy as _
from django.db.models.signals import pre_delete
from django.dispatch import receiver

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
    

# returns upload path
def upload_to(instance, filename):
    return 'items/{filename}'.format(filename=filename)

# bid item model
class BidItem(models.Model):
    itemName = models.CharField(max_length=200)
    itemBrand = models.CharField(max_length=50)
    itemModel = models.CharField(max_length=100)
    itemCategory = models.CharField(max_length=50) # motorbike, car, etc
    itemType = models.CharField(max_length=50) # naked, sport, etc
    itemVariant = models.CharField(max_length=50, null=True, blank=True)

    isBrandNew = models.BooleanField()
    usedPeriod = models.IntegerField(null=True, blank=True)
    itemDescription = models.CharField(max_length=1000)

    itemImage = models.ImageField(_("Image"), upload_to=upload_to, default='items/default.jpg')

    startingPrice = models.DecimalField(max_digits=10, decimal_places=2)
    seller = models.ForeignKey(AppUser, on_delete=models.CASCADE)
    currentPrice = models.DecimalField(max_digits=10, decimal_places=2, blank=True, null=True)
    bidder = models.ForeignKey(AppUser, on_delete=models.SET_NULL, null=True, blank=-True, related_name='bidder')
    isSold = models.BooleanField(default=False)
    isPendingPayment = models.BooleanField(default=False)

    creationDate = models.DateTimeField(auto_now_add=True)
    lastUpdateDate = models.DateTimeField(auto_now=True)

    def save(self, *args, **kwargs):
        if not self.currentPrice:
            self.currentPrice = self.startingPrice;
        super().save(*args, **kwargs)

    def __str__(self):
        return f"{self.itemName}\t{self.itemBrand}\t{self.itemModel}"
    
# make current price back to starting price if the bidder deletes their account
@receiver(pre_delete, sender=AppUser)
def user_pre_delete(sender, instance, **kwargs):
    # Update current Price of items associated wit the deleted user
    BidItem.objects.filter(seller=instance).update(currentPrice=models.F("startingPrice"))