# Generated by Django 4.1.7 on 2023-09-13 16:33

from django.db import migrations, models
import django.utils.timezone


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0005_post_created_post_updated'),
    ]

    operations = [
        migrations.AlterField(
            model_name='post',
            name='created',
            field=models.DateTimeField(default=django.utils.timezone.now),
        ),
    ]
