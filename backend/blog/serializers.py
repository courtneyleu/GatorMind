from rest_framework import serializers
from .models import *


class PostSerializer(serializers.ModelSerializer):
    class Meta:
        model = Post
        fields = ['title', 'body', 'created_on', 'last_modified', 'categories', 'comment', 'likes']


class CommentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Comment
        fields = ['author', 'body', 'created_on']


class AccountSerializer(serializers.ModelSerializer):
    class Meta:
        model = Comment
        fields = ['userId', 'posts', 'followers', 'following']
