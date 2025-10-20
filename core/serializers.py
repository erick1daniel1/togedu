from rest_framework import serializers
from django.contrib.auth.models import User
from .models import (
    Grade, Section, Student, Teacher, Course, TeachingAssignment,
    Headmaster, Enrollment, Parent, GradeRecord, Attendance, Notification
)

# ------------------------
# GRADO Y SECCIÓN
# ------------------------
class GradeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Grade
        fields = ['id', 'name', 'level']

class SectionSerializer(serializers.ModelSerializer):
    grade = GradeSerializer(read_only=True)
    grade_id = serializers.PrimaryKeyRelatedField(
        queryset=Grade.objects.all(), source='grade', write_only=True
    )

    class Meta:
        model = Section
        fields = ['id', 'name', 'grade', 'grade_id']

# ------------------------
# ALUMNOS
# ------------------------
class StudentSerializer(serializers.ModelSerializer):
    section = SectionSerializer(read_only=True)
    section_id = serializers.PrimaryKeyRelatedField(
        queryset=Section.objects.all(), source='section', write_only=True, allow_null=True
    )

    class Meta:
        model = Student
        fields = ['id', 'first_name', 'last_name', 'birthdate', 'gender',
                  'email', 'photo', 'section', 'section_id']

# ------------------------
# PROFESORES Y CURSOS
# ------------------------
class TeacherSerializer(serializers.ModelSerializer):
    class Meta:
        model = Teacher
        fields = ['id', 'firstname', 'lastname', 'email', 'phone', 'birthdate', 'photo', 'status']

class TeachingAssignmentSerializer(serializers.ModelSerializer):
    teacher = TeacherSerializer(read_only=True)
    teacher_id = serializers.PrimaryKeyRelatedField(queryset=Teacher.objects.all(), source='teacher', write_only=True)
    course_id = serializers.PrimaryKeyRelatedField(queryset=Course.objects.all(), source='course', write_only=True)
    section_id = serializers.PrimaryKeyRelatedField(queryset=Section.objects.all(), source='section', write_only=True)

    class Meta:
        model = TeachingAssignment
        fields = ['id', 'teacher', 'teacher_id', 'course_id', 'section_id']

class CourseSerializer(serializers.ModelSerializer):
    teachers = TeacherSerializer(many=True, read_only=True)

    class Meta:
        model = Course
        fields = ['id', 'name', 'description', 'teachers']

# ------------------------
# DIRECTOR
# ------------------------
class HeadmasterSerializer(serializers.ModelSerializer):
    class Meta:
        model = Headmaster
        fields = ['id', 'first_name', 'last_name', 'email', 'gender', 'head_photo']

# ------------------------
# MATRÍCULAS
# ------------------------
class EnrollmentSerializer(serializers.ModelSerializer):
    student = StudentSerializer(read_only=True)
    student_id = serializers.PrimaryKeyRelatedField(queryset=Student.objects.all(), source='student', write_only=True)
    course = CourseSerializer(read_only=True)
    course_id = serializers.PrimaryKeyRelatedField(queryset=Course.objects.all(), source='course', write_only=True)

    class Meta:
        model = Enrollment
        fields = ['id', 'student', 'student_id', 'course', 'course_id', 'enrollment_date', 'status']

# ------------------------
# PADRES
# ------------------------
class ParentSerializer(serializers.ModelSerializer):
    students = StudentSerializer(many=True, read_only=True)
    student_ids = serializers.PrimaryKeyRelatedField(many=True, queryset=Student.objects.all(), source='students', write_only=True)

    class Meta:
        model = Parent
        fields = ['id', 'first_name', 'last_name', 'phone', 'email', 'photo', 'students', 'student_ids']

# ------------------------
# CALIFICACIONES
# ------------------------
class GradeRecordSerializer(serializers.ModelSerializer):
    student = StudentSerializer(read_only=True)
    student_id = serializers.PrimaryKeyRelatedField(queryset=Student.objects.all(), source='student', write_only=True)
    course = CourseSerializer(read_only=True)
    course_id = serializers.PrimaryKeyRelatedField(queryset=Course.objects.all(), source='course', write_only=True)
    teacher = TeacherSerializer(read_only=True)
    teacher_id = serializers.PrimaryKeyRelatedField(queryset=Teacher.objects.all(), source='teacher', write_only=True)

    class Meta:
        model = GradeRecord
        fields = ['id', 'student', 'student_id', 'course', 'course_id', 'teacher', 'teacher_id', 'score', 'date', 'comments']

# ------------------------
# ASISTENCIA
# ------------------------
class AttendanceSerializer(serializers.ModelSerializer):
    student = StudentSerializer(read_only=True)
    student_id = serializers.PrimaryKeyRelatedField(queryset=Student.objects.all(), source='student', write_only=True)
    section = SectionSerializer(read_only=True)
    section_id = serializers.PrimaryKeyRelatedField(queryset=Section.objects.all(), source='section', write_only=True)

    class Meta:
        model = Attendance
        fields = ['id', 'student', 'student_id', 'section', 'section_id', 'date', 'status']

# ------------------------
# MENSAJES / NOTIFICACIONES
# ------------------------
class NotificationSerializer(serializers.ModelSerializer):
    sender = serializers.StringRelatedField(read_only=True)
    recipient = serializers.StringRelatedField(read_only=True)
    student = StudentSerializer(read_only=True)
    student_id = serializers.PrimaryKeyRelatedField(queryset=Student.objects.all(), source='student', write_only=True, required=False)

    class Meta:
        model = Notification
        fields = ['id', 'sender', 'recipient', 'student', 'student_id', 'message', 'read', 'created_at']
