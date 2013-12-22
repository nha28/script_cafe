from django.conf.urls import patterns, url
from . import views
from django.views.generic import TemplateView
from django.views.decorators.csrf import csrf_exempt

urlpatterns = patterns('',
    url(r'^$', views.CourseIndexView.as_view(), name='course_index'),
    url(r'^(?P<course>\w+)/$', views.LessonIndexView.as_view(), 
        name='lesson_index'),
    url(r'^(?P<course>\w+)/end_of_course/$', 
        views.EndOfCourseView.as_view(), name='end_of_course'),
    url(r'^(?P<course>\w+)/lesson_(?P<l_no>\d+)/$', 
        views.LessonView.as_view(), name='lesson'),
    url(r'^(?P<course>\w+)/lesson_(?P<l_no>\d+)/challenge_(?P<c_no>\d+)/$', 
        views.ChallengeView.as_view(), name='challenge'),
    
)
