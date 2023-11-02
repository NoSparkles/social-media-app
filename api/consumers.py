import json
from channels.generic.websocket import WebsocketConsumer
from asgiref.sync import async_to_sync
from . import serializers, models
from django.contrib.auth import get_user_model

class ChatConsumer(WebsocketConsumer):
    def connect(self):
        room_id = self.scope['query_string'].decode('utf-8').split('=')[1]
        self.room_group_name = room_id

        async_to_sync(self.channel_layer.group_add)(
            self.room_group_name,
            self.channel_name
        )

        self.accept()

        self.send(text_data=json.dumps({
            'type': 'connected',
            'message': 'connected'
        }))
    
    def receive(self, text_data):
        text_data_json = json.loads(text_data)
        print(text_data_json)
        message = text_data_json['message']
        username = text_data_json['username']

        message_body = message
        user = get_user_model().objects.get(username=username)
        room = models.Room.objects.filter(pk=int(self.room_group_name)).first()
        message = models.Message.objects.create(body=message_body, user=user, room=room)
        message.save()

        async_to_sync(self.channel_layer.group_send)(
            self.room_group_name,
            {
                'type': 'chat_message',
                'message': serializers.MessageSerializer(message, many=False).data
            }
        )

    def chat_message(self, event):
        message = event['message']

        self.send(text_data=json.dumps({
            'type': 'chat',
            'message': message
        }))