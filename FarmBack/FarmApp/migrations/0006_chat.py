# Generated by Django 4.1.2 on 2023-10-16 10:28

from django.db import migrations, models
import django.db.models.deletion
import django_resized.forms


class Migration(migrations.Migration):

    dependencies = [
        ('FarmApp', '0005_room'),
    ]

    operations = [
        migrations.CreateModel(
            name='Chat',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('message', models.TextField(blank=True)),
                ('image', django_resized.forms.ResizedImageField(blank=True, crop=None, force_format='WEBP', keep_meta=True, null=True, quality=75, scale=0.5, size=None, upload_to='images')),
                ('bid', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='FarmApp.buyer')),
                ('room', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='room', to='FarmApp.room')),
                ('sid', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='FarmApp.seller')),
            ],
        ),
    ]