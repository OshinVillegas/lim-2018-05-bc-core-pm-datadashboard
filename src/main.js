const btnLima = document.getElementById("cLima");
const btndashB = document.getElementById("dashB");
const btnfiltroStudent = document.getElementById("filtroStudent");
const btnfiltroQuizzes = document.getElementById("filtroQuizzes")
const dataStudents= document.getElementById("listStudents");
const dataQuizzes = document.getElementById("listQuizzes");

function cargandodata(jsonObj){
    console.log(jsonObj);
    jsonObj.forEach((elemento) => {

        //se crea una lista de nombres
        let linewUp = document.createElement("ul");
        let linew = document.createElement("li");
        dataStudents.appendChild(linewUp);
        linew.className = "listasEstudiantes";

        linewUp.appendChild(linew);
        let rutaDataNombres = document.createElement("a");
        rutaDataNombres.textContent = elemento["name"];
        rutaDataNombres.href = "about:blank";
        linew.appendChild(rutaDataNombres);

    })
}
function cargandodataQ(jsonObj) {
    console.log(jsonObj);
    jsonObj.forEach((elemento) => {

        //se crea una lista de nombres
        let linewUp = document.createElement("ul");
        let linew = document.createElement("li");
        dataQuizzes.appendChild(linewUp);
        linew.className = "listasEstudiantes";

        linewUp.appendChild(linew);
        let rutaDataNombres = document.createElement("a");
        rutaDataNombres.textContent = elemento["name"];
        rutaDataNombres.href = "about:blank";
        linew.appendChild(rutaDataNombres);

    })
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
})


btnfiltroQuizzes.addEventListener('click',()=>{

    let request3 = new XMLHttpRequest();
    request3.open('GET', '../data/cohorts/lim-2018-03-pre-core-pw/progress.json', true);
    
    request3.onload = function () {
        if (request3.status == 200) {
            let progress = JSON.parse(request3.responseText)

            //let array1 = progress["04oXrfTxNUbhGtkxNTfw7fhHVgs1"].intro;
            //console.log(array1)
            let array1 = Object.keys(progress)
            console.log(array1)
        }
    };

    request3.send();
    
    
    document.getElementById('contenidoData').style.display = "none";
    document.getElementById('contenidoFiltros').style.display = "block";
})


