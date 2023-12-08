from django.urls import path
from .import views
urlpatterns = [
    #Teacher
    path('teacher/', views.TeacherList.as_view()),
    path('teacher/<int:pk>/', views.TeacherDetail.as_view()),
    path('teacher-login', views.teacher_login),

    #Category
    path('category/', views.CategoryList.as_view()),

    #Course
    path('course/', views.CourseList.as_view()),

    #Chapter
    path('chapter/', views.ChapterList.as_view()),

    #specific course chapter
    path('course-chapters/<int:course_id>', views.CourseChapterList.as_view()),

    #Specific Chapter
    path('chapter/<int:pk>', views.ChapterDetailView.as_view()),

    #Specific Course
    path('course/<int:pk>', views.CourseDetailView.as_view()),

    #Teacher Courses
    path('teacher-courses/<int:teacher_id>', views.TeacherCourseList.as_view()),
    path('teacher-courses-detail/<int:course_id>', views.TeacherCourseDetailList.as_view()),


    #Student
    path('student/', views.StudentList.as_view()),
    path('student-login', views.student_login),
    path('student-enroll-course/', views.StudentEnrollCourseList.as_view()),

    path('student-enroll-course/<int:studentId>', views.StudentEnrollCourseDetailView.as_view()),
]

