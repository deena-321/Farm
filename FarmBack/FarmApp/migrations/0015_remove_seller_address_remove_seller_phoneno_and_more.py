# Generated by Django 4.1.2 on 2023-10-27 12:36

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('FarmApp', '0014_alter_chat_image'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='seller',
            name='address',
        ),
        migrations.RemoveField(
            model_name='seller',
            name='phoneno',
        ),
        migrations.AddField(
            model_name='seller',
            name='aadhar',
            field=models.BinaryField(blank=True, null=True),
        ),
        migrations.AddField(
            model_name='seller',
            name='farmId',
            field=models.BinaryField(blank=True, null=True),
        ),
    ]
