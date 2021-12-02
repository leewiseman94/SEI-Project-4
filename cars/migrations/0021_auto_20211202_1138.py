# Generated by Django 3.2.9 on 2021-12-02 11:38

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('cars', '0020_auto_20211202_1130'),
    ]

    operations = [
        migrations.AlterField(
            model_name='car',
            name='bodyType',
            field=models.CharField(choices=[('Hatchback', 'Hatchback'), ('SUV', 'SUV'), ('Estate', 'Estate'), ('Saloon', 'Saloon'), ('Coupe', 'Coupe'), ('Convertible', 'Convertible'), ('MVP', 'MVP')], default=None, max_length=100),
        ),
        migrations.AlterField(
            model_name='car',
            name='fuelType',
            field=models.CharField(choices=[('Petrol', 'Petrol'), ('Diesel', 'Diesel'), ('Electric', 'Electric'), ('Hybrid', 'Hybrid')], default=None, max_length=100),
        ),
    ]
