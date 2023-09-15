from rest_framework.decorators import api_view, APIView
from rest_framework.response import Response
from rest_framework.generics import ListCreateAPIView, ListAPIView, RetrieveDestroyAPIView, GenericAPIView
from rest_framework import status

from . import models, serializers
from .mixins import AuthenticationRequiredMixin
 
@api_view(['GET'])
def index(request, *args, **kwargs):
    return Response({'Message': 'This is default API page'})

class PostListCreateAPIView(ListCreateAPIView, AuthenticationRequiredMixin):
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
        posts = user.post_set.all().order_by('-created')
        return posts

class UserListCreateAPIView(ListCreateAPIView, AuthenticationRequiredMixin):
    queryset = models.User.objects.all()
    serializer_class = serializers.UserSerializer

class UserRetrieveDestroyView(RetrieveDestroyAPIView):
    queryset = models.User.objects.all()
    serializer_class = serializers.UserSerializer

class Get_user(GenericAPIView, AuthenticationRequiredMixin):
    serializer_class = serializers.UserSerializer

    def get_queryset(self):
        qs = models.User.objects.filter(id=self.request.user.id)
        return qs

    def get(self, request, *args, **kwargs):
        queryset = self.get_queryset()
        serializer = self.serializer_class(queryset[0], many=False)
        print(serializer.data)
        return Response(serializer.data)
    
class Like_post(APIView, AuthenticationRequiredMixin):
    def get(self, request, post_id):
        try:
            post = models.Post.objects.get(id=post_id)
        except models.Post.DoesNotExist:
            return Response({"message": 'Post not found.'}, status=status.HTTP_400_BAD_REQUEST)

        user = request.user
        
        if user.liked_posts.filter(id=post_id).exists():
            return Response({"message": 'You have already liked this post.'}, status=status.HTTP_400_BAD_REQUEST)

        post.likes.add(user)
        user.liked_posts.add(post)
        user.save()

        return Response({"message": 'Post liked successfully.'}, status=status.HTTP_200_OK)
    
class Friend_request_To_UserRetriveAPIView(ListAPIView, AuthenticationRequiredMixin):
    lookup_field = 'username'
    queryset = models.Friend_request.objects.all()
    serializer_class = serializers.Friend_RequestSerializer
    
class Send_friend_request(APIView, AuthenticationRequiredMixin):
    def get(self, request, *args, **kwargs):
        from_user= request.user
        to_user = models.User.objects.get(username=kwargs['username'])
        if from_user == to_user:
            return Response({'message': "You can't send friend request to yourself"})
        friend_request, created = models.Friend_request.objects.get_or_create(
            from_user=from_user,
            to_user=to_user
        )
        if created:
            return Response({'message': 'friend request sent.'})
        else: 
            return Response({'message': 'friend requst was already sent.'})
        
class Accept_friend_request(APIView, AuthenticationRequiredMixin):
    def get(self, request, *args, **kwargs):
        friend_request = models.Friend_request.objects.get(id=kwargs['request_id'])
        print(kwargs['request_id'], request.user)
        if friend_request.to_user == request.user:
            friend_request.to_user.friends.add(friend_request.from_user)
            friend_request.from_user.friends.add(friend_request.to_user)
            friend_request.delete()
            return Response({'message': 'friend request accepted.'})
        else:
            return Response({'message': 'friend request not accepted.'})