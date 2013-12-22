from django.db import models
from patio.models import *
from django.contrib.auth.models import User

class Course(models.Model):
    title = models.CharField(max_length=50)
    slug = models.SlugField(max_length=50)
    short_description = models.TextField()
    long_description = models.TextField()
    summary = models.TextField()

    def __unicode__(self):
        return u'[%s Course]' % str(self.title)

    def get_total_challenges(self):
        return Challenge.objects.filter(lesson_id__course_id=self.id).count()

class Lesson(models.Model):
    title = models.CharField(max_length= 100)
    no = models.SmallIntegerField()
    description = models.TextField()
    course_id = models.ForeignKey(Course)
    video_link = models.URLField()

    def __unicode__(self):
        return u'%s[Lesson %s]' % (str(self.course_id), str(self.no))

    def get_all_challenge(self):
        return Challenge.objects.filter(lesson_id=self.id)

class Challenge(models.Model):
    NEXT_URL_CHOICES = (
        ('next_challenge', 'Next Challenge'),
        ('next_lesson', 'Next Lesson'),
        ('end_of_course', 'End of Course'),
    )
    lesson_id = models.ForeignKey(Lesson)
    title = models.CharField(max_length=100)
    no = models.SmallIntegerField()
    description = models.TextField()
    snippet = models.TextField()
    answer_snippet = models.TextField()
    next_url = models.CharField(max_length=20,
                                choices=NEXT_URL_CHOICES,
                                default='next_challenge')

    def __unicode__(self):
        return u'%s[Challenge %s: %s]' %  (self.lesson_id, 
                                          str(self.no), self.title)

    def get_course(self):
        return self.lesson_id.course_id.title

class SupportCode(models.Model):
    CODE_TYPE_CHOICES = (
        ('html', 'HTML'),
    )
    type = models.CharField(max_length=10,
                            choices=CODE_TYPE_CHOICES,
                            default='html')
    challenge_id = models.ForeignKey(Challenge)
    snippet = models.TextField()

    def __unicode__(self):
        return u'%s [Support %s]' % (str(self.challenge_id), str(self.type))

class Instruction(models.Model):
    description = models.TextField()
    challenge_id = models.ForeignKey(Challenge)

    def __unicode__(self):
        return u'%s [Instruction %s]' % (str(self.challenge_id), str(self.id))

class Hint(models.Model):
    description = models.TextField()
    challenge_id = models.ForeignKey(Challenge)

    def __unicode__(self):
        return u'%s [Hint %s]' % (str(self.challenge_id), str(self.id))
