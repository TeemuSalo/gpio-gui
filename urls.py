from django.conf.urls import url, include
from . import views


# dont start url with ' / '

urlpatterns = [ 

	# /
	# must end in '$' for reverse url to work (primarykey variable)
	url(r'^$', views.index, name='index' ),

	# SAVE RUN
	# /add/
	url(r'add/$', views.savePins, name='add'),
	
	# RegExp: Starts with, Group together, as primarykey, Digits one or more
	# Use this to indetify rows in database for Primary Key
	
	# LOAD RUN
	# /42/
	# must reference this name (loadedRun) in template reverse url
	url(r'^(?P<primarykey>\d+)$', views.loadedRun, name='loadedRun'),

	# DELETE RUN
	# /delete/42
	# must reference this name (loadedRun) in template reverse url
	url(r'^delete/(?P<primarykey>\d+)$', views.deleteRun, name='deleteRun'),

	# MAKE GPIO COMMANDS
	url(r'^ajax/$', views.ajax, name='ajax'),
	
 ]