from rest_framework import viewsets
from django.contrib.auth.models import User
from .models import (
    Grade, Section, Student, Teacher, Course, TeachingAssignment,
    Headmaster, Enrollment, Parent, GradeRecord, Attendance, Notification
)
from .serializers import (
    GradeSerializer, SectionSerializer, StudentSerializer, TeacherSerializer, CourseSerializer,
    TeachingAssignmentSerializer, HeadmasterSerializer, EnrollmentSerializer, ParentSerializer,
    GradeRecordSerializer, AttendanceSerializer, NotificationSerializer
)

# ------------------------
# GRADO Y SECCIÓN
# ------------------------
class GradeViewSet(viewsets.ModelViewSet):
    queryset = Grade.objects.all()
    serializer_class = GradeSerializer

class SectionViewSet(viewsets.ModelViewSet):
    queryset = Section.objects.all()
    serializer_class = SectionSerializer

# ------------------------
# ALUMNOS
# ------------------------
class StudentViewSet(viewsets.ModelViewSet):
    queryset = Student.objects.all()
    serializer_class = StudentSerializer

# ------------------------
# PROFESORES Y CURSOS
# ------------------------
class TeacherViewSet(viewsets.ModelViewSet):
    queryset = Teacher.objects.all()
    serializer_class = TeacherSerializer

class CourseViewSet(viewsets.ModelViewSet):
    queryset = Course.objects.all()
    serializer_class = CourseSerializer

class TeachingAssignmentViewSet(viewsets.ModelViewSet):
    queryset = TeachingAssignment.objects.all()
    serializer_class = TeachingAssignmentSerializer

# ------------------------
# DIRECTOR
# ------------------------
class HeadmasterViewSet(viewsets.ModelViewSet):
    queryset = Headmaster.objects.all()
    serializer_class = HeadmasterSerializer

# ------------------------
# MATRÍCULAS
# ------------------------
class EnrollmentViewSet(viewsets.ModelViewSet):
    queryset = Enrollment.objects.all()
    serializer_class = EnrollmentSerializer

# ------------------------
# PADRES
# ------------------------
class ParentViewSet(viewsets.ModelViewSet):
    queryset = Parent.objects.all()
    serializer_class = ParentSerializer

# ------------------------
# CALIFICACIONES
# ------------------------
class GradeRecordViewSet(viewsets.ModelViewSet):
    queryset = GradeRecord.objects.all()
    serializer_class = GradeRecordSerializer

# ------------------------
# ASISTENCIA
# ------------------------
class AttendanceViewSet(viewsets.ModelViewSet):
    queryset = Attendance.objects.all()
    serializer_class = AttendanceSerializer

# ------------------------
# MENSAJES / NOTIFICACIONES
# ------------------------
class NotificationViewSet(viewsets.ModelViewSet):
    queryset = Notification.objects.all()
    serializer_class = NotificationSerializer
