from rest_framework import serializers
from .import models

#I am going to translate the Teacher Model into serializer

class TeacherSerializer(serializers.ModelSerializer):
    class Meta:
        model=models.Teacher #Defining model name
        fields=['full_name','email','password','username','skills'] #Defining fields name


#How w can see the serializer's response ??
#Here we have created our serializer for our Teacher Model. Now we will import this in our view file and then we will rend that.
#We want our data to be transformed into json        


class StudentSerializer(serializers.ModelSerializer):
    class Meta:
        model=models.Student #Defining model name
        fields=['full_name','email','username','password','interested_categories'] #Defining fields name


class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model=models.CourseCategory #Defining model name
        fields=['id','title','description'] #Defining fields name



class CourseSerializer(serializers.ModelSerializer):
    class Meta:
        model=models.Course #Defining model name
        fields=['id','category','teacher','title','description','featured_img','techs'] #Defining fields name
        
class ChapterSerializer(serializers.ModelSerializer):
    class Meta:
        model=models.Chapter #Defining model name
        fields=['id','course','title','description','video','remarks'] #Defining fields name  

class StudentCourseEnrollmentSerializer(serializers.ModelSerializer):
    class Meta:
        model=models.StudentCourseEnrollment #Defining model name
        fields=['id','course','student','enrolled_time'] #Defining fields name

class StudentCourseEnrollSerializer(serializers.ModelSerializer):
    course = CourseSerializer()
    student = StudentSerializer()
    class Meta:
        model=models.StudentCourseEnrollment #Defining model name
        fields=['id','course','student','enrolled_time'] #Defining fields name

class CourseTeacherSerializer(serializers.ModelSerializer):
    teacher = TeacherSerializer()
    class Meta:
        model=models.Course #Defining model name
        fields=['id','category','teacher','title','description','featured_img','techs'] #Defining fields name