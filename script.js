let time = document.getElementById('time-display');
let setAlarm_btn = document.getElementById('setA-btn');
let setA_time = document.querySelectorAll(".setA-time");
// let alarm_song = new Audio('./song/alarm-clock.mp3');
let uo_list = document.querySelector('ul');

let t;
let hour;
let min;
let sec;
let p;

let lists = [];
let num = 1;


// running current time on screen
(() => {
    setInterval(() => {
        t = new Date();
        hour = t.getHours();
        min = t.getMinutes();
        sec = t.getSeconds();

        if (hour >= 12 && sec > 0) {
            p = "PM";
            if (hour > 12) {
                hour = hour - 12;
            }
        } else {
            p = "AM";
        }

        hour = (hour < 10) ? `0${hour}` : hour;
        min = (min < 10) ? `0${min}` : min;
        sec = (sec < 10) ? `0${sec}` : sec;
        // console.log(hour, min, sec);

        time.innerText = (`${hour}:${min}:${sec} ${p}`);

        // checkAlarmTime(hour, min, sec, p);
        checkAlarmTime();

    }, 1000);
})();


// current time is match with set time than give a alert
function checkAlarmTime() {
    let isMatch = false;

    lists.forEach(function (item) {
        // if (Number(item.hours) == hh && Number(item.minutes) == mm && Number(item.seconds) == ss && item.ampm == pp) {
        //     isMatch = true;
        // }


        let t1 = `${item.hours}:${item.minutes}:${item.seconds} ${item.ampm}`;
        let t3 = t1;
        t1 = t1.slice(-10);

        const now = new Date();
        // console.log(now.toLocaleTimeString());
        // console.log(t1);
        // console.log(t3);
        let t2 = now.toLocaleTimeString();
        if(t2 == t1){
            isMatch = true;
        }else if(t2 == t3){
            isMatch = true;
        }

    });

    if (isMatch) {
        // alarm_song.play();
        alert('Alarm is Ringing');
    }
}



// add Alarm list to <li> tag
function addAlarm(h, m, s, ampm) {
    let li = document.createElement('li');

    li.innerHTML = `
        <span class="chTime">${h}:${m}:${s} ${ampm}</span>
        <button class="d-btn"  id="${num}" type="button">Delete</button>
    `;

    uo_list.appendChild(li);
    num++;


    // remove li tag from list items
    document.querySelectorAll('.d-btn').forEach((e) => {
        e.addEventListener('click', function () {
            this.parentElement.remove();
        })
    })
    // li.addEventListener('click', function(){
    //     this.remove();
    // });
}


// add Alarm to lists of array and addAlarm
function setAlarm(h, m, s, ampm) {
    h = (h < 10) ? `0${h}` : h;
    m = (m < 10) ? `0${m}` : m;
    s = (s < 10) ? `0${s}` : s;

    lists.push({
        hours: `${h}`,
        minutes: `${m}`,
        seconds: `${s}`,
        ampm: ampm,
        id: num,
    });

    addAlarm(h, m, s, ampm);
}


// if set Alarm button click
setAlarm_btn.addEventListener('click', () => {

    let h = parseInt(setA_time[0].value);
    let m = parseInt(setA_time[1].value);
    let s = parseInt(setA_time[2].value);
    let ampm = setA_time[3].value;


    if (h >= 1 && h <= 12 && m >= 0 && m <= 59 && s >= 0 && s <= 59) {
        if (ampm == "AM" || ampm == "PM") {
            setA_time.forEach((event) => {
                event.value = '';
            });

            setAlarm(h, m, s, ampm);
        } else {
            alert("Please Enter a  valid Time HH(01-12) MM(00-59) SS(00-59) AM/PM");
        }
    } else {
        alert("Please Enter a  valid Time HH(01-12) MM(00-59) SS(00-59) AM/PM");
    }


});


