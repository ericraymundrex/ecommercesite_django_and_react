from django.db import models

# Imported from modesls which is in django.db
class Category(models.Model):
    name=models.CharField(max_length=50)
    description=models.CharField(max_length=250)
    #editable = False so will not show in admin panel
    created_at=models.DateTimeField(auto_now_add=True)
    updated_at=models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.name