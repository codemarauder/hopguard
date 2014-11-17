/*$(function() {
	$( "#fromdate").wl_Date();
	$( "#fromdate").wl_Date( "option", "dateFormat", "yy-mm-dd" );
	$( "#fromdate").wl_Date( "setDate", "[% from_date %]");
	$( "#fromdate").wl_Date( "option", "minDate", '-1m' );
	$( "#fromdate").wl_Date( "option", "maxDate", '+0d' );
});

$(function() {
	$( "#todate").wl_Date();
	$( "#todate").wl_Date( "option", "dateFormat", "yy-mm-dd" );
	$( "#todate").wl_Date( "setDate", "[% to_date %]");
	$( "#fromdate").wl_Date( "option", "minDate", '-1m' );
	$( "#todate").wl_Date( "option", "maxDate", '+0d' );
}); */


//Function to reverse the data matrix from [x][y] to [y][x]
function reversedata(data){
	for (series in data){
       		var s = data[series];
                for (i=0;i<s.data.length;i++){
                     var tmp = s.data[i][0];
                     s.data[i][0] = s.data[i][1];
                     s.data[i][1] = tmp;
                 }
          }
	return data;
}

//Function to create DIV for tooltip
function showChartTooltip(x, y, contents) {
	$('<div id="charttooltip">' + contents + '</div>').css({
		position: 'absolute',
		display: 'none',
		top: y + 10,
		left: x +5,
		border: '1px solid #bfbfbf',
		padding: '2px',
		'background-color': '#ffffff',
		opacity: 0.8
	}).appendTo("body").fadeIn(200);
}

// Onclick submit form to take to other pages
function graphClick(event, pos, obj){
	if (!obj)
		return;
	var jForm = $(
			"<form  action='[% c.uri_for('/customer/useractivity/webaccess/sitedetail') %]' method='post'>" +
			"<input type='hidden' name='select_site' value='" + obj.series.label + "'>" +
			"</form>"
			);

	$( "body" ).append( jForm );
	jForm.submit();
}

// Plotter for content pie chart | ?select_user=[% filter_user %]&from_date=[% from_date %]&to_date=[% to_date %]
function plot(jsonurl,graphplaceholder,charttype){
$.ajax({
	method: 'get',
	url:	jsonurl,
	dataType: 'json',
	timeout: 60000,
	error: function(x, t, m) {
						if(t==="timeout") {
								alert("got timeout");
								} else {
								alert(t);
								}
						},
	success: function(data) {
	switch (charttype)
	{
		case "pie":
			try{
					$.plot($(graphplaceholder), data.piedata,{
						series: {
							pie: {
									show: true,
									radius: 1,
									innerRadius: 0.5,
									combine: {
										color: '#999',
										threshold: 0.03
									},
									label: {
										show: true,
										 //radius: 3/4,
										formatter: function(label, series){
										return '<div style="font-size:8pt;text-align:center;padding:2px;color:black;">'+label+'<br/>'+Math.round(series.percent)+'%</div>';
										},
										background: { opacity: 0.5 }
									}
							}

						},
						legend: { show: false},
						grid: {
							hoverable: true,
							clickable: true
						}
					});
					$(graphplaceholder).bind("plothover", function (event, pos, item) {
						return;
						if (item) {
							percent = parseFloat(item.series.percent).toFixed(2);
							showChartTooltip(pos.pageX, pos.pageY,item.series.label+' ('+percent+'MB)');
						} else {
							$("#charttooltip").remove();
						}
					});
				}catch(e){
					alert("someerror" + e);
				}
			break;
		case "bar":
				try{
						$.plot($(graphplaceholder), reversedata(data.flotdata),{
							bars: { show: true, horizontal: true, align: 'center'},
							//points: { show: true },
							yaxis: { position: 'left', ticks: data.xlabels},
							// transform: function (v) { return -v; } },
							xaxis: { position: 'top'},
							legend: { show: false},
							grid: { hoverable: true, clickable: true, borderColor: null, borderWidth: 0 }
						});
						$(graphplaceholder).bind("plothover", function (event, pos, item) {
							$("#x").text(pos.x.toFixed(2));
							$("#y").text(pos.y.toFixed(2));
							if (item) {
								$("#charttooltip").remove();
								var x = item.datapoint[0].toFixed(2),
								y = item.datapoint[1].toFixed(2);
								showChartTooltip(pos.pageX, pos.pageY,item.series.label+' ('+item.datapoint[0]+'MB)');
							} else {
								$("#charttooltip").remove();
							}
						});
						$(graphplaceholder).bind("plotclick", graphClick);
				}catch(e){
					alert("someerror" + e);
				}
			break;
	}
	}
});
}

/*
// Function for Top Download/ Upload bar graph | ?select_user=[% filter_user %]&from_date=[% from_date %]&to_date=[% to_date %]
$.ajax({
	method: 'get',
	url:	'/static/data/top_downloads_by_user.json',
	dataType: 'json',
	timeout: 60000,
	error: function(x, t, m) {
						if(t==="timeout") {
								alert("got timeout");
								} else {
								alert(t);
								}
						},
	success: function(data) {
		$.plot($("#dlulgraph"), reversedata(data.flotdata),{
			bars: { show: true, horizontal: true, align: 'center'},
			//points: { show: true },
			yaxis: { position: 'left', ticks: data.xlabels},
			// transform: function (v) { return -v; } },
			xaxis: { position: 'top'},
			legend: { show: false},
			grid: { hoverable: true, clickable: true, borderColor: null, borderWidth: 0 }
		});
		$("#dlulgraph").bind("plothover", function (event, pos, item) {
			$("#x").text(pos.x.toFixed(2));
			$("#y").text(pos.y.toFixed(2));
			if (item) {
				$("#charttooltip").remove();
				var x = item.datapoint[0].toFixed(2),
				y = item.datapoint[1].toFixed(2);
				showChartTooltip(pos.pageX, pos.pageY,item.series.label+' ('+item.datapoint[0]+'MB)');
			} else {
				$("#charttooltip").remove();
			}
		});
	}
});

// Function for Top Sites Bar Graph | ?select_user=[% filter_user %]&from_date=[% from_date %]&to_date=[% to_date %]
$.ajax({
	method: 'get',
	url:	'/static/data/top_sites_by_user.json',
	dataType: 'json',
	timeout: 60000,
	error: function(x, t, m) {
						if(t==="timeout") {
								alert("got timeout");
								} else {
								alert(t);
								}
						},
	success: function(data) {
		$.plot($("#topsitesgraph"), reversedata(data.flotdata),{
			bars: { show: true, horizontal: true, align: 'center'},
			//points: { show: true },
			yaxis: { position: 'left', ticks: data.xlabels},
			// transform: function (v) { return -v; } },
			xaxis: { position: 'top'},
			legend: { show: false},
			grid: { hoverable: true, clickable: true, borderColor: null, borderWidth: 0 }
		});
		$("#topsitesgraph").bind("plothover", function (event, pos, item) {
			$("#x").text(pos.x.toFixed(2));
			$("#y").text(pos.y.toFixed(2));
			if (item) {
				$("#charttooltip").remove();
				var x = item.datapoint[0].toFixed(2),
				y = item.datapoint[1].toFixed(2);
				showChartTooltip(pos.pageX, pos.pageY,item.series.label+' ('+item.datapoint[0]+'MB)');
			} else {
				$("#charttooltip").remove();
			}
		});
		$("#topsitesgraph").bind("plotclick", graphClick);
	}
}); */
