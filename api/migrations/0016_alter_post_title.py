# Generated by Django 4.2.5 on 2024-01-14 17:56

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0015_alter_message_room'),
    ]

    operations = [
        migrations.AlterField(
            model_name='post',
            name='title',
            field=models.CharField(default='No title', max_length=200, null=True),
        ),
    ]