from django.urls import path
from . import views

urlpatterns = [
    path('register/', views.UserRegister.as_view(), name='register'),
    path('login/', views.UserLogin.as_view(), name='login'),
    path('logout/', views.UserLogout.as_view(), name='logout'),
    path('user', views.UserView.as_view(), name='user'),
    path('getuser/<int:pk>', views.UserPublicView.as_view(), name='getuser'),
    path('item/create/', views.BidItemCreationView.as_view(), name='createbid'),
    path('items/', views.AllBidItemView.as_view(), name='getallitems'),
    # path('api/items/', views.AllBidItemView.as_view(), name='get_all_bid_items'),
    path('items/<int:pk>/', views.IndividualBidItemView.as_view(), name='getindividualitem'),
    path('send-email/', views.SendEmailView.as_view(), name='send_email'),
    path('item/placebid/', views.PlaceBidView.as_view(), name='placebid'),
    path('items/placed-top-bids', views.PlacedTopBidsView.as_view(), name='placedtopbids'),
    path('items/seller-active-lots', views.SellerActiveLotsView.as_view(), name='selleractivelots'),
    path('item/close-auction', views.CloseAuctionView.as_view(), name='closeauction'),
    path('item/delete/<int:pk>/', views.DeleteBidItem.as_view(), name='deleteitem')
]