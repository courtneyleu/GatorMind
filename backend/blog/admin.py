from django.contrib import admin

from blog.models import Post, Account


class PostAdmin(admin.ModelAdmin):
    pass


class AccountAdmin(admin.ModelAdmin):
    pass


admin.site.register(Post, PostAdmin)
admin.site.register(Account, AccountAdmin)
