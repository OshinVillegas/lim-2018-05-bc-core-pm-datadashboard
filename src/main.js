const btnLima = document.getElementById("cLima");
const btndashB = document.getElementById("dashB");
const btnfiltroStudent = document.getElementById("filtroStudent");
const dataStudents= document.getElementById("listStudents");

function cargandodata(jsonObj){
    console.log(jsonObj);
 
    var linew= document.createElement("li");
    var contenido = document.createTextNode(jsonObj[0]["name"]);
    dataStudents.appendChild(linew);
    linew.appendChild(contenido);
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
   
    let request1 = new XMLHttpRequest(); 
    request1.open('GET', '../data/cohorts/lim-2018-03-pre-core-pw/users.json', true);

    request1.onload = function () {
      if(request1.status === 200){
       let users = JSON.parse(request1.response);
       console.log(users);
       cargandodata(users);
      } 
    }
    request1.send();
document.getElementById('contenidoData').style.display="none";
document.getElementById('contenidoFiltros').style.display="block";
});
