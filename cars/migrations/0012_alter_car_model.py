# Generated by Django 3.2.9 on 2021-12-02 10:49

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('models', '0002_model_make'),
        ('cars', '0011_alter_car_model'),
    ]

    operations = [
        migrations.AlterField(
            model_name='car',
            name='model',
            field=models.ForeignKey(limit_choices_to={'make': 2}, on_delete=django.db.models.deletion.CASCADE, to='models.model'),
        ),
    ]
