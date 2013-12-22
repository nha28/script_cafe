#!/usr/bin/env python
import os, sys

# make sure app's modules can be found
sys.path.append('/home/weitongs')
sys.path.append('/home/weitongs/school')
os.environ['DJANGO_SETTINGS_MODULE'] = 'school.settings'

# Switch to the directory of your project. (Optional.)
# os.chdir("/home/weitongs/mysite")

import django.core.handlers.wsgi
application = django.core.handlers.wsgi.WSGIHandler()
