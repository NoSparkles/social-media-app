from django.contrib import admin

from . import models

admin.site.register(models.User)
admin.site.register(models.Post)
admin.site.register(models.Friend_request)
admin.site.register(models.Room)
admin.site.register(models.Message)