from django.db import models
from django.forms import JSONField


class Comment(models.Model):
    author = models.CharField(max_length=60, default="author")
    body = models.TextField(default="body")
    created_on = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['author']


class Post(models.Model):
    title = models.CharField(max_length=255)
    body = models.TextField()
    created_on = models.DateTimeField(auto_now_add=True)
    last_modified = models.DateTimeField(auto_now=True)
    categories = JSONField(models.CharField(max_length=60))
    comment = models.ForeignKey(Comment,
                                on_delete=models.CASCADE,
                                default=0)
    likes = models.IntegerField(default=0)

    class Meta:
        ordering = ['title']


class Account(models.Model):
    userID = models.CharField(max_length=128)
    posts = models.ForeignKey(Post, on_delete=models.CASCADE)
    followers = JSONField(models.CharField(max_length=128))
    following = JSONField(models.CharField(max_length=128))

    class Meta:
        ordering = ['userID']
