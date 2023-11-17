from django.shortcuts import render
from django.http import JsonResponse, HttpResponse
from django.views.decorators.csrf import csrf_exempt
 
from rest_framework.views import APIView
from rest_framework.response import Response

from rest_framework import generics
from rest_framework import permissions
from .serializers import TeacherSerializer
from .import models


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
    teacherData = models.Teacher.objects.get(username=username, password=password)
    if teacherData:
        return JsonResponse({'bool':True})
    else:
        return JsonResponse({'bool':False})
