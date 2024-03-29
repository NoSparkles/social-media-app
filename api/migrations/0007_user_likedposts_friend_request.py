# Generated by Django 4.1.7 on 2023-09-14 14:58

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0006_alter_post_created'),
    ]

    operations = [
        migrations.AddField(
            model_name='user',
            name='likedPosts',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.SET_NULL, related_name='likedPosts', to='api.post'),
        ),
        migrations.CreateModel(
            name='Friend_request',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('from_user', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='from_user', to=settings.AUTH_USER_MODEL)),
                ('to_user', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='to_user', to=settings.AUTH_USER_MODEL)),
            ],
        ),
    ]
