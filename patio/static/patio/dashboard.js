$(document).ready(function() {
	get_htmlPieChart();
	get_cssPieChart();
});

function get_password_change_form() {
    this.url = $('#change_password_button').data('url');
    var ajax_this = this;
    $.ajax({
        timeout: 3000,
           type: 'GET',
            url: ajax_this.url,
        context: ajax_this,
        success: function(response) {
            display_popup(response);
        }
    });
}

function get_profile_update_form() {
    this.url = $('#update_profile_button').data('url');
    var ajax_this = this;
    $.ajax({
        timeout: 3000,
           type: 'GET',
            url: ajax_this.url,
        context: ajax_this,
        success: function(response) {
            display_popup(response);
        }
    });
}

function get_htmlPieChart() {
	var value1 = $("#html_total").text();
	var value2 = ($("#html_completed").text()/value1)*100;
	var data = [['html_completed',value2],['html_total',100-value2]];
	var plot1 = jQuery.jqplot ('chart1', [data], { 
		  seriesDefaults: {
			// Make this a pie chart.
			renderer: jQuery.jqplot.PieRenderer, 
			//rendererOptions: {
			  // Put data labels on the pie slices.
			  // By default, labels show the percentage of the slice.
			  //showDataLabels: true,
			//}
		  }, 
		seriesColors: [ "#cab3a4", "#7FFFD4"],
		legend: { location: 'e' },
		grid: {borderWidth:0, shadow:false, background: 'none'} //hide the borders
		}
	  );
}

function get_cssPieChart() {
	var value3 = $("#css_total").text();
	var value4 = ($("#css_completed").text()/value3)*100;
	var data = [['css_completed',value4],['css_total',100-value4]];
	var plot2 = jQuery.jqplot ('chart2', [data], { 
		  seriesDefaults: {
			// Make this a pie chart.
			renderer: jQuery.jqplot.PieRenderer, 
			//rendererOptions: {
			  // Put data labels on the pie slices.
			  // By default, labels show the percentage of the slice.
			  //showDataLabels: true,
			//}
		  }, 
		seriesColors: [ "#cab3a4", "#7FFFD4"],
		legend: { location: 'e' },
		grid: {borderWidth:0, shadow:false, background: 'none'} //hide the borders
		}
	  );
}