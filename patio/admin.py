from django.contrib import admin
from django.forms import Textarea
from django.contrib.auth.admin import UserAdmin
from django.contrib.auth.models import User

from .models import *

class UserProfileInline(admin.StackedInline):
    model = UserProfile
    can_delete = False

class UserAdmin(UserAdmin):
    inlines = (UserProfileInline, )

class ChallengeProgressAdmin(admin.ModelAdmin):
    model = ChallengeProgress
    list_display = ('user_id', 'challenge_id', 
                    'was_completed', 'completed_date')

    formfield_overrides = { models.TextField: { 
                            'widget': Textarea(attrs={ 'rows': 9,
                                                       'cols': 90 })},
                          }

    ordering = ('user_id', 'challenge_id')
    
admin.site.unregister(User)
admin.site.register(User, UserAdmin)
admin.site.register(ChallengeProgress, ChallengeProgressAdmin)
