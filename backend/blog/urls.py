from django.urls import path
from blog import views

urlpatterns = [
    path('post/', views.post_list),
    path('post/<int:pk>/', views.post_detail),
    path('account/', views.account_list),
    path('comment/', views.comment_list)
]