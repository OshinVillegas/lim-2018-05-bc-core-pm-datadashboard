const btnLima = document.getElementById("cLima");
const btndashB = document.getElementById("dashB");
const btnfiltroStudent = document.getElementById("filtroStudent");
const btnfiltroQuizzes = document.getElementById("filtroQuizzes");
const dataStudents= document.getElementById("listStudents");
const dataQuizzes = document.getElementById("listQuizzes");

btnLima.addEventListener("click",()=>{
        document.getElementById('contenido').style.display="none";
        document.getElementById('contenidoData').style.display="block";
})
btndashB.addEventListener("click",()=>{
    document.getElementById('contenidoData').style.display="none";
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
       cargandodata(users);
      } 
    }
    request.send();
document.getElementById('contenidoData').style.display="none";
document.getElementById('contenidoFiltros').style.display="block";
});
btnfiltroQuizzes.addEventListener('click',()=>{
    let request1 = new XMLHttpRequest(); 
    request1.open('GET', '../data/cohorts/lim-2018-03-pre-core-pw/progress.json', true);
    request1.onload = function () {
      if(request1.status === 200){
       let progress = JSON.parse(request1.response);
       //console.log(progress);       console.log(objeto1);
       let arry1=Object.keys(progress);
       //console.log(arry1);
 
        cargandodataQuizzes(arry1);
      } 
    }
    request1.send();
document.getElementById('contenidoData').style.display="none";
document.getElementById('contenidoFiltros').style.display="block";    
})
//Secciones de Funciones

function cargandodata(jsonObj){

    console.log(jsonObj);
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
function cargandodataQuizzes(jsonObj1){
  
    console.log(jsonObj1);

    for(var i = 0; i < jsonObj1.length; i++){
        console.log(jsonObj1[i]);
    }
   /* for(let i= 0;i<jsonObj1.l)
    console.log(jsonObj1[2]); */
    
    // jsonObj1.forEach((elemento) => {
        
    //     //se crea una lista de nombres
    // let linewUp= document.createElement("ul");
    // //se le asigna una clase a la etiqueta ul
    // linewUp.className = "listEstudiantes";
    // let linew= document.createElement("li");
    // dataQuizzes.appendChild(linewUp);
    // //se le asigna una clase a la etiqueta li
    // linew.className = "listasEstudiantes";
        
    //     linewUp.appendChild(linew);
    //     let rutaDataNombres=document.createElement("a");
    //     rutaDataNombres.textContent = elemento;
    //     rutaDataNombres.href="about:blank";
    // //se le asigna una clase a la etiqueta a
    // rutaDataNombres.className ="rutasNombres";
    // linew.appendChild(rutaDataNombres);
    // });


}