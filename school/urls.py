from django.conf.urls import patterns, include, url
from django.contrib import admin

admin.autodiscover()

urlpatterns = patterns('',
    url(r'^', include('patio.urls', namespace='patio')), 
    url(r'^admin/', include(admin.site.urls)),
    url(r'^courses/', include('courses.urls', 
        namespace='courses')),
)
