var socket = io();
var enable_log_data_to_console = false;

socket.on('serial-data', function(data){
	plot_chart(data);
});

socket.on('serial-device', function(data){
	log_to_console(data);
    showDeviceInformation(data.data);
	myLineChart.data.datasets[0].label = data.data.comName + " " + data.data.manufacturer;

});

var console_el = document.getElementById('console');

var allow_updates_on_screen = true;

document.getElementById('btn_pause').addEventListener('click', function(){
    allow_updates_on_screen = !allow_updates_on_screen;
    if(allow_updates_on_screen){
        this.innerHTML = '<i class="fa fa-pause" aria-hidden="true"></i> Pause Chart Updates';
        myLineChart.update();
    } else {
        this.innerHTML = '<i class="fa fa-play" aria-hidden="true"></i> Resume Chart Updates';
    }
});

function plot_chart(data_obj){

	var val = data_obj.data;
	var emittedAt = data_obj.emittedAt;

	log_to_console(data_obj);

    myLineChart.data.datasets[0].data.push(val);
    myLineChart.data.labels.push(emittedAt);

    var ln = myLineChart.data.labels.length;
    if(ln > 100){
    	myLineChart.data.datasets[0].data=  myLineChart.data.datasets[0].data.slice(1,ln);
		myLineChart.data.labels= myLineChart.data.labels.slice(1,ln);
    }
    if(allow_updates_on_screen) myLineChart.update();

}

function log_to_console(data){
	if(enable_log_data_to_console) console.log(data);
	console_el.innerHTML = '<div class="data-row"><span class="info">' 
                                + new Date().toLocaleString()
                                + '</span><span class="value">' 
                                + JSON.stringify(data)
                                +'</span></div>' + console_el.innerHTML;

}

function showDeviceInformation(data){
    // console.log(data);
    document.getElementById('d_comName').innerText = data.comName;
    document.getElementById('d_locationId').innerText = data.locationId;
    document.getElementById('d_manufacturer').innerText = data.manufacturer;
    document.getElementById('d_pnpId').innerText = data.pnpId;
    document.getElementById('d_productId').innerText = data.productId;
    document.getElementById('d_vendorId').innerText = data.vendorId;
    document.getElementById('d_baudRate').innerText = data.baudRate;
}

var ctx = document.getElementById("myChart");
var chart_data = [];
var data = {
    labels: [],
    datasets: [
        {
            label: "My First dataset",
            fill: false,
            lineTension: 0.2,
            backgroundColor: "#965afc",
            borderColor: "#7d52c6",
            borderCapStyle: 'butt',
            borderDash: [],
            borderWidth: 1.5,
            borderDashOffset: 0.0,
            borderJoinStyle: 'miter',
            pointBorderColor: "#fff",
            pointBackgroundColor: "#7d52c6",
            pointBorderWidth: 1,
            pointHoverRadius: 5,
            pointHoverBackgroundColor: "#7d52c6",
            pointHoverBorderColor: "rgba(220,220,220,1)",
            pointHoverBorderWidth: 2,
            pointRadius: 4,
            pointHitRadius: 10,
            data: chart_data,
            spanGaps: false,
        }
    ]
};
Chart.defaults.global.animation.duration = 1;

var myLineChart = new Chart(ctx, {
    type: 'line',
    data: data,
    options: {
    	responsive: true,
    	maintainAspectRatio: false,
    	scales: {
    		xAxes: [{
    			type: 'time'
    		}
    		]
    	}
    }
});