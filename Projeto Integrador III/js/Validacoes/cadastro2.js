const form = document.getElementById('form');
        const campos = document.querySelectorAll('.required');
        const spans = document.querySelectorAll('.span-required');

        form.addEventListener('submit', (event) => {
            event.preventDefault();
            nomeValidate();
            especialidadeValidate();
            enderecoValidate();
            checkboxtiposValidate();
            checkboxporteValidate();
            checkboxconvenioValidate();
        });

        function setError(index) {
            campos[index].style.border = '3px solid #e63636';
            spans[index].style.display = 'block';
        }

        function removeError(index) {
            campos[index].style.border = '';
            spans[index].style.display = 'none';
        }

        function nomeValidate() {
            if (campos[0].value.length < 1) {
                setError(0);
            } else {
                removeError(0);
            }
        }

        function especialidadeValidate() {
            if (campos[1].value.length < 1) {
                setError(1);
            } else {
                removeError(1);
            }
        }

        function enderecoValidate() {
            if (campos[2].value.length < 1) {
                setError(2);
            } else {
                removeError(2);
            }
        }

        function checkboxtiposValidate() {
            const checkboxTipos = document.querySelectorAll('input[name="tipo_animal"]:checked');
            if (checkboxTipos.length === 0) {
                setError(3);
            } else {
                removeError(3);
            }
        }

        function checkboxporteValidate() {
            const checkboxPorte = document.querySelectorAll('input[name="porte"]:checked');
            if (checkboxPorte.length === 0) {
                setError(4);
            } else {
                removeError(4);
            }
        }

        function checkboxconvenioValidate() {
            const checkboxConvenio = document.querySelectorAll('input[name="convenio"]:checked');
            if (checkboxConvenio.length === 0) {
                setError(5);
            } else {
                removeError(5);
            }
        }



        usuarios = [];
carregarArray();

function salvarArray() {
    arrayTxt = JSON.stringify(usuarios)
    localStorage.setItem("usuario", arrayTxt)
}

function carregarArray() {
    arrayTxt = localStorage.getItem("usuario")
    if(arrayTxt) {
        itens = JSON.parse(arrayTxt);
    }
    else {
        usuarios = [];
    }
}
function salvarUsuario() {
    valorNome = document.getElementById("nome").value;
    valorespecialidade = document.getElementById("especialidade").value;
    valorcidade = document.getElementById("cidade").value;


    novoUsuario = {
        nome: valorNome,
        especialidade: valorEspecialidade,
        cidade: valorCidade,

    }
    //Inserir o novo objeto no array 'itens'
    usuarios.push(novoUsuario);

    salvarArray();

    console.log(usuarios);
}



