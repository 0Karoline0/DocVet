const form = document.getElementById('form');
const campos = document.querySelectorAll('.required');
const spans = document.querySelectorAll('.span-required');
const emailRegex = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;

form.addEventListener('submit',(event) =>{
    event.preventDefault();
    nameValidate();
    cpfValidate();
    celularValidate();
    emailValidate();
    mainPasswordValidate();
    comparePassword();
})

function setError(index){
    campos[index].style.border = '3px solid #e63636'
    spans[index].style.display = 'block'
}

function removeError(index){
    campos[index].style.border = ''
    spans[index].style.display = 'none'
}

function nameValidate() {
    if (campos[0].value.length < 3) 
    {
        setError(0);
    }
    else
    {
        removeError(0);
    }
}

function cpfValidate(){
    if(campos[1].value.length < 11){
        setError(1)
    }
    else
    {
        removeError(1)
    }
}

function celularValidate(){
    if(campos[2].value.length < 11){
        setError(2)
    }
    else
    {
        removeError(2)
    }
}

function emailValidate(){
    if(emailRegex.test(campos[3].value)){
        removeError(3);
    }
    else
    {
        setError(3)
    }
}

function mainPasswordValidate(){
    if(campos[4].value.length < 8){
        setError(4);
    }
    else
    {
        removeError(4);
        comparePassword();
    }
}

function comparePassword(){
    if(campos[4].value === campos[5].value && campos[5].value.length >=8){
        removeError(5)
    }
    else
    {
        setError(5)
    }
}