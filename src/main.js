const btnLima = document.getElementById("cLima");
const btndashB = document.getElementById("dashB");
const btnfiltroStudent = document.getElementById("filtroStudent");
const btnfiltroQuizzes = document.getElementById("filtroQuizzes");
const dataStudents= document.getElementById("listStudents");
const dataQuizzes = document.getElementById("listQuizzes");
const cohortsSelect = document.getElementById("trainingCenters");
const resp1 = document.getElementById("respuestas1");

//funciones para tomar datos del Cohort.json
function cargarDatosCohorts(){
    let request = new XMLHttpRequest(); 
    request.open('GET', '../data/cohorts.json', true);
    request.onload = function () {
      if(request.status === 200){
       let array = JSON.parse(request.response);
       cargarDatosSelect(array);
        }
    }
    request.send();
}
function cargarDatosProgress(){
    let request = new XMLHttpRequest(); 
    request.open('GET', '../data/cohorts/lim-2018-03-pre-core-pw/progress.json', true);
    request.onload = function () {
      if(request.status === 200){
       let progressQuizzes = JSON.parse(request.response);
       cargandodataQuizzes(progressQuizzes);
        }
    }
    request.send();
}
function cargarDatosSelect(array) {
    array.sort();
    array.forEach((elemento) => {
        if(elemento["id"].substring(0,3)=== "lim"){
        cohortsSelect.innerHTML += "<option value='"+elemento["id"]+"'>"+elemento["id"]+"</option>";
        }
    }); 
}
//funcion para tomar datos del user.json
function cargandodataStudents(jsonObj){

    // console.log(jsonObj);
    jsonObj.forEach((elemento) => {
     
     //se crea una lista de nombres
    let linewUp= document.createElement("ul");
    //se le asigna una clase a la etiqueta ul
    linewUp.className = "listEstudiantes";
    let linew= document.createElement("li");
    dataStudents.appendChild(linewUp);
    //se le asigna una clase a la etiqueta li
    linew.className = "listasEstudiantes";
     
     linewUp.appendChild(linew);
      let rutaDataNombres=document.createElement("a");
      rutaDataNombres.textContent = elemento["name"];
      rutaDataNombres.href="about:blank";
    //se le asigna una clase a la etiqueta a
    rutaDataNombres.className ="rutasNombres";
    linew.appendChild(rutaDataNombres);
    });
    
}
function cargandodataQuizzes(jsonObj){
    let progress= Object.keys(jsonObj);

    // console.log(jsonObj);
    for (let i = 0; i < progress.length; i++) {
        const element = progress[0];
        // const propiedadElemento = jsonObj[element].intro;
        // const porpiedadDura=jsonObj[element].intro.totalDuration;
        const porpiedadDura=jsonObj[element].intro.units;
        console.log(porpiedadDura);
                
    }
    
}
// Eventos del dom
btnLima.addEventListener("click",()=>{
    // console.log(e.target.textContent);
    // document.getElementById('contenidoData').style.display="block";
    cargarDatosCohorts();
    document.getElementById('contenido').style.display="none";
    document.getElementById('selectCenters').style.display="block";
})
cohortsSelect.addEventListener("change",(e)=>{
 if(e.target.value === "lim-2018-03-pre-core-pw") {
    document.getElementById('selectCenters').style.display="none";
    document.getElementById('contenidoData').style.display="block";
    cargarDatosProgress();

 }

}); 
btndashB.addEventListener("click",()=>{
    document.getElementById('contenidoData').style.display="none";
    document.getElementById('selectCenters').style.display="none";
    document.getElementById('contenidoFiltros').style.display="none";
    document.getElementById('contenido').style.display="block";
   
})
btnfiltroStudent.addEventListener('click',()=>{
   
    let request = new XMLHttpRequest(); 
    request.open('GET', '../data/cohorts/lim-2018-03-pre-core-pw/users.json', true);
    request.onload = function () {
      if(request.status === 200){
       let users = JSON.parse(request.response);
       console.log(users);
       cargandodataStudents(users);
      } 
    }
    request.send();
document.getElementById('contenidoData').style.display="none";
document.getElementById('contenidoFiltros').style.display="block";
});
// btnfiltroQuizzes.addEventListener('click',()=>{
//     let request1 = new XMLHttpRequest(); 
//     request1.open('GET', '../data/cohorts/lim-2018-03-pre-core-pw/progress.json', true);
//     request1.onload = function () {
//       if(request1.status === 200){
//        let progress = JSON.parse(request1.response);
//        //console.log(progress);       console.log(objeto1);
//        let arry1=Object.keys(progress);
//        //console.log(arry1);
 
//         cargandodataQuizzes(arry1);
//       } 
//     }
//     request1.send();
// document.getElementById('contenidoData').style.display="none";
// document.getElementById('contenidoFiltros').style.display="block";    
// })

