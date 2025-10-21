from django.contrib import admin
from django.urls import path, include
from django.views.generic import TemplateView
from django.conf import settings
from django.conf.urls.static import static
from rest_framework import routers
from core.views import (
    GradeViewSet, SectionViewSet, StudentViewSet, TeacherViewSet, CourseViewSet,
    TeachingAssignmentViewSet, HeadmasterViewSet, EnrollmentViewSet, ParentViewSet,
    GradeRecordViewSet, AttendanceViewSet, NotificationViewSet
)

# ------------------------
# ROUTER
# ------------------------
router = routers.DefaultRouter()
router.register(r'grades', GradeViewSet)
router.register(r'sections', SectionViewSet)
router.register(r'students', StudentViewSet)
router.register(r'teachers', TeacherViewSet)
router.register(r'courses', CourseViewSet)
router.register(r'teaching-assignments', TeachingAssignmentViewSet)
router.register(r'headmasters', HeadmasterViewSet)
router.register(r'enrollments', EnrollmentViewSet)
router.register(r'parents', ParentViewSet)
router.register(r'grade-records', GradeRecordViewSet)
router.register(r'attendance', AttendanceViewSet)
router.register(r'notifications', NotificationViewSet)

# ------------------------
# URLS
# ------------------------
urlpatterns = [
    path('', TemplateView.as_view(template_name='back.html'), name='home'),
    path('admin/', admin.site.urls),
    path('api/', include(router.urls)),
]

# Para servir archivos media
if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
