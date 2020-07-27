import clock from "clock";
import document from "document";
import { preferences } from "user-settings";
import * as util from "../common/utils";
import { battery } from "power";
import { me as appbit } from "appbit";
import { today } from "user-activity";
import { HeartRateSensor } from "heart-rate";
import userActivity from "user-activity";

// Update the clock every minute
clock.granularity = "seconds";

// Get a handle on the <text> element
const myUser = document.getElementById("myUser"); //top user line
const myTime = document.getElementById("myTime"); //[TIME] label
const myLabel = document.getElementById("myLabel"); //Current Time
const myDate = document.getElementById("myDate"); //Date Label
const myDateData = document.getElementById("myDateData"); //Current Date data
const Batt = document.getElementById("Batt"); //Battery Label
const BattBar = document.getElementById("BattBar"); //Battery Bar graphic
const Step = document.getElementById("Step"); //Steps label
const StepCount = document.getElementById("StepCount"); //Step Counter
const HR = document.getElementById("HR"); //Heart Rate label
const HRval = document.getElementById("HRval"); //Heart Rate value
const endUser = document.getElementById("endUser"); //bottom user line

// Time
clock.ontick = (evt) => {
  let today = evt.date;
  let hours = today.getHours();
  let ampm = " AM"
  
  if (preferences.clockDisplay == "12h"){
    if (hours > 12){
      ampm = " PM";
    } else if (hours == 12){
      ampm = " PM"
    }
  } else {
    ampm = ""
  }
  
  if (preferences.clockDisplay === "12h") {
    // 12h format
    hours = hours % 12 || 12;
  } else {
    // 24h format
    hours = util.zeroPad(hours);
  }
  let mins = util.zeroPad(today.getMinutes());
  let seconds = util.zeroPad(today.getSeconds());

  myUser.text = "user@watch:~ $ now"
  myTime.text = "[TIME]"
  myLabel.text = `${hours}:${mins}:${seconds}${ampm}`;


// Date
  let today = evt.date;
  let weekday = today.getDay();
  let day = today.getDate();
  let month = today.getMonth();
  let year = today.getFullYear();
  
  if (weekday == 0){
    weekday = "Sun"
  }
    else if (weekday == 1){
      weekday = "Mon"
    }
    else if (weekday == 2){
      weekday = "Tue"
    }
    else if (weekday == 3){
      weekday = "Wed"
    }
    else if (weekday == 4){
      weekday = "Thu"
    }
    else if (weekday == 5){
      weekday = "Fri"
    }
    else if (weekday == 6){
      weekday = "Sat"
    }
    else{
      weekday = ""
    }
  
  if (month == 0){
    month = "Jan"
  }
    else if (month == 1){
      month = "Feb"
    }
    else if (month == 2){
      month = "Mar"
    }
    else if (month == 3){
      month = "Apr"
    }
    else if (month == 4){
      month = "May"
    }
    else if (month == 5){
      month = "Jun"
    }
    else if (month == 6){
      month = "Jul"
    }
    else if (month == 7){
      month = "Aug"
    }
    else if (month == 8){
      month = "Sep"
    }
    else if (month == 9){
      month = "Oct"
    }
    else if (month == 10){
      month = "Nov"
    }
    else if (month == 11){
      month = "Dec"
    }
    else{
      weekday = ""
    }
  
  myDate.text = "[DATE]" 
  myDateData.text = `${weekday} ${month} ${day} ${year}`;


//Battery
  //console.log(Math.floor(battery.chargeLevel) + "%");
  let battlev = battery.chargeLevel;
  let bar = ""
  
  if (battlev == 100){
    bar = "[##########]"
  }
    else if (battlev >= 90){
      bar = "[######### . ]"
    }
    else if (battlev >= 80){
      bar = "[######## . . ]"
    }
    else if (battlev >= 70){
      bar = "[####### . . . ]"
    }
    else if (battlev >= 60){
      bar = "[###### . . . . ]"
    }
    else if (battlev >= 50){
      bar = "[##### . . . . . ]"
    }
    else if (battlev >= 40){
      bar = "[#### . . . . . . ]"
    }
    else if (battlev >= 30){
      bar = "[### . . . . . . . ]"
    }
    else if (battlev >= 20){
      bar = "[## . . . . . . . . ]"
    }
    else if (battlev >= 10){
      bar = "[# . . . . . . . . . ]"
    }
    else if (battlev >= 0){
      bar = "[ . . . . . . . . . . ]"
    }

  Batt.text = "[BATT]"
  BattBar.text = `${bar} ${battlev} %`
  

//Steps
  if (appbit.permissions.granted("access_activity")) {
  // console.log(`${today.steps}`);
  }
  let stepsval = (userActivity.today.adjusted["steps"] || 0);
  let steps = stepsval + ' steps';
  
  Step.text = "[STEP]"
  StepCount.text = steps
  
   
//Heart Rate
  var hrm = new HeartRateSensor();
  hrm.start();
  hrm.onreading = function() {
  // Peek the current sensor values
  //  console.log("Current heart rate: " + hrm.heartRate);
    HRval.text = `${hrm.heartRate} bpm`; 
  }
  HR.text = "[_HR_]"
 
//Bottom User Line
  endUser.text = "user@watch:~ $"
}