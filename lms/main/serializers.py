from rest_framework import serializers
from .import models

#I am going to translate the Teacher Model into serializer

class TeacherSerializer(serializers.ModelSerializer):
    class Meta:
        model=models.Teacher #Defining model name
        fields=['id','full_name','email','password','qualification','mobile_no','address'] #Defining fields name


#How w can see the serializer's response ??
#Here we have created our serializer for our Teacher Model. Now we will import this in our view file and then we will rend that.
#We want our data to be transformed into json        
