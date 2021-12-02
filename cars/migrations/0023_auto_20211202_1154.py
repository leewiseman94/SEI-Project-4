# Generated by Django 3.2.9 on 2021-12-02 11:54

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('models', '0002_model_make'),
        ('cars', '0022_auto_20211202_1142'),
    ]

    operations = [
        migrations.AlterField(
            model_name='car',
            name='colour',
            field=models.CharField(default=None, max_length=20),
        ),
        migrations.AlterField(
            model_name='car',
            name='model',
            field=models.ForeignKey(limit_choices_to={'make': 1}, on_delete=django.db.models.deletion.CASCADE, to='models.model'),
        ),
    ]
