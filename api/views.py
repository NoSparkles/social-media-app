from rest_framework.decorators import api_view, APIView
from rest_framework.response import Response
from rest_framework.generics import ListCreateAPIView, ListAPIView, RetrieveDestroyAPIView, GenericAPIView
from rest_framework import status

from . import models, serializers
from .mixins import AuthenticationRequiredMixin
 
@api_view(['GET'])
def index(request, *args, **kwargs):
    return Response({'Message': 'This is default API page'})

class PostListCreateAPIView(ListCreateAPIView):
    queryset = models.Post.objects.all().order_by('-created')
    serializer_class = serializers.PostSerializer

    def perform_create(self, serializer):
        user = self.request.user
        if user:
            serializer.save(user=user)
        serializer.save()

class UserPostsListAPIView(ListAPIView):
    serializer_class = serializers.PostSerializer
    def get_queryset(self):
        id = self.kwargs['id']
        user = models.User.objects.get(id=id)
        posts = models.Post.objects.filter(user=user).order_by('-created')
        return posts

class UserListCreateAPIView(AuthenticationRequiredMixin, ListCreateAPIView):
    queryset = models.User.objects.all()
    serializer_class = serializers.UserSerializer

class UserRetrieveDestroyView(RetrieveDestroyAPIView):
    queryset = models.User.objects.all()
    serializer_class = serializers.UserSerializer

class Get_user(AuthenticationRequiredMixin, GenericAPIView):
    serializer_class = serializers.UserSerializer

    def get_queryset(self):
        qs = models.User.objects.filter(id=self.request.user.id)
        return qs

    def get(self, request, *args, **kwargs):
        queryset = self.get_queryset()
        serializer = self.serializer_class(queryset[0], many=False)
        print(serializer.data)
        return Response(serializer.data)
    
class Like_Unlike_post(AuthenticationRequiredMixin, APIView):
    def get(self, request, post_id):
        try:
            post = models.Post.objects.get(id=post_id)
        except models.Post.DoesNotExist:
            return Response({"message": 'Post not found.'}, status=status.HTTP_400_BAD_REQUEST)

        user = request.user
        
        if user.liked_posts.filter(id=post_id).exists():
            post.likes.remove(user)
            user.liked_posts.remove(post)
            user.save()
            return Response({"message": 'post unliked successfully.'}, status=status.HTTP_200_OK)
        else:
            post.likes.add(user)
            user.liked_posts.add(post)
            
            return Response({"message": 'post liked successfully.'}, status=status.HTTP_200_OK)
    
class Friend_request_To_UserRetriveAPIView(AuthenticationRequiredMixin, ListAPIView):
    serializer_class = serializers.Friend_RequestSerializer

    def get_queryset(self):
        return models.Friend_request.objects.filter(to_user=self.request.user)
    
class Accept_friend_request(AuthenticationRequiredMixin, APIView):
    def get(self, request, *args, **kwargs):
        friend_request = models.Friend_request.objects.get(id=kwargs['request_id'])
        if friend_request.to_user == request.user:
            friend_request.to_user.friends.add(friend_request.from_user)
            friend_request.from_user.friends.add(friend_request.to_user)
            friend_request.delete()
            return Response({'message': 'friend request accepted.'})
        else:
            return Response({'message': 'friend request not accepted.'})
        
class Decline_friend_request(AuthenticationRequiredMixin, APIView):
    def get(self, request, *args, **kwargs):
        friend_request = models.Friend_request.objects.get(id=kwargs['request_id'])
        if friend_request.to_user == request.user:
            friend_request.delete()
            return Response({'message': 'friend request declined.'})
        else:
            return Response({'message': 'friend request not declined.'})
        
class Send_friend_request(AuthenticationRequiredMixin, APIView):
    def get(self, request, *args, **kwargs):
        try:
            to_user = models.User.objects.get(username=kwargs['username'])
        except models.User.DoesNotExist:
            return Response({'message': 'user does not exist.'}, status=status.HTTP_404_NOT_FOUND)
        
        from_user = request.user
        if from_user == to_user:
            return Response({'message': 'can not send friend request to yourself.'}, status=status.HTTP_400_BAD_REQUEST)
        
        friend_request, created = models.Friend_request.objects.get_or_create(to_user=to_user, from_user=from_user)
        if created:
            return Response({'message': 'friend request sent.'}, status=status.HTTP_201_CREATED)
        else: 
            return Response({'message': 'friend request was already sent.'}, status=status.HTTP_400_BAD_REQUEST)