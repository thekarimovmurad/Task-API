let latitude = document.querySelector(".latitude");
let longtitude = document.querySelector(".longtitude");
let dateTime = document.querySelector(".dateTime");
let button = document.querySelector(".button");
let dataTable = document.querySelector(".data-table");
let table = document.querySelector(".table");
let tableBody = document.querySelector(".tableBody");
let search = document.querySelector(".search");
let change = document.querySelector(".change-search");


button.addEventListener("click", function () {
    let dateTimeValue = dateTime.value
    let monthValue = parseInt(dateTimeValue.substr(dateTimeValue.length - 2));
    let yearValue = parseInt(dateTimeValue.substr(0, 4));
    let latitudeValue = parseInt(latitude.value);
    let longtitudeValue = parseInt(longtitude.value);

    latitudeValue = "";
    longtitudeValue = "";
    monthValue = "";
    yearValue = "";
    showTime()
})


change.addEventListener("click", function () {
    dataTable.classList.add("d-none");
    search.classList.remove("d-none");
});


function showTime() {
    let request = new XMLHttpRequest();

    request.onload = function () {
        if (request.status >= 400 && request.status < 500) {
            alert("Incorrect Data!!!");
            clickAfter()
            return;
        }

        dataTable.classList.remove("d-none");
        search.classList.add("d-none");
        let prayerTime=JSON.parse(request.responseText);

        for(const prayDay of prayerTime.data){
    
            let tableData= document.createElement("tr");
            tableBody.append(tableData);

            let day= document.createElement("th");
            day.innerText= prayDay.date.gregorian.day;
            tableData.append(day);

            let Fajr= document.createElement("td");
            var text=prayDay.timings.Fajr.split(" ");
            Fajr.innerText=text[0];
            tableData.append(Fajr);

            let Sunrise= document.createElement("td");
            var text=prayDay.timings.Sunrise.split(" ");
            Sunrise.innerText=text[0];
            tableData.append(Sunrise);

            let Dhuhr= document.createElement("td");
            var text=prayDay.timings.Dhuhr.split(" ");
            Dhuhr.innerText=text[0];
            tableData.append(Dhuhr);

            let Asr= document.createElement("td");
            var text=prayDay.timings.Asr.split(" ");
            Asr.innerText=text[0];
            tableData.append(Asr);

            let Maghrib= document.createElement("td");
            var text=prayDay.timings.Maghrib.split(" ");
            Maghrib.innerText=text[0];
            tableData.append(Maghrib);

            let Isha= document.createElement("td");
            var text=prayDay.timings.Isha.split(" ");
            Isha.innerText=text[0];
            tableData.append(Isha);
        }


        console.log(JSON.parse(request.responseText));
    }





    request.open("GET", "http://api.aladhan.com/v1/calendar?latitude=" + latitude.value + "&longitude=" + longtitude.value + "&method=2&month=" + dateTime.value.substr(dateTime.value.length - 2) + "&year=" + dateTime.value.substr(0, 4));
    request.send();
}