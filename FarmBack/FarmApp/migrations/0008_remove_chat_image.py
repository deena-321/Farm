# Generated by Django 4.1.2 on 2023-10-16 14:25

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('FarmApp', '0007_alter_chat_image'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='chat',
            name='image',
        ),
    ]