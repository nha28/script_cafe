from django.views import generic
from django.contrib.auth.models import User
from courses.models import *
from .forms import *
from patio.models import *
from django.contrib.auth.forms import *
from django.contrib.auth import login, logout, get_user_model
from django.utils.decorators import method_decorator
from django.contrib.auth.decorators import login_required
from django.contrib import messages
from django.http import HttpResponseRedirect, HttpResponse, HttpResponseServerError
from django.core.urlresolvers import reverse
from django.contrib.auth.forms import UserCreationForm
from django.contrib.auth.views import password_reset
from django.shortcuts import render

class MainView(generic.FormView):
    form_class = AuthenticationForm
    template_name = 'patio/main.html'

    def get(self, request, *args, **kwargs):
        if self.request.user.is_authenticated():
            return HttpResponseRedirect(reverse('patio:dashboard'))
        else:
            form_class = self.get_form_class()
            form = self.get_form(form_class)
            return self.render_to_response(self.get_context_data(form=form))

class RegistrationView(generic.FormView):
    template_name = 'patio/registration.html'
    form_class = UserCreationForm

    def form_valid(self, form):
        user = form.save()
        new_user_profile = UserProfile(user=user,about_me='',location='') 
#        import pdb;pdb.set_trace()
        new_user_profile.save()

        messages.success(self.request, 
                'Registraion success! Welcome to coding ABC.')
        new_user = authenticate(username=self.request.POST['username'],
                                password=self.request.POST['password1'])
        login(self.request, new_user)
    
        return HttpResponseRedirect(reverse('patio:main'))

class DashboardView(generic.TemplateView):
    template_name = 'patio/dashboard.html'
    
    def get_context_data(self, **kwargs):
        context = super(DashboardView, self).get_context_data(**kwargs)
#        import pdb;pdb.set_trace()
        user = UserProfile.objects.get(user=self.request.user.id)

        context['userprofile'] = user 
        html_total = Course.objects.get(slug='html').get_total_challenges()
        css_total = Course.objects.get(slug='css').get_total_challenges()

        context['progress'] = { 
            'html_progress': user.get_all_completed_challenges('html').count(),
            'html_total': html_total, 
            'css_progress': user.get_all_completed_challenges('css').count(),
            'css_total': css_total
        }
        if user.get_last_challenge() is None:
            context['display_last_challenge'] = False
        else:
            context['display_last_challenge'] = True
            context['last_challenge'] = user.get_last_challenge()

        context['completed_day'] = user.get_challenges_completed_day()
        context['completed_week'] = user.get_challenges_completed_week()

        return context

    @method_decorator(login_required)
    def dispatch(self, *args, **kwargs):
        return super(DashboardView, self).dispatch(*args, **kwargs)

class ProfileUpdateView(generic.UpdateView):
    model = User
    form_class = UserForm
    template_name = 'patio/profile_update.html'

    def get_success_url(self):
        messages.success(self.request, 'profile updated successfully')
        return reverse('patio:main')

    def get_object(self):
        obj = User.objects.get(id=self.request.user.id)
        return obj

    @method_decorator(login_required)
    def dispatch(self, *args, **kwargs):
        return super(ProfileUpdateView, self).dispatch(*args, **kwargs)

def logout_view(request):
    logout(request)
#    messages.success(request, 'logout successfully')
    return HttpResponseRedirect(reverse('patio:main'))
