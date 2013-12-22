from django.contrib import admin
from .models import *
from django.forms import Textarea
from django.db import models
           
class CourseAdmin(admin.ModelAdmin):
    prepopulated_fields = {'slug': ('title',)}
    fields = ['title', 'slug', 'short_description', 
                'long_description', 'summary']
    list_display = ['title']

    formfield_overrides = {
        models.TextField: { 'widget': Textarea(attrs={ 'rows': 15,
                                                       'cols': 90 })},
    }

class InstructionInline(admin.TabularInline):
    model = Instruction
    extra = 1

    formfield_overrides = {
        models.TextField: { 'widget': Textarea(attrs={ 'rows': 2,
                                                       'cols': 90 })},
    }

class HintInline(admin.TabularInline):
    model = Hint
    extra = 1

    formfield_overrides = {
        models.TextField: { 'widget': Textarea(attrs={ 'rows': 2,
                                                       'cols': 90 })},
    }

class SupportCodeInline(admin.StackedInline):
    model = SupportCode
    extra = 1

    formfield_overrides = {
        models.TextField: { 'widget': Textarea(attrs={ 'rows': 9,
                                                       'cols': 90 })},
    }

class LessonAdmin(admin.ModelAdmin):
    fields = ['course_id', 'no', 'video_link', 'title', 'description']
    list_display = ['course_id', 'no', 'title']
    ordering = ('course_id', 'no')
 
class ChallengeAdmin(admin.ModelAdmin):
    fields = ['title', 'lesson_id', 'no', 'description', 'answer_snippet', 
              'snippet', 'next_url']
    list_display = ['lesson_id', 'no', 'title', 'next_url']

    inlines = [SupportCodeInline, InstructionInline, HintInline]
    ordering = ('lesson_id', 'no')

admin.site.register(Course, CourseAdmin)
admin.site.register(Lesson, LessonAdmin)
admin.site.register(Challenge, ChallengeAdmin)
