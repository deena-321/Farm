# Generated by Django 4.1.2 on 2023-10-16 15:11

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('FarmApp', '0008_remove_chat_image'),
    ]

    operations = [
        migrations.AlterField(
            model_name='chat',
            name='room',
            field=models.CharField(max_length=255),
        ),
    ]