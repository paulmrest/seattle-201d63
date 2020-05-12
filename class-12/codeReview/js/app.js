'use strict';

var uniqueIndexArray = [];
var allBusMall = [];
var parentElement = document.getElementById('container');
var totalVotes = 0;
var names = [];
var votes = [];
// render three images to the DOM
  // create a constructor function
    // filepath
    // alt
    // title
    // push object instance into an array
function BusmallImage(name, extension){
  this.filepath = `images/${name}${extension}`;
  this.alt = name;
  this.title = name;
  this.votes = 0;
  this.views = 0;
  allBusMall.push(this);
}

BusmallImage.prototype.render = function(){

  var imageElement = document.createElement('img');
  imageElement.src = this.filepath;
  imageElement.alt = this.alt;
  imageElement.title = this.title;
  parentElement.appendChild(imageElement);
}

new BusmallImage('bag', '.jpg');
new BusmallImage('banana', '.jpg');
new BusmallImage('bathroom', '.jpg');
new BusmallImage('boots', '.jpg');
new BusmallImage('breakfast', '.jpg');
new BusmallImage('bubblegum', '.jpg');
new BusmallImage('chair', '.jpg');
new BusmallImage('cthulhu', '.jpg');

function getRandomIndex(){

  var index = getRandomNumber(allBusMall.length);

  // this while loop will check to make sure that my index is unique will get a index if it is in the uniqueIndexArray
  while(uniqueIndexArray.includes(index)){
    index = getRandomNumber(allBusMall.length);
  }

  uniqueIndexArray.push(index);

  // if my array is more than 6 items long, I need to shift from the beginning
  if(uniqueIndexArray.length > 6){
    uniqueIndexArray.shift();
  }

  // select a random image from that array to render
    // helper function to generage a random number between 0 and the length of the array
    // render the object instance at that index to the DOM

    // make sure that the images are uniqe (to each other and previous images)
      // -- come back to this in a minute
  return index;
}

function getRandomNumber(max){
  return Math.floor(Math.random() * max);
}

function displayImage(){
  var index = getRandomIndex();
  allBusMall[index].render();
}

function handleClick(event){
  // first - empty everything out
  parentElement.textContent = '';

  // figure out what was clicked
  var titleOfTheThingThatWasClickedOn = event.target.title;

  // loop through all of my object instance to compare titles so that I can find the one that was clicked on
  for(var i=0; i<allBusMall.length; i++){
    if(titleOfTheThingThatWasClickedOn === allBusMall[i].title){
      // woot! I found it! Add a vote.
      allBusMall[i].votes++;
      totalVotes++;

      if(totalVotes === 25){
        // turn off event listener
        parentElement.removeEventListener('click', handleClick);
        makeNamesArray();
      }
    }
  }

  displayImage();
  displayImage();
  displayImage();
  // listen for a click and render new images when we hear it
  // need to keep track of views and votes

}

displayImage();
displayImage();
displayImage();

parentElement.addEventListener('click', handleClick);

// only allow 25 votes
// show results at the end

// loop over all of my items and make an array of just the names of my items
function makeNamesArray(){
  for(var i=0; i<allBusMall.length; i++){
    names.push(allBusMall[i].title);
    votes.push(allBusMall[i].votes);
  }

  generateChart();
}

function generateChart(){
  var ctx = document.getElementById('myChart').getContext('2d');
  var myChart = new Chart(ctx, {
      type: 'bar',
      data: {
          labels: names,
          datasets: [{
              label: '# of Votes',
              data: votes,
              backgroundColor: [
                  'rgba(255, 99, 132, 0.2)',
                  'rgba(54, 162, 235, 0.2)',
                  'rgba(255, 206, 86, 0.2)',
                  'rgba(75, 192, 192, 0.2)',
                  'rgba(153, 102, 255, 0.2)',
                  'rgba(255, 159, 64, 0.2)'
              ],
              borderColor: [
                  'rgba(255, 99, 132, 1)',
                  'rgba(54, 162, 235, 1)',
                  'rgba(255, 206, 86, 1)',
                  'rgba(75, 192, 192, 1)',
                  'rgba(153, 102, 255, 1)',
                  'rgba(255, 159, 64, 1)'
              ],
              borderWidth: 1
          }]
      },
      options: {
          scales: {
              yAxes: [{
                  ticks: {
                      beginAtZero: true
                  }
              }]
          }
      }
  });
}

