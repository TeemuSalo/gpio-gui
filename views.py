from django.shortcuts import render
from django.http import HttpResponse
from django.shortcuts import redirect
from .models import SavedRuns
import json



_RPI_MODE_ = False;

#
#	Raspberry Pi mode can be turned of 
#	if testing is done elsewhere
#
<<<<<<< HEAD
if(_RPI_MODE_):
	import RPi.GPIO as GPIO
	GPIO.setmode(GPIO.BOARD)

	# Turn on/off warnings
	GPIO.setwarnings(False)
=======
if( _RPI_MODE_ ):
	import RPi.GPIO as GPIO
	#GPIO.setmode(GPIO.BOARD)

	# Turn on/off warnings
	#GPIO.setwarnings(False)

# Get range for all usable pins
pins_range = [3,5,7,8,10,11,12,13,15,16,18,19,21,22,23,24,26,29,31,32,33,35,36,37,38,40]


>>>>>>> gpio-origin/master


# DEFAULT
def index(request):

	# render looks for folder 'templates'
	# Django shares all template folders
	# return html file inside application folder

<<<<<<< HEAD
	# Get range for all pins
	pins_range = range(26)

=======
>>>>>>> gpio-origin/master
	# Get all objects for loading options
	all_objects = SavedRuns.objects.all()

	for current in all_objects:
		# Format time string
		current.created = current.created.strftime("%H:%M %d/%m/%Y");
	
	return render(request, 'gpio/system.html', {"saves":all_objects, "pins_range":pins_range} )


# SAVE RUN TO DATABASE
def savePins(request):
	
	if 'pins' in request.POST:

		# Save run sent with POST
		add_pins = SavedRuns()
		# Add pin configurations
		add_pins.pins = request.POST['pins']
		# Database will add creation time automatically		
		add_pins.save()
		
		sequel = request.POST['pins'].split(); 
<<<<<<< HEAD
		# ['13,success,1,danger,Pin-HIGH', '1,warning,0,primary,Pin-LOW']
=======
		# ['13,1,danger,Pin-HIGH'] 
		# OLD FORM ['1,warning,0,primary,Pin-LOW']
>>>>>>> gpio-origin/master
	
		ArrInArr = []

		for index in range(len(sequel)):
			ArrInArr.append(sequel[index].split(',')) 
<<<<<<< HEAD
			# [ ['13', 'success', '1', 'danger', 'Pin-HIGH'], ['1', 'warning', '0', 'primary', 'Pin-LOW'] ]
=======
			# [ ['13', '1', 'danger', 'Pin-HIGH'] ] 
			# OLD FORM [ ['1', 'warning', '0', 'primary', 'Pin-LOW'] ]
>>>>>>> gpio-origin/master
	else:
		ArrInArr = []
	
	# Redirect user to created run url
	return redirect(add_pins.get_absolute_url())


# LOAD RUN
def loadedRun(request, primarykey):

	# All pins range
<<<<<<< HEAD
	pins_range = range(26)
=======

>>>>>>> gpio-origin/master

	# Load run options
	all_objects = SavedRuns.objects.all()

	for current in all_objects:
		# Format time
		current.created = current.created.strftime("%H:%M %d/%m/%Y");

	# Load run in Database included in the url
	retrieved_run = SavedRuns.objects.get(pk=primarykey)
	ArrInArr = []
	retrieved_run_split = retrieved_run.pins.split()
	for index in range(len(retrieved_run_split)):
		ArrInArr.append(retrieved_run_split[index].split(','))

	# Render page with requested run
<<<<<<< HEAD
	return render(request, 'gpio/system.html', {"saves":all_objects, 'pins':ArrInArr, 'loadedRun': retrieved_run, "pins_range":pins_range} )
=======
	return render(request, 'gpio/system.html', {"saves":all_objects, 'pins':ArrInArr, 
					'loadedRun': retrieved_run, "pins_range":pins_range} )
>>>>>>> gpio-origin/master

# DELETE RUN
def deleteRun(request, primarykey):

<<<<<<< HEAD
	pins_range = range(26)
=======
	# All pins range
>>>>>>> gpio-origin/master

	SavedRuns.objects.get(pk=primarykey).delete()

	# Load runs options
	all_objects = SavedRuns.objects.all()

	for current in all_objects:
		current.created = current.created.strftime("%H:%M %d/%m/%Y");

	# Redirect user to main page
<<<<<<< HEAD
	return redirect('/gpio/')
=======
	return redirect('/')
>>>>>>> gpio-origin/master



# AJAX RUN
def ajax(request):

	if request.method == 'POST':
		run_round = request.POST.get('round')
		pin_received = int( request.POST.get('pin_send') )
		pin_dir_received = int( request.POST.get('pin_direction') )

		response_data = {}

		response_data["first"] = ""
		response_data["clean"] = ""

		# Give RPI commands
					

		# First round


		# RASPBERRY PI
		if ( _RPI_MODE_ and run_round == "first" ):
			
<<<<<<< HEAD
			for i in range(1,27):
				# Setup all pins as output
				GPIO.setup(i, GPIO.OUT)
				response_data["first"] = "First round, all pins set to output<br/><br/>"
=======
			# set mode here, why does global not work?
			GPIO.setmode(GPIO.BOARD)

			for i in pins_range:
				# Setup all pins as output
				GPIO.setup(i, GPIO.OUT)

			response_data["first"] = "First round, all pins set to output<br/><br/>"
>>>>>>> gpio-origin/master

		# DEVELOPMENT
		elif ( run_round == "first" ):
			
			print('First round, all to output')
			response_data["first"] = "First round, all pins set to output<br/><br/>"




		# Default round, no check


		# RASPBERRY PI
		if (_RPI_MODE_):
<<<<<<< HEAD
			
			pin_direction = GPIO.HIGH if pin_dir_received == 1 else GPIO.LOW
			GPIO.output( pin_received, pin_direction)
=======
			#GPIO.setmode(GPIO.BOARD)
			pin_direction = GPIO.HIGH if pin_dir_received == 1 else GPIO.LOW
			GPIO.output( pin_received, pin_direction )
			response_data['pin_nro'] = pin_received
			response_data['pin_direction'] = pin_dir_received
>>>>>>> gpio-origin/master

		# DEVELOPMENT
		else:
			
			response_data['pin_nro'] = pin_received
			response_data['pin_direction'] = pin_dir_received
			print('Activating pin %s with status %s' % (response_data['pin_nro'], response_data['pin_direction']) )




		# Cleanup after last round

		
		if run_round == "clean":

			# RASPBERRY PI
			if _RPI_MODE_:
				
				GPIO.cleanup()
				response_data["clean"] = "<br/>Pins cleaned afted last round<br/>"
			
			# DEVELOPMENT
			else:
				
				print('GPIO cleanup')
				response_data["clean"] = "<br/>Pins cleaned afted last round<br/>"



<<<<<<< HEAD

=======
>>>>>>> gpio-origin/master
		response_data['result'] = 'Success'		
	
		return HttpResponse( json.dumps(response_data),
						content_type="application/json")

	# NON-POST sent, return error
	else:
		return HttpResponse(
			json.dumps({"result": "something went wrong"}),
			content_type="application/json"
		)







	
<<<<<<< HEAD
	
=======
	
>>>>>>> gpio-origin/master
