
/**

	Parse pin attributes from pin number and return dictionary

**/

function setup_pin( el_clicked )
{

	var el_value = parseInt( el_clicked.attr('pin_val') );

<<<<<<< HEAD
		switch( el_value ) {
    		case 1:
				var setup = {'type':'warning', 'text':'Pin 1 - 3.3V', 'value':'1'};
        		break;
    		case 2:
				var setup = {'type':'danger', 'text':'Pin 2 - 5V', 'value':'2'};
        		break;
    		case 3:
				var setup = {'type':'success', 'text':'Pin 3', 'value':'3'};
        		break;
    		case 4:
				var setup = {'type':'danger', 'text':'Pin 4 - 5V', 'value':'4'};
        		break;
    		case 5:
				var setup = {'type':'success', 'text':'Pin 5', 'value':'5'};
        		break;
    		case 6:
				var setup = {'type':'primary', 'text':'Pin 6 - Ground', 'value':'6'};
        		break;
    		case 7:
				var setup = {'type':'success', 'text':'Pin 7', 'value':'7'};
        		break;
    		case 8:
				var setup = {'type':'success', 'text':'Pin 8', 'value':'8'};
        		break;
    		case 9:
				var setup = {'type':'primary', 'text':'Pin 9 - Ground', 'value':'9'};
        		break;
    		case 10:
				var setup = {'type':'success', 'text':'Pin 10', 'value':'10'};
        		break;
    		case 11:
				var setup = {'type':'success', 'text':'Pin 11', 'value':'11'};;
        		break;
    		case 12:
				var setup = {'type':'success', 'text':'Pin 12', 'value':'12'};
        		break;
    		case 13:
				var setup = {'type':'success', 'text':'Pin 13', 'value':'13'};
        		break;
    		case 14:
				var setup = {'type':'primary', 'text':'Pin 14 - Ground', 'value':'14'};;
        		break;
    		case 15:
				var setup = {'type':'success', 'text':'Pin 15', 'value':'15'};
        		break;
    		case 16:
				var setup = {'type':'success', 'text':'Pin 16', 'value':'16'};
        		break;
    		case 17:
				var setup = {'type':'warning', 'text':'Pin 17 - 3.3V', 'value':'17'};
        		break;
    		case 18:
				var setup = {'type':'success', 'text':'Pin 18', 'value':'18'};
        		break;
    		case 19:
				var setup = {'type':'success', 'text':'Pin 19', 'value':'19'};
        		break;
    		case 20:
				var setup = {'type':'primary', 'text':'Pin 20 - Ground', 'value':'20'};
        		break;
    		case 21:
				var setup = {'type':'success', 'text':'Pin 21', 'value':'21'};
        		break;
    		case 22:
				var setup = {'type':'success', 'text':'Pin 22', 'value':'22'};
        		break;
    		case 23:
				var setup = {'type':'success', 'text':'Pin 23', 'value':'23'};
        		break;
    		case 24:
				var setup = {'type':'success', 'text':'Pin 24', 'value':'24'};
        		break;
    		case 25:
				var setup = {'type':'primary', 'text':'Pin 25 - Ground', 'value':'25'};
        		break;
    		case 26:
				var setup = {'type':'success', 'text':'Pin 26', 'value':'26'};
        		break;
    		default:
        		console.log('no match found');
		}
	
		return setup;
=======
	var setup = {'type':'success', 'text':'Pin ' + String(el_value), 'value':String(el_value)};
	
	return setup;
>>>>>>> gpio-origin/master

}

/***

	Create a new pin line with given dictionary attributes

***/

function create_line(pinSetup) {

	var pinType = pinSetup['type'];
	var text = pinSetup['text'];
	var pinValue = pinSetup['value'];

	var select_html = '<select class="select pull-left">';

	var selected = '';
	
	for( i = 1; i <= 26; i++){

		selected = ( i == parseInt(pinValue) ) ? 'selected' : '';

		select_html += "<option pin_val='"+i+"' "+selected+" >Pin "+i+"</option>";

	};

	select_html += '</select>';


	$(".PinLinesContainer").append("<div pin_val=' "+pinValue+" ' class='row added-pin-row '>\
		<div class='col-sm-1'><span class='glyphicon glyphicon-remove pull-left remove-line' aria-hidden='true'></span></div>\
		<div class='col-sm-11 label label-" + pinType +" '>\
		"+select_html+"\
		<button type='button' class='btn btn-info pull-right Pin-Dir' value='0'>Pin-LOW</button></div></div>");
}







