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