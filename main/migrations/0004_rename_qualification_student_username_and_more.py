# Generated by Django 4.2.7 on 2023-11-18 17:31

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('main', '0003_rename_qualification_teacher_skills_and_more'),
    ]

    operations = [
        migrations.RenameField(
            model_name='student',
            old_name='qualification',
            new_name='username',
        ),
        migrations.RemoveField(
            model_name='student',
            name='address',
        ),
        migrations.RemoveField(
            model_name='student',
            name='mobile_no',
        ),
    ]
