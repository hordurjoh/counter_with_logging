//All element constatnt ends with El
const countTxtEl = document.getElementById("count-el");
const incButtonEl = document.getElementById("increment-btn");
const logButtonEl = document.getElementById("log-btn");
const restartButtonEl = document.getElementById("restart-btn");
const copyButtonEl = document.getElementById("copy-btn");
const logAeraEl = document.getElementById("logentries");
const doLogDateEl = document.getElementById("log-date");
const seppiEl = document.getElementById("seppi");
const timeStartEl = document.getElementById("time-start-el");

// Global variables starts with q
let qCount = -1; //The coiunt
let qStartTime; //Starting time of batch
let qEndtime; //Ending time of batch

//Log batch to text aera control
function logNow(startDT) {
  //Fet the CSV seperator value from html element id=seppi
  let theSeppi = seppiEl.value;

  //Split the ISO string to date and string
  let startTimeArr = startDT.toISOString().split("T");
  let startDateStr = startTimeArr[0]; //yyyy-mm-dd
  let startTimeStr = startTimeArr[1].slice(0, 8); //hh:mm:ss

  let endDT = new Date();
  let endTimeArr = endDT.toISOString().split("T");
  let endDateStr = endTimeArr[0];
  let endTimeStr = endTimeArr[1].slice(0, 8);

  // logging the date and time if doLogDate is checked
  // else just log the time
  let logStartDateTime = doLogDateEl.checked
    ? `${startDateStr}${theSeppi}${startTimeStr}`
    : `${startTimeStr}`;

  // logging the date and time if doLogDate is checked
  // else just log the time
  let logEndDateTime = doLogDateEl.checked
    ? `${endDateStr}${theSeppi}${endTimeStr}`
    : `${endTimeStr}`;

  const timeLapsed = dateBetween(endDT, startDT);

  const hours = Math.floor(timeLapsed.hours);
  const minutes = Math.floor(timeLapsed.minutes);
  const seconds = Math.floor(timeLapsed.seconds);

  let strDuration =
    String(hours).padStart(2, "0") +
    theSeppi +
    String(minutes).padStart(2, "0") +
    theSeppi +
    String(seconds).padStart(2, "0");

  let totalSeconds = parseInt(
    Math.abs(startDT.getTime() - endDT.getTime()) / 1000
  );

  let totalMinutes = (totalSeconds / 60).toFixed(2);
  let perMinute = (totalMinutes === 0 ? 0 : qCount / totalMinutes).toFixed(2);

  let CSVHeader = "";

  if (doLogDateEl.checked) {
    console.log("Checked");
    CSVHeader = `StartDate${theSeppi}StartTime${theSeppi}EndDate${theSeppi}EndTime${theSeppi}Count${theSeppi}Hours${theSeppi}Minuts${theSeppi}Seconds${theSeppi}Per minute\n`;
  } else {
    console.log("NOT Checked");
    CSVHeader = `StartTime${theSeppi}EndTime${theSeppi}Count${theSeppi}Hours${theSeppi}Minuts${theSeppi}Seconds${theSeppi}Per minute\n`;
  }

  if (logAeraEl.value === "") {
    logAeraEl.value += CSVHeader;
  }

  logAeraEl.value += `${logStartDateTime}${theSeppi}${logEndDateTime}${theSeppi}${qCount}${theSeppi}${strDuration}${theSeppi}${perMinute}\n`; //lOG TO CSV
  logButtonEl.disabled = true;
  incButtonEl.innerText = "Start";
}

function resetCount() {
  logNow(qStartTime);
  qCount = -1;
  countTxtEl.innerText = "Not Started";
  timeStartEl.textContent = "Not Started";
}

function increment(theCount, addBy) {
  theCount = theCount + addBy;

  if (theCount === 0) {
    qStartTime = new Date(); //Reset time
    timeStartEl.textContent = qStartTime.toLocaleString();

    incButtonEl.innerText = "Increment";
    logButtonEl.disabled = false; //Now you can log
  }

  countTxtEl.innerText = theCount;
  return theCount;
}

logButtonEl.addEventListener("click", function () {
  resetCount();
});

incButtonEl.addEventListener("click", function () {
  qCount = increment(qCount, 1);
});

restartButtonEl.addEventListener("click", function () {
  if (confirm("Are you sure \nThis will clear all entries")) {
    window.location.reload();
  }
});

copyButtonEl.addEventListener("click", function () {
  logAeraEl.select();
  document.execCommand("copy");
  if (window.getSelection) {
    window.getSelection().removeAllRanges();
  } else if (document.selection) {
    document.selection.empty();
  }
});
