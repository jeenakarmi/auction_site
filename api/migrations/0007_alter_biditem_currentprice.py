# Generated by Django 5.0.3 on 2024-04-13 09:22

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0006_alter_biditem_startingprice'),
    ]

    operations = [
        migrations.AlterField(
            model_name='biditem',
            name='currentPrice',
            field=models.DecimalField(blank=True, decimal_places=2, max_digits=10, null=True),
        ),
    ]
