# Generated by Django 5.0.3 on 2024-04-13 09:20

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0005_alter_biditem_bidder_alter_biditem_currentprice'),
    ]

    operations = [
        migrations.AlterField(
            model_name='biditem',
            name='startingPrice',
            field=models.DecimalField(decimal_places=2, max_digits=10),
        ),
    ]
