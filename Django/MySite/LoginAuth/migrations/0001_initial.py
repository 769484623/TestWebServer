# Generated by Django 2.0.3 on 2018-05-09 19:47

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='UserInfo',
            fields=[
                ('user_id', models.IntegerField(primary_key=True, serialize=False)),
                ('user_name', models.CharField(max_length=30)),
                ('pass_word', models.CharField(max_length=256)),
                ('user_token', models.CharField(max_length=256)),
            ],
        ),
    ]