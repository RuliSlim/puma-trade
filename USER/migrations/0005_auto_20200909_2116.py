# Generated by Django 3.1 on 2020-09-09 14:16

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('USER', '0004_auto_20200909_1834'),
    ]

    operations = [
        migrations.AlterField(
            model_name='data_money',
            name='user',
            field=models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, to='USER.data_user'),
        ),
    ]
