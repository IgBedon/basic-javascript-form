class ValidaFormulario {
  constructor() {
    this.formulario = document.querySelector('.formulario');
    this.eventos();
  }

  eventos() {
    this.formulario.addEventListener('submit', e => {
      this.handleSubmit(e);
    });
  }

  handleSubmit(e) {
    e.preventDefault();

    for(let errorText of this.formulario.querySelectorAll('.error-text')) {
      errorText.remove();
    }

    const camposValidos = this.camposValidos();
    const senhasValidas = this.senhasValidas();

    if(camposValidos && senhasValidas) {
      alert("Formulário enviado com sucesso!");
      this.formulario.submit();
    }
  }

  camposValidos() {
    let valid = true;

    for(let campo of this.formulario.querySelectorAll('.validar')) {
      const label = campo.previousElementSibling.innerText;

      if(!campo.value) {
        this.criaErro(campo, `Campo "${label}" não pode estar em branco.`);
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
    console.log("Teste")
    let valid = true

    const senha = this.formulario.querySelector('.senha');
    const repetirSenha = this.formulario.querySelector('.repetir-senha');

    if(!senha === repetirSenha) {
      this.criaErro(senha, "Campo senha e repetir senha precisam ser iguais!");
      this.criaErro(repetirSenha, "Campo senha e repetir senha precisam ser iguais!");
      valid = false
    }

    if(senha.value.length < 6 || senha.value.length > 12) {
      this.criaErro(senha, "A senha precisa ter entre 6 e 12 caracteres");
      valid = false
    }

    return valid;
  }

  validaUsuario(campo) {
    let valid = true;
    const usuario = campo.value

    if(usuario.length < 3 || usuario.length > 12) {
      this.criaErro(campo, "Usuário precisa ter entre 3 e 12 caracteres");
    }

    if(!usuario.match(/^[a-zA-Z0-9]+$/g)) {
      this.criaErro(campo, 'Nome de usuário precisar conter apenas letras e/ou números.');
      valid = false;
    }

    return valid;
  }

  validaCPF(campo) {
    let cpf = new ValidaCPF(campo.value);
    
    if(!cpf.valida()) {
      this.criaErro(campo, "CPF inválido!");
      return false;
    }

    return true;
  }
  
  criaErro(campo, msg) {
    const div = document.createElement('div');
    div.innerHTML = msg;
    div.classList.add('error-text');
    campo.insertAdjacentElement('afterend', div);
  }

}

const validaFormulario = new ValidaFormulario();