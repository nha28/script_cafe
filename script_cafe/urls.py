from django.conf.urls import patterns, include, url
from django.contrib import admin

admin.autodiscover()

urlpatterns = patterns('',
    url(r'^', include('basal.urls', namespace='basal')), 
    url(r'^admin/', include(admin.site.urls)),
    url(r'^courses/', include('courses.urls', 
        namespace='courses')),
)
