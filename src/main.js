const btnLima = document.getElementById("cLima");
const btndashB = document.getElementById("dashB");
const btnfiltroStudent = document.getElementById("filtroStudent");
const dataStudents= document.getElementById("listStudents");

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
