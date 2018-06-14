const btnLima = document.getElementById("cLima");
const btndashB = document.getElementById("dashB");
const btnfiltroStudent = document.getElementById("filtroStudent");
const btnfiltroQuizzes = document.getElementById("filtroQuizzes")
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
document.getElementById('contenidoData').style.display="none";
document.getElementById('contenidoFiltros').style.display="block";
})


btnfiltroQuizzes.addEventListener('click',()=>{
    
    document.getElementById('contenidoData').style.display = "none";
    document.getElementById('contenidoFiltros').style.display = "block";
})


