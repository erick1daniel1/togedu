from django.db import models

# ------------------------
# GRADO Y SECCIÓN
# ------------------------
class Grade(models.Model):
    name = models.CharField(max_length=50)
    level = models.CharField(max_length=20, choices=[
        ("Inicial", "Inicial"),
        ("Primaria", "Primaria"),
        ("Secundaria", "Secundaria"),
    ])

    def __str__(self):
        return self.name


class Section(models.Model):
    grade = models.ForeignKey(Grade, on_delete=models.CASCADE, related_name="sections")
    name = models.CharField(max_length=5)  # Ej: "A", "B", "C"

    def __str__(self):
        return f"{self.grade.name} - {self.name}"


# ------------------------
# ALUMNOS
# ------------------------
class Student(models.Model):
    first_name = models.CharField(max_length=100)
    last_name = models.CharField(max_length=100)
    birthdate = models.DateField(null=True, blank=True)
    gender = models.CharField(
        max_length=10,
        choices=[('M','Masculino'), ('F','Femenino')],
        null=True, 
        blank=True   
    )
    email = models.EmailField(max_length=100, null=True, blank=True)
    photo = models.ImageField(upload_to='students/photos/', null=True, blank=True)
    section = models.ForeignKey("Section", on_delete=models.SET_NULL, null=True, blank=True)

    def __str__(self):
        return f"{self.first_name} {self.last_name}"


# ------------------------
# PROFESORES Y CURSOS
# ------------------------
class Teacher(models.Model):
    firstname = models.CharField(max_length=100)
    lastname = models.CharField(max_length=100)
    email = models.EmailField(unique=True)
    phone = models.CharField(max_length=20, blank=True, null=True)
    birthdate = models.DateField(blank=True, null=True)
    photo = models.ImageField(upload_to='teachers/photos/', blank=True, null=True)
    gender = models.CharField(
        max_length=10,
        choices=[('M','Masculino'), ('F','Femenino')],
        null=True,   # permite que la columna sea NULL
        blank=True   # permite que el formulario deje el campo vacío
    )
    status = models.CharField(
        max_length=20,
        choices=[
            ('active', 'Activo'),
            ('inactive', 'Inactivo'),
            ('on_leave', 'En licencia')

        ],
        default='active'
    )

class Course(models.Model):
    name = models.CharField(max_length=100)
    description = models.TextField(blank=True, null=True)
    teachers = models.ManyToManyField(Teacher, through='TeachingAssignment')

class TeachingAssignment(models.Model):
    teacher = models.ForeignKey(Teacher, on_delete=models.CASCADE)
    course = models.ForeignKey(Course, on_delete=models.CASCADE)
    section = models.ForeignKey(Section, on_delete=models.CASCADE)

# ------------------------
# DIRECTOR
# ------------------------
class Headmaster(models.Model):
    first_name = models.CharField(max_length=100)
    last_name = models.CharField(max_length=100)
    email = models.EmailField(unique=True)
    gender = models.CharField(
        max_length=10,
        choices=[('M','Masculino'), ('F','Femenino')],
        null=True,   
        blank=True   
    )
    head_photo = models.ImageField(upload_to='headmasters/photos/', blank=True, null=True)

    def __str__(self):
        return f"{self.first_name} {self.last_name}"


# ------------------------
# MATRÍCULAS
# ------------------------
class Enrollment(models.Model):
    student = models.ForeignKey(Student, on_delete=models.CASCADE)
    course = models.ForeignKey(Course, on_delete=models.CASCADE)
    enrollment_date = models.DateField(auto_now_add=True)
    status = models.CharField(max_length=20, default='active')

    def __str__(self):
        return f"{self.student} enrolled in {self.course}"


# ------------------------
# PADRES
# ------------------------
class Parent(models.Model):
    first_name = models.CharField(max_length=100)
    last_name = models.CharField(max_length=100)
    phone = models.CharField(max_length=20, blank=True, null=True)
    students = models.ManyToManyField(Student, related_name='parents')
    email = models.EmailField(max_length=100, null=True, blank=True)
    photo = models.ImageField(upload_to='parents/photos/', null=True, blank=True)
    gender = models.CharField(
        max_length=10,
        choices=[('M','Masculino'), ('F','Femenino')],
        null=True,   
        blank=True   
    )

    def __str__(self):
        return f"{self.first_name} {self.last_name}"


# ------------------------
# CALIFICACIONES
# ------------------------
class GradeRecord(models.Model):
    student = models.ForeignKey(Student, on_delete=models.CASCADE)
    course = models.ForeignKey(Course, on_delete=models.CASCADE)
    teacher = models.ForeignKey(Teacher, on_delete=models.CASCADE)
    score = models.DecimalField(max_digits=5, decimal_places=2)
    date = models.DateField(auto_now_add=True)
    comments = models.TextField(blank=True, null=True)
    def __str__(self):
        return f"{self.student} - {self.course}: {self.score}"

# ------------------------
# ASISTENCIA 
# ------------------------
class Attendance(models.Model):
    student = models.ForeignKey(Student, on_delete=models.CASCADE)
    section = models.ForeignKey(Section, on_delete=models.CASCADE)
    date = models.DateField()
    status = models.CharField(max_length=10, choices=[('present','Presente'), ('absent','Ausente'), ('late','Tarde')])
    justreasonification = models.TextField(
        blank=True,  
        null=True,   
        help_text="Motivo de la ausencia o tardanza, si aplica."
    )
    def __str__(self):
        return f"{self.student} - {self.date}: {self.status}"

# ------------------------
# Mensajes
# ------------------------
class Notification(models.Model):
    sender = models.ForeignKey('auth.User', on_delete=models.CASCADE, related_name='sent_notifications')
    recipient = models.ForeignKey('auth.User', on_delete=models.CASCADE, related_name='received_notifications')
    student = models.ForeignKey(Student, on_delete=models.CASCADE, null=True, blank=True)
    message = models.TextField()
    read = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"From {self.sender} to {self.recipient}: {self.message[:20]}"
