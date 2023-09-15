# Generated by Django 4.1.7 on 2023-09-14 15:01

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0007_user_likedposts_friend_request'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='user',
            name='likedPosts',
        ),
        migrations.AlterField(
            model_name='post',
            name='likes',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.SET_NULL, related_name='liked_posts', to=settings.AUTH_USER_MODEL),
        ),
    ]