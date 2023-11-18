from django.urls import path
from .import views
urlpatterns = [
    #Teacher
    path('teacher/', views.TeacherList.as_view()),
    path('teacher/<int:pk>/', views.TeacherDetail.as_view()),
    path('teacher-login', views.teacher_login),



    #Student
    path('student/', views.StudentList.as_view()),
    path('student-login', views.student_login),
]