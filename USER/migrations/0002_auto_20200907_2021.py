# Generated by Django 3.1 on 2020-09-07 13:21

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('USER', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='data_user',
            name='role',
            field=models.ForeignKey(blank=True, default=1, null=True, on_delete=django.db.models.deletion.CASCADE, to='USER.role'),
        ),
        migrations.CreateModel(
            name='Data_Money',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('token', models.FloatField(default=0)),
                ('poin', models.FloatField(default=0)),
                ('user', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='USER.data_user')),
            ],
        ),
    ]
