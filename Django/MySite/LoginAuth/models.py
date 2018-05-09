from django.db import models

# Create your models here.


class UserInfo(models.Model):
    user_id = models.IntegerField(primary_key=True)
    user_name = models.CharField(max_length=30)
    pass_word = models.CharField(max_length=256)
    user_token = models.CharField(max_length=256)

    def __unicode__(self):
        return self.user_name

