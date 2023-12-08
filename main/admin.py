from django.contrib import admin
from . import models  # (added by ALIF)

# Register your models here.
class AdminTeacher(admin.ModelAdmin):
    list_display = ["id"]

admin.site.register(models.Teacher,AdminTeacher)
admin.site.register(models.CourseCategory)
admin.site.register(models.Course)
admin.site.register(models.Chapter)
admin.site.register(models.Student)
admin.site.register(models.StudentCourseEnrollment)
