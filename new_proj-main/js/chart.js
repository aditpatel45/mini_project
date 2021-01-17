// Pie Chart Code
google.charts.load("current", {packages: ["corechart"]});
google.charts.setOnLoadCallback(drawPieChart);

function drawPieChart(){
        $.ajax({
            url: "http://localhost:3000/subject_data",
            dataType: "json",
            type: "GET",
            contentType: "application/json; charset=utf-8",
            success: function (data) {
                subarray = data;
                datapoints = [['Category', 'No. of Questions']]; 
                $.each(subarray, function(index, value){
                    datapoints.push([value.subject_name, value.total_ques]);
                })
    
                    var options = {
                        title: 'Category wise questions',
                        colors: ['#F28482', '#84A59D', '#F5CAC3', '#F7EDE2', '#F6BD60'],
                        legend: {position: 'bottom', textStyle: { color: '#255', fontSize: 14} }  // You can position the legend on 'top' or at the 'bottom'.
                    };
                    
                    // Create DataTable and add the array to it.
                    var figures = google.visualization.arrayToDataTable(datapoints);
                    console.log(figures);
                    // Define the chart type (LineChart) and the container (a DIV in our case).
                    var chart = new google.visualization.PieChart(document.getElementById('piechart'));
                    chart.draw(figures, options); 
                    }
                   
        })
    }
    //Bar Chart Code
google.charts.load('current', {'packages':['bar']});
google.charts.setOnLoadCallback(drawBarChart);
    function drawBarChart(){
        $.ajax({
            url: "http://localhost:3000/subject_data",
            dataType: "json",
            type: "GET",
            contentType: "application/json; charset=utf-8",
            success: function (data) {
                subarray = data;
                datapoints = [['Category', 'Score']]; 
                $.each(subarray, function(index, value){ 
                    datapoints.push([value.subject_name, value.total_ques]); 
                })
    
                var options = {
                    title: 'High Scores',
                    width: 500,
                    legend: { position: 'none' },
                    chart: { title: 'High scores',
                             subtitle: 'Category wise' },
                    bars: 'horizontal', // Required for Material Bar Charts.
                    axes: {
                      x: {
                        0: { side: 'top', label: 'High Scores'} // Top x-axis.
                      }
                    },
                    bar: { groupWidth: "100%" }
                  };
                    
                    
                    // Create DataTable and add the array to it.
                    var figures = google.visualization.arrayToDataTable(datapoints);
                   
                    // Define the chart type (LineChart) and the container (a DIV in our case).
                    var chart = new google.charts.Bar(document.getElementById('barchart'));
                    chart.draw(figures, options); 
                    }
                   
        })
    }