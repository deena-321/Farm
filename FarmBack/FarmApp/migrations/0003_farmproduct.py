# Generated by Django 4.2.4 on 2023-09-28 16:02

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('FarmApp', '0002_seller'),
    ]

    operations = [
        migrations.CreateModel(
            name='FarmProduct',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=100)),
                ('product_type', models.CharField(max_length=50)),
                ('quantity', models.PositiveIntegerField()),
                ('is_available', models.BooleanField(default=True)),
                ('image', models.BinaryField()),
                ('stock', models.IntegerField()),
                ('description', models.TextField()),
                ('seller', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='FarmApp.seller')),
            ],
        ),
    ]