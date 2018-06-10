const btnLima = document.getElementById("cLima");
const btndashB = document.getElementById("dashB");

btnLima.addEventListener("click",()=>{
    
        document.getElementById('contenido').style.display="none";
        document.getElementById('contenidoData').style.display="block";
})
btndashB.addEventListener("click",()=>{
    document.getElementById('contenidoData').style.display="none";
    document.getElementById('contenido').style.display="block";
   
})