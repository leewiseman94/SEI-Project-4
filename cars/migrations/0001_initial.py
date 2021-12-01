# Generated by Django 3.2.9 on 2021-11-30 18:31

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Car',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('title', models.CharField(default=None, max_length=100)),
                ('image', models.CharField(default=None, max_length=500)),
                ('description', models.CharField(default=None, max_length=500)),
            ],
        ),
    ]
