# Generated by Django 4.2.4 on 2023-09-29 05:46

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('FarmApp', '0003_farmproduct'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='farmproduct',
            name='stock',
        ),
    ]