let dropDownBorough = document.getElementById('dropDownBorough')
let dropDownAge = document.getElementById('dropDownAge')
let dropDownCondition = document.getElementById('dropDownCondition')
let dropDownCall = document.getElementById('dropDownCall')
let counter = 0
let raccoonCounter = 0
let dogCounter = 0
let catCounter = 0
let deerCounter = 0
let birdCounter = 0
let otherCounter = 0
var data = {}
dropDownBorough.addEventListener('change', retrieveData)
dropDownAge.addEventListener('change', retrieveData)
dropDownCondition.addEventListener('change', retrieveData)
dropDownCall.addEventListener('change', retrieveData)

let animals = []
let dropDown = document.getElementById('animal')

const onClick = function() {
  console.log(this.id, this.innerHTML);
}
document.getElementById('raccoon').onclick = onClick;
document.getElementById('cat').onclick = onClick;
document.getElementById('dog').onclick = onClick;
document.getElementById('deer').onclick = onClick;
document.getElementById('bird').onclick = onClick; 

function retrieveData(){
  document.getElementById("my_dataviz").innerHTML = ''
  // first we have the fetch which is getting that URL
  fetch('https://data.cityofnewyork.us/resource/fuhs-xmg2.json')
  // then we have response, this is essentially saying "hey, the information we're getting is not in string, so we need to have it in a JSON so it can be in the correct format." We're taking this response and we're getting the JSON (aka we're going to use the data and we're going to put it in a format that we're gonna use).
  .then(response => response.json())
  .then(dataList =>{
    counter = 0
    raccoonCounter = 0
    dogCounter = 0
    catCounter = 0
    deerCounter = 0
    birdCounter = 0

    for(let i = 0; i < dataList.length; i ++){
      // console.log(data[i].borough)

      // the data for boroughs + animals
      if(dataList[i].borough == dropDownBorough.value){
         if(dataList[i].species_description == 'Raccoon'){
          raccoonCounter += 1
         }
         if(dataList[i].species_description == 'Dog'){
          dogCounter += 1
         }
         if(dataList[i].species_description == 'Cat'){
          catCounter += 1
         }
         if(dataList[i].animal_class == 'Deer'){
          deerCounter += 1
         }
         if(dataList[i].animal_class == 'Birds'){
          birdCounter += 1
         }
      }

      // the data for age + animals
      if(dataList[i].age == dropDownAge.value){
         if(dataList[i].species_description == 'Raccoon'){
          raccoonCounter += 1
         }
         if(dataList[i].species_description == 'Dog'){
          dogCounter += 1
         }
         if(dataList[i].species_description == 'Cat'){
          catCounter += 1
         }
         if(dataList[i].animal_class == 'Deer'){
          deerCounter += 1
         }
         if(dataList[i].animal_class == 'Birds'){
          birdCounter += 1
         }
      }

      // the data for age + animals
      if(dataList[i].animal_condition == dropDownCondition.value){
         if(dataList[i].species_description == 'Raccoon'){
          raccoonCounter += 1
           }
           if(dataList[i].species_description == 'Dog'){
            dogCounter += 1
           }
           if(dataList[i].species_description == 'Cat'){
            catCounter += 1
           }
           if(dataList[i].animal_class == 'Deer'){
            deerCounter += 1
           }
           if(dataList[i].animal_class == 'Birds'){
            birdCounter += 1
           }
        }

        // the data for call source + animals
        if(dataList[i].call_source == dropDownCall.value){
           if(dataList[i].species_description == 'Raccoon'){
            raccoonCounter += 1
             }
             if(dataList[i].species_description == 'Dog'){
              dogCounter += 1
             }
             if(dataList[i].species_description == 'Cat'){
              catCounter += 1
             }
             if(dataList[i].animal_class == 'Deer'){
              deerCounter += 1
             }
             if(dataList[i].animal_class == 'Birds'){
              birdCounter += 1
             }
          }
      }
      console.log("Raccoons: " + raccoonCounter)
      console.log("Dogs: " + dogCounter)
      console.log("Cats: " + catCounter)
      console.log("Deer: " + deerCounter)
      console.log("Birds: " + birdCounter)

      data.dogs = dogCounter
      data.raccoons = raccoonCounter
      data.deer = deerCounter
      data.cats = catCounter
      data.birds = birdCounter



      var width = 700
      height = 650
      margin = 40
      
      // The radius of the pieplot is half the width or half the height (smallest one). I subtract a bit of margin.
      var radius = Math.min(width, height) / 2 - margin
      
      // append the svg object to the div called 'my_dataviz'
      var svg = d3.select("#my_dataviz")
      .append("svg")
      .attr("width", width)
      .attr("height", height)
      .append("g")
      .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");
      
      // Create dummy data
          // this is where i feed in the data, from the json/api and I will make sure to name the letters actually properly to the real catergory (the letters being a b c)
      
      
      
      
      // set the color scale
          // how to change the color shades, change the data on the .range 
      var color = d3.scaleOrdinal()
        .domain(data)
        .range(["#868E55", "#66713C", "#525B30", "#3F4723", "#2B3114"])
      
      // Compute the position of each group on the pie:
      var pie = d3.pie()
      .sort(null) // Do not sort group by size
      .value(function(d) {return d.value; })
      var data_ready = pie(d3.entries(data))
      
      // The arc generator
      var arc = d3.arc()
      .innerRadius(radius * 0.5)         // This is the size of the donut hole
      .outerRadius(radius * 0.8)
      
      // Another arc that won't be drawn. Just for labels positioning
      var outerArc = d3.arc()
      .innerRadius(radius * 0.9)
      .outerRadius(radius * 0.9)
      
      // Build the pie chart: Basically, each part of the pie is a path that we build using the arc function.
      svg
      .selectAll('allSlices')
      .data(data_ready)
      .enter()
      .append('path')
      .attr('d', arc)
        // below is how to change the color of things, but its getting the color from some kind of data? 
      .attr('fill', function(d){ return(color(d.data.key)) })
      .attr("stroke", "#939967")
      .style("stroke-width", "3px")
      .style("opacity", 0.7)
      
      // Add the polylines between chart and labels:
      svg
      .selectAll('allPolylines')
      .data(data_ready)
      .enter()
      .append('polyline')
      .attr("stroke", "#DCDCBF")
      .style("fill", "none")
      .attr("stroke-width", 1)
      .attr('points', function(d) {
        var posA = arc.centroid(d) // line insertion in the slice
        var posB = outerArc.centroid(d) // line break: we use the other arc generator that has been built only for that
        var posC = outerArc.centroid(d); // Label position = almost the same as posB
        var midangle = d.startAngle + (d.endAngle - d.startAngle) / 2 // we need the angle to see if the X position will be at the extreme right or extreme left
        posC[0] = radius * 0.95 * (midangle < Math.PI ? 1 : -1); // multiply by 1 or -1 to put it on the right or on the left
        return [posA, posB, posC]
      })
      
      // Add the polylines between chart and labels:
      svg.selectAll('allLabels')
         .data(data_ready)
        //  console.log(data_ready.slice(0, 5))
         .enter()
         .append('text')
         // below code changes the display, gets rid of the stacking number
         .text( function(d) { console.log(d.data.key) ; return d.data.key } )
         .attr('transform', function(d, i, nodes) {
          var pos = outerArc.centroid(d);
          var midangle = d.startAngle + (d.endAngle - d.startAngle) / 2;
          pos[0] = radius * 0.99 * (midangle < Math.PI ? 1 : -1);
          if (i > 0) {
              // Get the previous label's midangle
              var prevMidangle = d3.select(nodes[i-1]).datum().startAngle + (d3.select(nodes[i-1]).datum().endAngle - d3.select(nodes[i-1]).datum().startAngle) / 2;
              // If the current label's midangle is close to the previous label's midangle, move the label
              if (Math.abs(midangle - prevMidangle) < 0.1) {
                  var sign = (midangle < prevMidangle ? -1 : 1);
                  pos[0] = pos[0] + sign * 10;
              }
          }
          return 'translate(' + pos + ')';
      })
         .style('text-anchor', function(d) {
            var midangle = d.startAngle + (d.endAngle - d.startAngle) / 2
            return (midangle < Math.PI ? 'start' : 'end')
         })
         .style('fill', '#DCDCBF');
      
      
console.log(data)

    })
    }


    //total number of each animal
    //total number of ALL animals (needed to get percentage)
    //percentage of animals in borough
    //find out the percentage of specific animals in each borough (17% of raccoons were on long island!)



    // to get the percentage, the raccoon counter divided the total borough counter, times (x) 100. that will give you percentage of each animal inside, 
    // i could also do else statement for more specific animal statements like birds and breeds of them. like (if this then add to other counter using an else statement)

    // set the dimensions and margins of the graph
   const boroughImage = document.createElement("img");
   boroughImage.src = "boroughImage.png";
   boroughImage.style.position = "fixed";
   boroughImage.style.position = "absolute";
   boroughImage.style.transform = "translate(-50%, -50%)";
   boroughImage.style.top = "49%";
   boroughImage.style.left = "50%";
   boroughImage.style.transform = "translate(-50%, -50%)";
   boroughImage.style.display = "none";
   boroughImage.style.width = "250px";
   boroughImage.style.height = "250px";
   boroughImage.style.transition = "opacity 0.3s ease-in-out";
   document.body.appendChild(boroughImage);

   const ageImage = document.createElement("img");
   ageImage.src = "ageImage.png";
   ageImage.style.position = "fixed";
   ageImage.style.position = "absolute";
   ageImage.style.transform = "translate(-50%, -50%)";
   ageImage.style.top = "50%";
   ageImage.style.left = "50%";
   ageImage.style.transform = "translate(-50%, -50%)";
   ageImage.style.display = "none";
   ageImage.style.width = "120px";
   ageImage.style.height = "150px";
   ageImage.style.transition = "opacity 0.3s ease-in-out";
   document.body.appendChild(ageImage);

   const conditionImage = document.createElement("img");
   conditionImage.src = "conditionImage.png";
   conditionImage.style.position = "absolute";
   conditionImage.style.transform = "translate(-50%, -50%)";
   conditionImage.style.top = "50%";
   conditionImage.style.left = "50%";
   conditionImage.style.transform = "translate(-50%, -50%)";
   conditionImage.style.display = "none";
   conditionImage.style.width = "160px";
   conditionImage.style.height = "150px";
   conditionImage.style.transition = "opacity 0.3s ease-in-out";
   document.body.appendChild(conditionImage);

   const callImage = document.createElement("img");
   callImage.src = "callImage.png";
   callImage.style.position = "fixed";
   callImage.style.position = "absolute";
   callImage.style.transform = "translate(-50%, -50%)";
   callImage.style.top = "50%";
   callImage.style.left = "50%";
   callImage.style.transform = "translate(-50%, -50%)";
   callImage.style.display = "none";
   callImage.style.width = "150px";
   callImage.style.height = "150px";
   callImage.style.transition = "opacity 0.3s ease-in-out";
   document.body.appendChild(callImage);
    
    
   const dropDownBoroughTwo = document.getElementById("dropDownBorough");
   dropDownBoroughTwo.addEventListener("change", function() {
   if (this.value === "All") {
      boroughImage.style.opacity = "0";
   setTimeout(function() {
      boroughImage.style.display = "none";
   }, 200);
   } else {
      boroughImage.style.opacity = "0";
      boroughImage.style.display = "block";
   setTimeout(function() {
      boroughImage.style.opacity = "1";
   }, 200);
   }
   callImage.style.display = "none";
   ageImage.style.display = "none";
   conditionImage.style.display = "none";
   });

   const dropDownAgeTwo = document.getElementById("dropDownAge");
   dropDownAgeTwo.addEventListener("change", function() {
   if (this.value === "All") {
      ageImage.style.opacity = "0";
   setTimeout(function() {
      ageImage.style.display = "none";
   }, 200);
   } else {
      ageImage.style.opacity = "0";
      ageImage.style.display = "block";
   setTimeout(function() {
      ageImage.style.opacity = "1";
   }, 200);
   }
   boroughImage.style.display = "none";
   callImage.style.display = "none";
   conditionImage.style.display = "none";
   });

   const dropDownConditionTwo = document.getElementById("dropDownCondition");
   dropDownConditionTwo.addEventListener("change", function() {
   if (this.value === "All") {
      conditionImage.style.opacity = "0";
   setTimeout(function() {
      conditionImage.style.display = "none";
   }, 200);
   } else {
      conditionImage.style.opacity = "0";
      conditionImage.style.display = "block";
   setTimeout(function() {
      conditionImage.style.opacity = "1";
   }, 200);
   }
   boroughImage.style.display = "none";
   ageImage.style.display = "none";
   callImage.style.display = "none";
   });

   const dropDownCallTwo = document.getElementById("dropDownCall");
   dropDownCallTwo.addEventListener("change", function() {
   if (this.value === "All") {
   callImage.style.opacity = "0";
   setTimeout(function() {
   callImage.style.display = "none";
   }, 200);
   } else {
   callImage.style.opacity = "0";
   callImage.style.display = "block";
   setTimeout(function() {
   callImage.style.opacity = "1";
   }, 200);
   }
   boroughImage.style.display = "none";
   ageImage.style.display = "none";
   conditionImage.style.display = "none";
   });

