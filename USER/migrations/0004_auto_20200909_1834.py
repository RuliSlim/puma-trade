# Generated by Django 3.1 on 2020-09-09 11:34

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('USER', '0003_auto_20200909_1518'),
    ]

    operations = [
        migrations.AlterField(
            model_name='data_user',
            name='phone',
            field=models.CharField(max_length=15, null=True, unique=True),
        ),
    ]
