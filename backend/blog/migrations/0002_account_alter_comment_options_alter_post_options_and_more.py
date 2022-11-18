# Generated by Django 4.1.3 on 2022-11-18 03:43

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('blog', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='Account',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('userID', models.CharField(max_length=128)),
            ],
            options={
                'ordering': ['userID'],
            },
        ),
        migrations.AlterModelOptions(
            name='comment',
            options={'ordering': ['author']},
        ),
        migrations.AlterModelOptions(
            name='post',
            options={'ordering': ['title']},
        ),
        migrations.RemoveField(
            model_name='comment',
            name='post',
        ),
        migrations.RemoveField(
            model_name='post',
            name='categories',
        ),
        migrations.AddField(
            model_name='post',
            name='comment',
            field=models.ForeignKey(default=0, on_delete=django.db.models.deletion.CASCADE, to='blog.comment'),
        ),
        migrations.AddField(
            model_name='post',
            name='likes',
            field=models.IntegerField(default=0),
        ),
        migrations.AlterField(
            model_name='comment',
            name='author',
            field=models.CharField(default='author', max_length=60),
        ),
        migrations.AlterField(
            model_name='comment',
            name='body',
            field=models.TextField(default='body'),
        ),
        migrations.DeleteModel(
            name='Category',
        ),
        migrations.AddField(
            model_name='account',
            name='posts',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='blog.post'),
        ),
    ]
