# Generated by Django 4.1.2 on 2023-10-26 10:41

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('FarmApp', '0012_admin'),
    ]

    operations = [
        migrations.AddField(
            model_name='chat',
            name='image',
            field=models.BinaryField(blank=True),
        ),
    ]
