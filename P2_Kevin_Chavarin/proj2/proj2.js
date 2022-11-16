let capture;
let temperature = 0;
let weather = "";
let json;
let table;

function preload() {
  table = loadTable('data/myEvents.csv', 'csv', 'header');
  let nytURL = "https://api.nytimes.com/svc/topstories/v2/technology.json?api-key=bjZiklGdpmNjkzgypZBykztjXZybqtUn";
  let weatherURL = "https://api.openweathermap.org/data/2.5/weather?lat=33.5779&lon=-101.8552&units=imperial&appid=240ab5b94f9fe6a4e177345e22675f0b";
  weatherAPI = loadJSON(weatherURL);
  nytFeed = loadJSON(nytURL);
}
function setup() {
  createCanvas(displayWidth-20, displayHeight-145);
  fullscreen()
  capture = createCapture(VIDEO);
  capture.hide();  
  //array of colors
  colorModes = [
  'white', 
  'red',
  'green',
  'blue', 
  'yellow',
  'purple',
  ];
  index = 0;
  currentColor = colorModes[index];
  //menu buttons
  colorBtn = createButton("Change lighting");
  colorBtn.style('font-size', '30px');
  colorBtn.style('background-color', 'pink')
  colorBtn.position(50,800);
  colorBtn.mousePressed(changeColor);
   // Create a button for loading the JSON
  //loadBtn = createButton("Load JSON from file");
  //loadBtn.position(30, 50)
  //loadBtn.mousePressed(loadJSONFile);
  
  //get temperature
  temperature = weatherAPI.main.temp;
  //get events
  print(table.getRowCount() + ' total rows in table');
  print(table.getColumnCount() + ' total columns in table');
  print(table.getColumn('name'));
  
  
}

function draw() {
  //add webcam
  push();
  background(255);
  translate(width,0);
  scale(-1,1);
  tint(currentColor);
  image(capture, 0, 0, displayWidth-20, displayHeight-145);
  pop();
  
  //add a clock
  push();
  strokeWeight(3);
  stroke(color('black'));
  //get current time
  var sec = second();
  var min = minute();
  var hrs = hour();
  var mer = hrs < 12 ? "AM":"PM";
  var stepGoal = hrs < 12 ? "No":"Yes";
  var alarmTime = 8
  var wokeHrs = hrs - alarmTime;
  var restedPerc = ((18 - wokeHrs)/18)*100;
  //format the time
  sec = formatting(sec);
  min = formatting(min);
  hrs = formatting(hrs % 12);
  fill(255);
  textSize(50);
  textAlign(LEFT, CENTER);
  //display the time
  text(hrs + ":" + min + ":" + sec + " " + mer, 50, 100);
  //display sleep 
  textSize(15);
  text("You have been awake since " + alarmTime + " a.m. for " + wokeHrs + " hours.", 50, 150);
  text("Rested amount: " + round(restedPerc, 2) + "%", 50, 175);
  //display step goal and weight
  text("Step goal complete: " + stepGoal, 50, 200);
  text("You currently weigh 122 pounds.", 50, 225);
  pop();
  
  //display current weather
  push();
  strokeWeight(3);
  stroke(color('white'));
  textSize(25);
  textAlign(LEFT, CENTER);
  text("Lubbock, TX", 50, 300);
  textSize(15);
  text("Actual Temp: " + temperature + "F", 50, 325);
  text('Feels like: ' + weatherAPI.main.feels_like + 'F', 50, 350);
  //text(weatherAPI.weather[0].main, 180, 350);
  text("Forecast: " + weatherAPI.weather[0].description, 50, 375);
  
  pop();
  
  //display newsfeed
  push();
  strokeWeight(3);
  stroke(color('white'));
  textSize(25);
  textAlign(RIGHT, CENTER);
  text("NEWS in " + nytFeed.section + " :", 1500, 100);
  textSize(15);
  text(nytFeed.results[0].title, 1525, 125);
  text(nytFeed.results[1].title, 1525, 150);
  text(nytFeed.results[2].title, 1525, 175);
  text(nytFeed.results[3].title, 1525, 200);
  //display events
  textSize(25);
  text("Your Schedule", 1500, 300);
  textSize(15);
  for (let r = 0; r < table.getRowCount(); r++) {
    for (let c = 0; c < table.getColumnCount(); c++) {
      text(table.getString(r, c), 
            1400 + c * 100, 325 + r * 20);
    }
  }
  pop();
  
  
  
}

//function to add 0's to the clock
function formatting(num){
  if(int(num)<10){
    return "0" + num; //pad time if less than 10
  }
  return num;
  
}

//function to cycle through colors
function changeColor(){
  if (index < colorModes.length - 1)
  {
    index++;
  }
  else
  {
    index = 0;
  }
  currentColor = colorModes[index];
  
  
}
