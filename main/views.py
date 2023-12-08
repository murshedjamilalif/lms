from django.shortcuts import render
from django.http import JsonResponse, HttpResponse
from django.views.decorators.csrf import csrf_exempt
 
from rest_framework.views import APIView
from rest_framework.response import Response

from rest_framework import generics
from rest_framework import permissions
from .serializers import TeacherSerializer, StudentSerializer, CategorySerializer, CourseSerializer, ChapterSerializer,StudentCourseEnrollSerializer,StudentCourseEnrollmentSerializer,CourseTeacherSerializer
from .import models
from django.shortcuts import get_object_or_404

# Create your views here.
# I will open views.py file.
# I am going to use the class based view. I django there are two types of views. 
# Class based view (USING)
# Function based view

# class TeacherList(APIView): # It will provide us all the list of the teachers
  
#     def get(self,request):       #To fetch all the data
#         teachers=models.Teacher.objects.all()

#         #Now we need to transform the data to the serializer

#         serializer= TeacherSerializer(teachers,many=True)
#         return Response(serializer.data)


#Let's convert our code into genric views.
class TeacherList(generics.ListCreateAPIView): # This class will handle the List type records.                                            
    queryset=models.Teacher.objects.all()      # We can post data, we an fetch data
    serializer_class= TeacherSerializer
    

class TeacherDetail(generics.RetrieveUpdateDestroyAPIView): # This class will handle the specific single type records
    queryset=models.Teacher.objects.all()      # We will update data , delete data, get specific data.
    serializer_class= TeacherSerializer
    permission_classes=[permissions.IsAuthenticated]

# Now we will pass it to the main's url.
@csrf_exempt
def teacher_login(request):
    username = request.POST['username']
    password = request.POST['password']
    try:
        teacherData = models.Teacher.objects.get(username=username, password=password)
    except models.Teacher.DoesNotExist:
        teacherData=None
    if teacherData:
        return JsonResponse({'bool':True,'teacher_id': teacherData.id})
    else:
        return JsonResponse({'bool':False})

#Student Data
class StudentList(generics.ListCreateAPIView): # This class will handle the List type records.                                            
    queryset=models.Student.objects.all()      # We can post data, we an fetch data
    serializer_class= StudentSerializer
    


@csrf_exempt
def student_login(request):
    username = request.POST['username']
    password = request.POST['password']
    studentData = models.Student.objects.get(username=username, password=password)
    if studentData:
        return JsonResponse({'bool':True,'studentId': studentData.id})
    else:
        return JsonResponse({'bool':False})


class CategoryList(generics.ListCreateAPIView): # This class will handle the List type records.                                            
    queryset=models.CourseCategory.objects.all()      # We can post data, we an fetch data
    serializer_class= CategorySerializer


#Course 
class CourseList(generics.ListCreateAPIView): # This class will handle the List type records.                                            
    queryset=models.Course.objects.all()      # We can post data, we an fetch data
    serializer_class= CourseSerializer


#Specific Teacher Course
class TeacherCourseList(generics.ListAPIView): # This class will handle the List type records.                                            
                                               # We can post data, we an fetch data

    serializer_class= CourseSerializer 
    def get_queryset(self):
         teacher_id=self.kwargs['teacher_id']
         teacher=models.Teacher.objects.get(pk=teacher_id)
         return models.Course.objects.filter(teacher=teacher)
     
#Chapter  
class ChapterList(generics.ListCreateAPIView): # This class will handle the List type records.                                            
    queryset=models.Chapter.objects.all()      # We can post data, we an fetch data
    serializer_class= ChapterSerializer     

class CourseChapterList(generics.ListAPIView):
    serializer_class= ChapterSerializer   # This class will handle the List type records.                                            
    def get_queryset(self):
         course_id=self.kwargs['course_id']
         course = models.Course.objects.get(pk=course_id)
         return models.Chapter.objects.filter(course=course)
    

class ChapterDetailView(generics.RetrieveDestroyAPIView):
    queryset=models.Chapter.objects.all()
    serializer_class=ChapterSerializer   
     
class CourseDetailView(generics.RetrieveDestroyAPIView):
    queryset=models.Course.objects.all()
    serializer_class=CourseSerializer    


class StudentEnrollCourseList(generics.ListCreateAPIView): # This class will handle the List type records.                                            
    queryset=models.StudentCourseEnrollment.objects.all()      # We can post data, we an fetch data
    serializer_class= StudentCourseEnrollmentSerializer

class StudentEnrollCourseDetailView(generics.ListAPIView):
    serializer_class=StudentCourseEnrollSerializer
    def get_queryset(self):
        studentId=self.kwargs['studentId']
        student=models.Student.objects.get(pk=studentId)
        enrollments = models.StudentCourseEnrollment.objects.filter(student=student)

        return enrollments

class TeacherCourseDetailList(generics.RetrieveAPIView):
    serializer_class=CourseTeacherSerializer
    def get_object(self):
        course_id=self.kwargs['course_id']
        course = get_object_or_404(models.Course, pk=course_id)
        

        return course
# def fetch_enroll_status(request,course_id,studentId):
#     student=models.Student.object.filter(id=studentId.first())
#     course=models.Course.object.filter(id=course_id.first())
#     enrollStatus=models.StudentCourseEnrollment.filter(course=course,student=student).count()
#     studentData = models.Student.objects.get(username=username, password=password)
#     if enrollStatus:
#         return JsonResponse({'bool':True})
#     else:
#         return JsonResponse({'bool':False})
