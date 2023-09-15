from django.urls import path
from rest_framework_simplejwt.views import (TokenObtainPairView,
TokenRefreshView, 
TokenVerifyView)

from . import views

urlpatterns = [
    path('token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('token/verify/', TokenVerifyView.as_view(), name='token_verify'),

    path('', views.index),

    path('posts/', views.PostListCreateAPIView.as_view(), name='posts'),
    path('users/', views.UserListCreateAPIView.as_view(), name='users'),
    path('users/<str:pk>/', views.UserRetrieveDestroyView.as_view(), name='user'),
    path('users/<str:id>/posts/', views.UserPostsListAPIView.as_view(), name='user-posts'),
    path('get_user/', views.Get_user.as_view(), name='user'),
    path('like_post/<int:post_id>/', views.Like_post.as_view(), name='like_post'),
    path('friend_requests/<str:username>/', views.Friend_request_To_UserRetriveAPIView.as_view()),
    path('send_friend_request/<int:username>/', views.Send_friend_request.as_view()),
    path('accept_friend_request/<int:request_id>/', views.Accept_friend_request.as_view()),
]