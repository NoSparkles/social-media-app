from rest_framework.serializers import ModelSerializer
from rest_framework import serializers

from django.contrib.auth.hashers import make_password

from . import models

class UserSerializer(ModelSerializer):
  friends = serializers.SerializerMethodField()
  password = serializers.CharField(write_only=True, min_length=8)
  class Meta: 
    model = models.User
    fields = [
      'id',
      'username',
      'friends',
      'password'
    ]

  def create(self, validated_data):
        password = validated_data.get('password')
        hashed_password = make_password(password)
        validated_data['password'] = hashed_password
        return super().create(validated_data)

  def get_friends(self, obj):
    friends = obj.friends
    data = UserUsernameSerializer(friends, many=True).data
    return data
  
class UserUsernameSerializer(ModelSerializer):
  class Meta: 
      model = models.User
      fields = [
        'id',
        'username',
      ]

class PostSerializer(ModelSerializer):
  user = serializers.PrimaryKeyRelatedField(read_only=True)
  likes = serializers.SerializerMethodField()
  liked = serializers.SerializerMethodField()
  class Meta: 
    model = models.Post
    fields = [
      'id',
      'title',
      'image',
      'user',
      'username',
      'likes',
      'liked',
    ]

  def get_likes(self, obj):
    return obj.likes.count()
  
  def get_liked(self, obj):
     return self.context['request'].user in obj.likes.all()
  
class Friend_RequestSerializer(ModelSerializer):
  class Meta:
     model = models.Friend_request
     fields = [
        'id',
        'from_user',
        'from_user_username',
        'to_user',
        'to_user_username',
     ]
     