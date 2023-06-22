
// =========Fetching Elements from html=====================
const heading = document.getElementById("heading");
const setAlarmBtn = document.getElementById('setAlarm');
const hourSelect = document.getElementById('hour');
const minuteSelect = document.getElementById('minute');
const secondSelect = document.getElementById('second');
const amOrPm = document.getElementById('amOrpm');
const alarmListDiv = document.getElementById('alarmsList');
const timeShow = document.getElementById('timeShow');

// ===================set Alarm List =======================
let alarmsList= [];

// ================== Display Time function ===================
function displayTime(){
    let date = new Date();
    let hours = date.getHours()>12?date.getHours()%12:date.getHours();
    let amPm = date.getHours()>12?"PM":"AM";
    hours = hours<10?"0"+hours:hours;
    let minutes = date.getMinutes()<10?"0"+date.getMinutes():date.getMinutes();
    let seconds = date.getSeconds()<10?"0"+date.getSeconds():date.getSeconds();
    let fullTime = hours+":"+minutes+":"+seconds+" "+amPm;
    heading.innerText = fullTime;
    runTime();
    for(let i=0; i<alarmsList.length; i++){
       if(hours == alarmsList[i].hour && minutes == alarmsList[i].minute && seconds == alarmsList[i].second && amPm ==alarmsList[i].amPm){
        window.alert("Alarm Ringing!!");
        return;
       }
        

    }
}

// ==================Running time every second function====================
function runTime(){
    let timeIntervalVal = 1000;
    let timeOut = setTimeout(displayTime,timeIntervalVal);
}
runTime();

// =========================== Add Alarm List to DOM ===========
// where user show its list of alarm ============
function addAlarmToDOM(alarm){
    let li = document.createElement('li');

    li.innerHTML = `
    <span id="timeShow">
       <span>${alarm.hour}:</span><span>${alarm.minute}:</span><span>${alarm.second} &nbsp;</span>${alarm.amPm}<span></span>                        
    </span>
    <span id="deleteBtnDiv">
        <button type="submit" id="deleteBtn" data-id = "${alarm.id}">Delete</button>
    </span>
    `
    li.classList.add('alarm');
    li.setAttribute('id',`${alarm.id}`);
    alarmListDiv.append(li);
}
// ================ Render List =========
//  when user add alarm or delete Alarm its render the list and display the alarm list========
function renderList(){
    alarmListDiv.innerHTML = '';
    for(let i=0; i<alarmsList.length; i++){
        addAlarmToDOM(alarmsList[i]);
    }
}
// =============== add Alarm =================
function addAlarm(alarm){
    if(alarm){
        alarmsList.push(alarm);
        renderList();
        showNotification("Alarm Added Successfully!");
        return;
    }
    showNotification("Something went wrong! Alarm not added");
    return;
}
// ==================Delete Alarm================
function deleteAlarm(alarmId){
    if(alarmId){
        let newAlarmList = alarmsList.filter((alarm)=>{
            return alarm.id !== alarmId;
        });
        alarmsList= newAlarmList;
        renderList();
        showNotification("Alarm Deleted Successfully!");
        return;
    }
    showNotification("Something went Wrong, Alarm not Deleted!");
    return;
}
// ================= showNotification when user add alarm, delete alarm, or empty input=====
function showNotification(text){
    window.alert(text);
    return;
}

// ========================= get user Data ================================
function handleInput(){
   let hoursVal = hourSelect.value;
   let minutesVal = minuteSelect.value;
   let secondsVal = secondSelect.value;
   let ampmVal = amOrPm.value;
   if(hoursVal==00&&minutesVal==00&&secondsVal==00){
   showNotification("Enter Alarm Time!");
   return;
   }
   let alarm = {
    hour:hoursVal,
    minute:minutesVal,
    second:secondsVal,
    amPm:ampmVal,
    id:Date.now().toString()
   }
   addAlarm(alarm);
}
// =========================== handle delete button ============
function handleClickEvents(e){
    let target = e.target;
    if(e.target.id == 'deleteBtn'){
        let alarmId = e.target.dataset.id;
        deleteAlarm(alarmId);
    }
}

setAlarmBtn.addEventListener('click',handleInput);
document.addEventListener('click',handleClickEvents);