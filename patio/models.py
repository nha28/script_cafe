import datetime
from django.db import models
from courses.models import Challenge, Course
from django.contrib.auth.models import User
from django.utils import timezone
from django.core.exceptions import ObjectDoesNotExist

class UserProfile(models.Model):
    user = models.OneToOneField(User)
    about_me = models.TextField()
    location = models.CharField(max_length=50)
    last_challenge = models.ForeignKey(Challenge, null=True, blank=True)

    def get_last_challenge(self):
        try:
            self.last_challenge
        except (NameError, ObjectDoesNotExist):
            return None
        else:
            return self.last_challenge

    def get_challenges_completed_day(self):
        temp = ChallengeProgress.objects.filter(user_id=self.user)
        return temp.filter(completed_date=timezone.now()).count()

    def new_user(self):
        if self.get_last_challenge() is None:
            return True
        else:
            return False

    def get_challenges_completed_week(self):
        date_temp = timezone.now() - datetime.timedelta(days=6)
        temp = ChallengeProgress.objects.filter(user_id=self.user)
        temp = temp.filter(completed_date__gt=date_temp)
        return temp.filter(completed_date=timezone.now()).count()

    def get_all_completed_challenges(self, slug):
        temp = ChallengeProgress.objects.filter(user_id=self.user)
        temp = temp.filter(challenge_id__lesson_id__course_id__slug=slug)
        return temp.filter(completed_date__lte=timezone.now())

    def completed_course(self, slug):
        temp = self.get_all_completed_challenges(slug).count()
        return temp == Course.objects.get(slug=slug).get_total_challenges()

    def completed_challenge(self, challenge_id):
#        import pdb;pdb.set_trace()
        try:
            ChallengeProgress.objects.filter(user_id=self.user)
        except (NameError, ObjectDoesNotExist):
            return False
        else:
            temp = ChallengeProgress.objects.filter(user_id=self.user)
        
        try:
            temp.get(challenge_id=challenge_id)
        except (NameError, ObjectDoesNotExist):
            return False
        else:
            return temp.get(challenge_id=challenge_id).was_completed()

    def new_user(self):
        try:
            temp = ChallengeProgress.objects.filter(user_id=self.user)
        except (ObjectDoesNotExist):
            return True
        else:
            if temp.count() == 0: 
                return True
            else:
                return False

class ChallengeProgress(models.Model):
    challenge_id = models.ForeignKey(Challenge)
    user_id = models.ForeignKey(User)
    snippet = models.TextField()
    completed_date = models.DateField(null=True, blank=True)
    
    def __unicode__(self):
        return '[Challenge Progress of %s] for %s' %  (
                self.user_id, self.challenge_id)

    def was_completed(self):
        try:
            self.completed_date
        except NameError:
            return False
        else:
            if self.completed_date is None:
                return False
            else:
                return True

    was_completed.admin_order_field = 'completed_date'
    was_completed.boolen = True
    was_completed.short_description = 'Completed?'
