from django.db import models
from datetime import datetime, timedelta
from django.core.urlresolvers import reverse



'''
	Runs are saved as a custom string in database
	Strings are parsed in right format in views.py
'''

class SavedRuns(models.Model):
	pins = models.CharField(max_length=1000)

	# Is there a way to format DateTime in here?
	# Currently have to format output always
	created = models.DateTimeField(default=datetime.now() + timedelta(hours=3), blank=True)


	# absolute url returned after saving runs
	def get_absolute_url(self):
		return reverse('loadedRun', kwargs={'primarykey':self.pk})


	# Display object with this string, Load Runs
	def __str__(self):
		formated = self.created.strftime("%H:%M %d/%m/%Y")
		return formated

		