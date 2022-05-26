from django.db import migrations
from api.user.models import CustomUser


class Migration(migrations.Migration):
    def seed_data(apps,schema_editor):
        user=CustomUser(name="eric",email="admin@gmail.com",is_staff=True,is_superuser=True,phone="7708084999",gender="M")
        user.set_password("root")
        user.save()

    dependencies=[

    ]

    operations=[
        migrations.RunPython(seed_data),
    ]