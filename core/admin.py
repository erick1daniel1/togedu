from django.contrib import admin
from .models import (
    Grade, Section, Student, Teacher, Course, TeachingAssignment,
    Headmaster, Enrollment, Parent, GradeRecord, Attendance, Notification
)

admin.site.register(Grade)
admin.site.register(Section)
admin.site.register(Student)
admin.site.register(Teacher)
admin.site.register(Course)
admin.site.register(TeachingAssignment)
admin.site.register(Headmaster)
admin.site.register(Enrollment)
admin.site.register(Parent)
admin.site.register(GradeRecord)
admin.site.register(Attendance)
admin.site.register(Notification)
