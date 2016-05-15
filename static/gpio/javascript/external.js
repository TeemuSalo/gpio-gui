$( document ).ready(function() {


	// RUN DELAY
	// uses jquery touchspin library
	$("input[name='delay']").TouchSpin({
		min: 100,
		max: 10000,
		step: 100,
		decimals: 0,
		boostat: 5,
		maxboostedstep: 500,
		postfix: 'ms'
	});


	// ADD NEW LINE OF PINS
	$('.pins').on('click', function (event) {

		event.preventDefault();

		var setup_list = setup_pin($(this));

		create_line( setup_list );

  	});

	
	// html used in top buttons click warning
	var alerthtml = '\
		<div class="alert alert-danger fade-in">\
			<a href="#" class="close" data-dismiss="alert" aria-label="close">&times;</a>\
		  	<strong>HUOM!</strong> Luo ensin vähintään yksi rivi\
		</div>';



	// ADD ONE OR FIVE LIKE THE LAST PIN OR CLEAR ALL
	$('.top-buttons').on('click', function () {

		// Check how many lines exist
		if($("div.PinLinesContainer").children().length > 0)
		{
			// If add one clicked
			if($(this).attr('id')=='addone')
			{	
				var last_line = $("div.PinLinesContainer").children().last().find('option:selected');
				setup = setup_pin(last_line);
				create_line(setup);
			}

			// If add five clicked
			else if($(this).attr('id')=='addfive')
			{
				var last_line = $("div.PinLinesContainer").children().last().find('option:selected');

				for(var i = 0; i < 5; i++) {
					setup = setup_pin(last_line);
					create_line(setup);
				}
			}

			// If clear all pins clicked
			else if($(this).attr('id')=='clearAll')
			{
				$(".PinLinesContainer").empty();
			}
		}

		// Display warning if no line exist yet
		else
		{
			$("#alert-box").append(alerthtml);
			$("#alert-box").children().each(function(i,e){
				$(this).delay(800).fadeOut(400, function(){$(this).remove();});
			});
		}
	});


	// SAVE CURRENT RUN TO DB
	$("#query").on("click", function(){

		parseDataToForm();

	});


	// Old function requested, error
	$('#sendajax').on('click', function(){

		console.log("old id sendajax clicked");
	});



	/* PARSE RUN OPTIONS AND START FUNCTION */
	$('.startrun').on('click', function(){

		// Check run choice
		var run_choice = $('#run-choice').find('.active').attr('id');

		if( run_choice == 'manual' )
		{
			// MANUAL RUN
			var line = $(".PinLinesContainer").find("div.added-pin-row").not("div.used-pin-row").first();

			if( $('div.used-pin-row').length != $('div.added-pin-row').length )
			{

				line.addClass('used-pin-row');

				line.find('div.label').removeClass().addClass('col-sm-11 label label-default');

				var progress_now = parseInt( $('div.used-pin-row').length ) / parseInt( $('div.added-pin-row').length ) * 100;
			
				if( $('div.used-pin-row').length == 1 ){ 

					$('#info-box').html('')  // empty info-box on first round

				};
			
				manual_run( line, progress_now.toFixed(0) );
			}
			else{
				$('#info-box').append("No pins left, refresh page or choose another run<br/>");
			}
		}
		else
		{
			// AUTO RUN
			$('#info-box').html(''); // empty info-box

			$('div.progress-bar').css('width', '2%' ).attr('aria-valuenow', 0 ).html( '0%'); // empty progress
			
			var delay_amount = ( run_choice == 'auto') ? 100 : parseInt( $('#delay').val() );

			auto_run(delay_amount);
		}

	});

});



/**** DYNAMIC CONTENT ON-CLICK FUNCTIONS ****/



/* CHANGE PIN POWER DIRECTION */
$(document.body).on('click', ' .Pin-Dir' ,function(){

	$(this).text(function(i, text){
		
		// i = index position of the element in the set
		// text = returns current content of selected element
	    return text === "Pin-HIGH" ? "Pin-LOW" : "Pin-HIGH";
   	});

	if( parseInt($(this).val()) == 0) {
		$(this).removeClass("btn-primary"); 
		$(this).addClass("btn-danger");
		$(this).val(1);
	}
	else { 
		$(this).removeClass("btn-danger"); 
		$(this).addClass("btn-primary");
		$(this).val(0);
	}
});


/* REMOVE PIN LINE */
$(document.body).on('click', 'span.remove-line' ,function(){

		// Remove including self
		$(this).closest('.added-pin-row').remove();
});


/* SELECT OPTIONS, CHANCE COLOR ON CLICK */
$(document.body).on('click', 'div.added-pin-row option' ,function(){

		returned_list = setup_pin( $(this) );
		pin_color = returned_list['type'];
		$(this).closest('div.label').removeClass().addClass('col-sm-11 label label-' + pin_color );
});

/** dynamic elements on click ends**/



// Legacy check, delete
function createPinLine(pinSetup) {

	console.log('depracated create pin used, external 149');
}




/*** SAVE CURRENT RUN TO DATABASE ***/
function parseDataToForm(){

// MAKE JSON FROM THIS //
	
	// Hidden form select
	var formVal = $("#pins-form");

	var everything = '';

	// Go through each div in added-pin-row
	$(".added-pin-row").each(function(i,e){


		/* setup variables */
		var pin = $(this).find("option:selected");

		var returned_setup = setup_pin( pin );

		//var pin_color = returned_setup['type']; // success, primary, warning, danger



		/* concatenate into data one row */
		var data = returned_setup['value']; // 1 - 40

		data += ",";
	
		// Pin color always success now
		//data += pin_color; // success, primary, warning, danger
		//data += ",";

		var pin_state = $(this).find("button").val();

		data += String(pin_state); // '1' OR '0'

		data += ",";

		var pin_direction_color = (pin_state == 1) ? 'danger,Pin-HIGH' : 'info,Pin-LOW'
	
		data += pin_direction_color;

		data += " ";

		everything += data; // "13,0,info,0 "


	});

	formVal.val(everything);

	$("#hidden-form").submit();
};






// AJAX RUN AUTO
function auto_run(delay) {

	progbar = $('.progress-bar');

	// count lines
	var lines_amount = $('.added-pin-row').length;

	// progbar step amount
	var prog_step = 100 / lines_amount;
	prog_step = prog_step.toFixed(0);

	// progressbar iterator //
	ite = 1;


	// Start Loop
	$('.added-pin-row').each(function(i,e){


		var current_pin_val = $(this).find('option:selected').attr('pin_val'); // Weak find
		var pinStat = $(this).find('button').val(); // Weak find


		var run_round = '';

		// Check what round is going
		if ( $(this).is(':first-child') ){
			// Set all pins to output
			run_round = 'first';

		}
		else if ( $(this).is(':last-child') ){
			// Do cleanup in view
			run_round = 'clean';

		}
		else {
			// Default
			run_round = 'pass'
		}

		setTimeout(function(){
	
			$.ajax({
				url : "ajax/", // hardcoded
				type : "POST", // method

				// data sent with the post request
				data : { "round" : run_round, "pin_send" : current_pin_val, "pin_direction" : pinStat },

				// handle a successful response
				success : function(json_response) {

					progbar.css('width', String( (ite/lines_amount*100).toFixed(0) + '%') ).
						attr('aria-valuenow', (ite/lines_amount*100).toFixed(0) ).
						html( String( (ite/lines_amount*100).toFixed(0) + '%') );

					ite++;

					$('#info-box').append( json_response["first"] + json_response["result"] + ':' +
											' Pin number: ' + json_response["pin_nro"] + 
											' Pin status: ' + json_response["pin_direction"] + '<br/>' +
											json_response["clean"] );
				},

				// handle a non-successful response
				error : function(xhr,errmsg,err) {
					// add the error to the info-box
					$('#info-box').html('ERROR, see console'); 
					// provide a bit more info about the error to the console
					console.log(xhr.status + ": " + xhr.responseText); 
					return false;
				}
			});
		}, (i+1) * delay ); // Timeout time amount
	});
};





// AJAX RUN MANUAL
function manual_run(pin_line, progress) {

	progbar = $('div.progress-bar');

	var current_pin_val = pin_line.find('option:selected').attr('pin_val'); // Weak find
	var pinStat = pin_line.find('button').val(); // Weak find

	var run_round = '';

	// Check what round is going
	if ( pin_line.is(':first-child') ){
		// Set all pins to output
		run_round = 'first';

	}
	else if ( pin_line.is(':last-child') ){
		// Do cleanup in view
		run_round = 'clean';

	}
	else {
		// Default
		run_round = 'pass'
	}
	

	$.ajax({
		url : "ajax/", // hardcoded
		type : "POST", // method
		
		// data sent with the post request
		data : { "round" : run_round, "pin_send" : current_pin_val, "pin_direction" : pinStat }, 

		// handle a successful response
		success : function(json_response) {
				
			progbar.css('width', String(progress) + '%' ).
				attr('aria-valuenow', progress ).
				html( String(progress + '%') );

			$('#info-box').append( json_response["first"] + json_response["result"] + ':' +
									' Pin number: ' + json_response["pin_nro"] + 
									' Pin status: ' + json_response["pin_direction"] + '<br/>' +
									json_response["clean"] );

		},

		// handle a non-successful response
		error : function(xhr,errmsg,err) {
			// add the error to the info-box
			$('#info-box').html('ERROR, see console'); 
			// provide a bit more info about the error to the console
			console.log(xhr.status + ": " + xhr.responseText); 
			return false;
		}
	});
};




