# Generated by Django 4.1.3 on 2022-11-18 03:44

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('blog', '0002_account_alter_comment_options_alter_post_options_and_more'),
    ]

    operations = [
        migrations.AlterField(
            model_name='post',
            name='comment',
            field=models.ForeignKey(default=0, on_delete=django.db.models.deletion.CASCADE, to='blog.comment'),
        ),
    ]
