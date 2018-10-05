function buildMetadata(sample) {

  var url = "/metadata/" + sample;

  d3.json(url).then(function(data) {

    var meta_list = d3.select('#sample-metadata');
        meta_list.html("");

      for (const [key, value] of Object.entries(data)) {
          meta_list.append('p').text(key + ": " + value);
      }
  }); // End d3.json
}


function buildCharts(sample) {

  var url = "/samples/" + sample;

  d3.json(url).then(function(data) {
    //console.log(data);

    // Pie Chart
    var pie_data = [{
      labels: data.otu_ids.slice(0, 10),
      values: data.sample_values.slice(0, 10),
      hovertext: data.otu_labels.slice(0, 10),
      type: 'pie'
    }];

    var layout = {
      autosize: false,
      height: 450,
      width: 450,
      margin: {
        t: 0,
        l: 0
      }
    };


    Plotly.newPlot('pie', pie_data, layout);

    // Bubble chart
    var trace1 = {
      x: data.otu_ids,
      y: data.sample_values,
      mode: 'markers',
      marker: {
        size: data.sample_values,
        color: data.otu_ids
      },
      hovertext: data.otu_labels,
    };

    var data = [trace1];

    var layout = {
      autosize: false,
      showlegend: false,
      height: 600,
      width: 1400,
      margin: {
        r: 0,
        t: 15
      }
    };

    Plotly.newPlot('bubble', data, layout);

  });  // End d3.json
}

function init() {
  // Grab a reference to the dropdown select element
  var selector = d3.select("#selDataset");

  // Use the list of sample names to populate the select options
  d3.json("/names").then((sampleNames) => {
    sampleNames.forEach((sample) => {
      selector
        .append("option")
        .text(sample)
        .property("value", sample);
    });

    // Use the first sample from the list to build the initial plots
    const firstSample = sampleNames[0];
    buildCharts(firstSample);
    buildMetadata(firstSample);
    buildGuage(firstSample);
  });
}

function optionChanged(newSample) {
  // Fetch new data each time a new sample is selected
  buildCharts(newSample);
  buildMetadata(newSample);
  buildGuage(newSample);
}

// Initialize the dashboard
init();
