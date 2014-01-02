from django.utils import timezone
from django.views import generic
from .models import *
from basal.models import *
from django.contrib.auth.models import User
from django.utils.decorators import method_decorator
from django.contrib.auth.decorators import login_required 
from django.views.decorators.csrf import ensure_csrf_cookie
#from django.utils import timezone
from django.http import HttpResponseRedirect, HttpResponse, HttpResponseServerError
from django.core.urlresolvers import reverse
from django.shortcuts import get_object_or_404, render_to_response

class CourseIndexView(generic.TemplateView):
    template_name = 'courses/course_index.html'

    def get_context_data(self, **kwargs):
        context = super(CourseIndexView, self).get_context_data(**kwargs)
        temp = Course.objects.all()
        context['course_list'] = {}

        for i in range(0, temp.count()):
#            import pdb;pdb.set_trace()
            current_user = UserProfile.objects.get(user_id=self.request.user) 

            context['course_list'][temp[i].slug] = {
                    'title': temp[i].title,
                    'short_description': temp[i].short_description,
                    'slug': temp[i].slug,
                    'completed': current_user.completed_course(temp[i].slug)}

        return context

    @method_decorator(login_required)
    def dispatch(self, *args, **kwargs):
        return super(CourseIndexView, self).dispatch(*args, **kwargs)

class LessonIndexView(generic.TemplateView):
    template_name = 'courses/lesson_index.html'

    def get_queryset(self):
        return Lesson.objects.filter(course_id__slug=self.kwargs['course']) 

    def get_context_data(self, **kwargs):
        context = super(LessonIndexView, self).get_context_data(**kwargs)

        current_user = UserProfile.objects.get(user_id=self.request.user)
        l_set = Lesson.objects.filter(course_id__slug=self.kwargs['course']) 

        context['course'] = self.kwargs['course'] 
        context['lesson_list'] = {}

        for i in range(0, l_set.count()):
            context['lesson_list'][l_set[i].no] = {
                       'title': l_set[i].title,
                          'no': l_set[i].no,
                 'description': l_set[i].description,
                  'challenges': {}
            }

            current = context['lesson_list'][l_set[i].no]['challenges']

            c_set = l_set[i].get_all_challenge()

            for j in range(0, c_set.count()):
                temp = current_user.completed_challenge(c_set[j].id)
      #          import pdb;pdb.set_trace()
                
                current[c_set[j].no]= {
                        'title': c_set[j].title,
                           'no': c_set[j].no,
                    'completed':  temp
                }

        return context

    @method_decorator(login_required)
    def dispatch(self, *args, **kwargs):
        return super(LessonIndexView, self).dispatch(*args, **kwargs)

class LessonView(generic.TemplateView):
    template_name = 'courses/lesson.html'

    def get_context_data(self, **kwargs):
#        import pdb;pdb.set_trace()
        context = super(LessonView, self).get_context_data(**kwargs)
        temp = Lesson.objects.filter(course_id__slug=self.kwargs['course'])
        context['lesson'] = temp.get(no=self.kwargs['l_no'])
        context['course'] = Course.objects.get(slug=self.kwargs['course'])
        return context

    @method_decorator(login_required)
    def dispatch(self, *args, **kwargs):
        return super(LessonView, self).dispatch(*args, **kwargs)


class ChallengeView(generic.UpdateView):
    template_name = 'courses/challenge.html'

    def get_object(self):
        course = self.kwargs['course']

        user = User.objects.get(id=self.request.user.id)
        temp = Challenge.objects.filter(lesson_id__course_id__slug=course)
        temp = temp.filter(lesson_id__no=self.kwargs['l_no'])

#        import pdb;pdb.set_trace()
        challenge = temp.get(no=self.kwargs['c_no'])

        try:
            temp = ChallengeProgress.objects.filter(user_id=user.id)
            challenge_progress = temp.get(challenge_id=challenge.id)

        except ChallengeProgress.DoesNotExist:
            challenge_progress = ChallengeProgress(challenge_id=challenge,
                                             user_id=user,
                                             snippet=challenge.snippet)
            challenge_progress.save()
        return challenge_progress

    def get_context_data(self, **kwargs):
        context = super(ChallengeView, self).get_context_data(**kwargs)

        course = self.kwargs['course']
        temp = Challenge.objects.filter(lesson_id__course_id__slug=course)
        temp = temp.filter(lesson_id__no=self.kwargs['l_no'])

        context['challenge'] = temp.get(no=self.kwargs['c_no'])
        context['course'] = Course.objects.get(slug=self.kwargs['course'])
        context['l_no'] = self.kwargs['l_no']

        user = UserProfile.objects.get(user=self.request.user)
        context['the_user'] = user
        return context

    def post(self, request, *args, **kwargs):
        user = User.objects.get(id=self.request.user.id)
        course = self.kwargs['course']
        temp = Challenge.objects.filter(lesson_id__course_id__slug=course)
        temp = temp.filter(lesson_id__no=self.kwargs['l_no'])
        challenge = temp.get(no=self.kwargs['c_no'])

        try:
            temp = ChallengeProgress.objects.filter(user_id=user.id)
            challenge_progress = temp.get(challenge_id=challenge.id)
            challenge_progress.snippet = request.body
            challenge_progress.completed_date = timezone.now()

        except ChallengeProgress.DoesNotExist:
            challenge_progress = ChallengeProgress(challenge_id=challenge,
                                            user_id=user,
                                            snippet=request.body,
                                            completed_date=timezone.now())
        
        challenge_progress.save()

#        import pdb;pdb.set_trace()
        if challenge.next_url == 'next_challenge':
            message = "Well done! Let's move on to the next challenge"
            button_val = 'Next Challenge'
            next_url = reverse('courses:challenge', kwargs={
                'course': kwargs['course'],
                'l_no': kwargs['l_no'],
                    'c_no': int(kwargs['c_no']) + 1})
            
        elif challenge.next_url == 'next_lesson':
            message = "Well done! You have completed this lesson. Let's " \
                      "move on to the next lesson"
            button_val = 'Next Lesson'
            next_url = reverse('courses:challenge', kwargs={
                'course': kwargs['course'],
                'l_no': int(kwargs['l_no']) + 1,
                    'c_no': 1})

        else :
            message = 'Congratulations, You have completed the course!'
            button_val = 'End of Course'
            next_url = reverse('courses:end_of_course', kwargs={
                'course': kwargs['course']})

        return render_to_response('courses/success_snippet.html', {
               'message': message,
            'button_val': button_val,
              'next_url': next_url 
        })

    @method_decorator(login_required)
    @method_decorator(ensure_csrf_cookie)
    def dispatch(self, *args, **kwargs):
        return super(ChallengeView, self).dispatch(*args, **kwargs)

class EndOfCourseView(generic.DetailView):
    template_name = 'courses/end_of_course.html'
    context_object_name = 'course'

    def get_object(self):
        return Course.objects.get(slug=self.kwargs['course'])

    @method_decorator(login_required)
    def dispatch(self, *args, **kwargs):
        return super(EndOfCourseView, self).dispatch(*args, **kwargs)

