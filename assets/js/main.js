class ValidaFormulario {
  constructor() {
    this.formulario = document.querySelector('.formulario');
    console.log(this.formulario)
    this.eventos();
  }

  eventos() {
    this.formulario.addEventListener('submit', e => {
      this.handleSubmit(e);
    });
  }

  handleSubmit(e) {
    e.preventDefault();
    const camposValidos = this.camposValidos();
    const senhasValidas = this.senhasValidas();

    if(camposValidos && senhasValidas) {
      alert("Formulário enviado com sucesso!");
      this.formulario.submit();
    }
  }

  camposValidos() {
    let valid = true;

      for(let campo in this.formulario.querySelectorAll('.validar')) {
        const label = campo.previousElementSibling.innerText;


        if(!campo.value) {
          this.criaErro(campo, `O campo ${label} não pode estar em branco!`);
          valid = false;
        }

        if(campo.classList.contains('cpf')) {
          if(!this.validaCPF(campo)) valid = false;
        }

        if(campo.classList.contains('usuario')) {
          if(!this.validaUsuario(campo)) valid = false;
        }
      }

      return valid
  }

  senhasValidas() {
    return true;
  }

  validaCPF(campo) {
    let cpf = new ValidaCPF(campo.value);
    
    if(!cpf.valida()) {
      criaErro(campo, "CPF inválido!");
      return false;
    }

    return true;
  }

  validaUsuario(campo) {

  }


}

const validaFormulario = new ValidaFormulario();