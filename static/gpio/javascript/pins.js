
/**

	Parse pin attributes from pin number and return dictionary

**/

function setup_pin( el_clicked )
{

	var el_value = parseInt( el_clicked.attr('pin_val') );

	var setup = {'type':'success', 'text':'Pin ' + String(el_value), 'value':String(el_value)};
	
	return setup;

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







