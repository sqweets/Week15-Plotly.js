function buildGuage(sample) {

  var url = "/metadata/" + sample;

  d3.json(url).then(function(data) {

      for (const [key, value] of Object.entries(data)) {
        if (key === "WFREQ") {
          var wash_freq = value;
          break;
        }
      }

      // Gauge Chart
      var level = wash_freq;
      console.log(wash_freq);

      // Trig to calc meter point
      var degrees = 180 - (level * 20),
           radius = .5;
      var radians = degrees * Math.PI / 180;
      var x = radius * Math.cos(radians);
      var y = radius * Math.sin(radians);

      // Path: may have to change to create a better triangle
      var mainPath = 'M -.0 -0.025 L .0 0.025 L ',
           pathX = String(x),
           space = ' ',
           pathY = String(y),
           pathEnd = ' Z';
      var path = mainPath.concat(pathX,space,pathY,pathEnd);

      var data = [{ type: 'scatter',
         x: [0], y:[0],
          marker: {size: 28, color:'850000'},
          showlegend: false,
          name: 'scrubs per week',
          text: level,
          hoverinfo: 'text+name'},
        { values: [50/9, 50/9, 50/9, 50/9, 50/9, 50/9, 50/9, 50/9, 50/9, 50],
        rotation: 90,
        text: ['8-9', '7-8', '6-7', '5-6', '4-5', '3-4', '2-3', '1-2', '0-1'],
        textinfo: 'text',
        textposition:'inside',
        marker: {colors:['rgba(14, 127, 0, .5)',
                         'rgba(41, 139, 25, .5)',
                         'rgba(68, 151, 50, .5)',
                         'rgba(95, 164, 75, .5)',
                         'rgba(123, 176, 101, .5)',
                         'rgba(150, 188, 126, .5)',
                         'rgba(177, 201, 151, .5)',
                         'rgba(204, 213, 176, .5)',
                         'rgba(232, 226, 202, .5)',
                         'rgba(255, 255, 255, 0)']},
        labels: ['8-9', '7-8', '6-7', '5-6', '4-5', '3-4', '2-3', '1-2', '0-1'],
        hoverinfo: 'label',
        hole: .5,
        type: 'pie',
        showlegend: false
      }];

      var layout = {
        shapes:[{
            type: 'path',
            path: path,
            fillcolor: '850000',
            line: {
              color: '850000'
            }
          }],
        title: "<b>Belly Button Washing Frequency</b><br>Scrubs per Week",
        height: 550,
        width: 550,
        xaxis: {zeroline:false, showticklabels:false,
                   showgrid: false, range: [-1, 1]},
        yaxis: {zeroline:false, showticklabels:false,
                   showgrid: false, range: [-1, 1]}
      };

      Plotly.newPlot('gauge', data, layout);
    }); // End d3.json
}


