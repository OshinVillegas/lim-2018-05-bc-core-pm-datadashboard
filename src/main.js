const btnLima = document.getElementById("cLima");
const btndashB = document.getElementById("dashB");
const btnfiltroStudent = document.getElementById("filtroStudent");

btnLima.addEventListener("click",()=>{
    
        document.getElementById('contenido').style.display="none";
        document.getElementById('contenidoData').style.display="block";
})
btndashB.addEventListener("click",()=>{
    document.getElementById('contenidoData').style.display="none";
    document.getElementById('contenidoFiltros').style.display="none";
    document.getElementById('contenido').style.display="block";
   
})
btnfiltroStudent.addEventListener("click",()=>{
    document.getElementById('contenidoData').style.display="none";
    document.getElementById('contenidoFiltros').style.display="block";
   
})

let cohorts = null;

var request = new XMLHttpRequest();
request.open('GET', '../data/cohorts.json', true);

request.onload = function () {  
    if (request.status == 200) {
        cohorts = JSON.parse(request.responseText);
        console.log(cohorts);
    }
};

request.send();

let users = null;

request.open('GET', '../data/cohorts/lim-2018-03-pre-core-pw/users.json', true);

request.onload = function () {
    if (request.status == 200) {
        users = JSON.parse(request.responseText);
        console.log(users);
    }
};

request.send();

let progress = null;

request.open('GET', '../data/cohorts/lim-2018-03-pre-core-pw/progress.json', true);

request.onload = function () {
    if (request.status == 200) {
        progress = JSON.parse(request.responseText);
        console.log(progress);
    }
};

request.send();

