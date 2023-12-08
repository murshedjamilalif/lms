from django.db import models

# Create your models here.

#Teacher Model
class Teacher(models.Model):
    full_name=models.CharField(max_length=100)
    email=models.CharField(max_length=100)
    password=models.CharField(max_length=100)
    username=models.CharField(max_length=100)
    skills=models.CharField(max_length=200)
    # mobile_no=models.CharField(max_length=20)
    # address=models.TextField()

    class Meta:
        verbose_name_plural="1. Teachers"

   

# Course Category Model
class CourseCategory(models.Model):
    title=models.CharField(max_length=150)
    description=models.TextField()

    #this is for further modifications.

    class Meta:
        verbose_name_plural="2. Course Categories"
    

    def __str__(self):
        return self.title
    
# Course Model
class Course(models.Model):
    category =models.ForeignKey(CourseCategory, on_delete=models.CASCADE)
    teacher =models.ForeignKey(Teacher, on_delete=models.CASCADE)
    title=models.CharField(max_length=150)
    description=models.TextField()
    featured_img=models.ImageField(upload_to='course_imgs/',null=True)
    techs=models.TextField(null=True)
  
  
    class Meta:
        verbose_name_plural="3. Courses"
    def __str__(self):
        return self.title
        
# Chapter Model
class Chapter(models.Model):
    course =models.ForeignKey(Course, on_delete=models.CASCADE)
    title=models.CharField(max_length=150)
    description=models.TextField()
    video=models.FileField(upload_to='chapter_videos/',null=True)
    remarks=models.TextField(null=True)
   
  
    class Meta:
        verbose_name_plural="4. Chapters"             


#Student Model
class Student(models.Model):
    full_name=models.CharField(max_length=100)
    email=models.CharField(max_length=100)
    username=models.CharField(max_length=200)
    password=models.CharField(max_length=100) 
    interested_categories=models.TextField()   
    
    class Meta:
        verbose_name_plural="5. Student"  
    def __str__(self):
        return self.full_name  

#student_course_enrollment
class StudentCourseEnrollment(models.Model):
    course = models.ForeignKey(Course, on_delete=models.CASCADE, related_name='enrolled_courses')
    student = models.ForeignKey(Student,on_delete=models.CASCADE,related_name='enrolled_student')
    enrolled_time = models.DateTimeField(auto_now_add=True)
    class Meta:
        verbose_name_plural="6. Enrolled Courses" 
    def __str__(self):
        return f"{self.course}_{self.student}"


#This will alphabatically order the models or u can say the columns in the DB 
# class Meta:
#     verbose_name_plural="1. Teachers"        

# class Meta:
#     verbose_name_plural="2. Course Categories"    
# class Meta:
#     verbose_name_plural="3. Courses"
# class Meta:
#     verbose_name_plural="4. Student"      