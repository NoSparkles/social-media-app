from django.db import models
from django.utils import timezone
from django.contrib.auth.models import AbstractUser, PermissionsMixin

class User(AbstractUser, PermissionsMixin):
    username = models.CharField(max_length=150, unique=True, default=None)
    is_active = models.BooleanField(default=True)
    is_staff = models.BooleanField(default=False)
    friends = models.ManyToManyField('User', blank=True)

    USERNAME_FIELD = 'username'

class Post(models.Model):
    title = models.CharField(default='No title', max_length=200, null=True, blank=True)
    user = models.ForeignKey(User, on_delete=models.SET_NULL, null=True)
    likes = models.ManyToManyField('User', related_name='liked_posts', blank=True)
    image = models.ImageField(upload_to='posts_images/', null=True, blank=True)

    created = models.DateTimeField(default=timezone.now)
    updated = models.DateTimeField(auto_now=True)

    def __str__(self) -> str:
        return f'{self.title} by {self.user}'
    
    @property
    def username(self) -> str:
        return self.user.username
    
class Friend_request(models.Model):
    from_user = models.ForeignKey(User, related_name='from_user', on_delete=models.CASCADE)
    to_user = models.ForeignKey(User, related_name='to_user', on_delete=models.CASCADE)

    @property
    def from_user_username(self):
        return self.from_user.username
    
    @property
    def to_user_username(self):
        return self.to_user.username