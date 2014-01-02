from django.conf.urls import patterns, include, url
from django.core.urlresolvers import reverse
from django.views.generic import TemplateView
from . import views

urlpatterns = patterns('',
    url(r'^$', views.MainView.as_view(), name='main'), 
    url(r'^about_us/$', 
        TemplateView.as_view(template_name="basal/aboutus.html"),
        name='about_us'),
    url(r'^registration/$', views.RegistrationView.as_view(), 
        name='registration'),
    url(r'^login/$', 
        'django.contrib.auth.views.login', {
            'template_name': 'basal/login.html'},
        name='login'),
    url(r'^logout/$', views.logout_view, name='logout'),
    url(r'^password_reset/$', 'django.contrib.auth.views.password_reset', {
            'template_name': 'basal/password_reset.html',
            'email_template_name': 'basal/password_reset_email.html',
            'post_reset_redirect': '/courses/'}, 
        name='password_reset'),
    url(r'^password_reset_confirm/(?P<uidb36>[0-9A-Za-z]+)-(?P<token>.+)/$', 
        'django.contrib.auth.views.password_reset_confirm', {
            'template_name': 'basal/password_reset_confirm.html',
            'post_reset_redirect': '/courses/'},
        name='password_reset_confirm'),
    url(r'^dashboard/$', views.DashboardView.as_view(), name='dashboard'), 
    url(r'^dashboard/password_change/$', 
        'django.contrib.auth.views.password_change', {
            'template_name': 'basal/password_change.html',
            'post_change_redirect': '/dashboard/'},
        name='password_change'),
    url(r'^dashboard/profile_update/$', views.ProfileUpdateView.as_view(),
        name='profile_update'),
)
