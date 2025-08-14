import { LitElement, html, css } from 'lit';

export class LoginForm extends LitElement {
  static properties = {
    email: { type: String },
    password: { type: String },
    showPassword: { type: Boolean },
    validEmail: { type: Boolean },
    validPassword: { type: Boolean }
  };

  constructor() {
    super();
    this.email = '';
    this.password = '';
    this.showPassword = false;
    this.validEmail = true;
    this.validPassword = true;
  }

  static styles = css`
    :host {
      display: flex;
      justify-content: center;
      align-items: center;
      height: 100vh;
      background-color: #1e1e1e;
      font-family: 'Arial', sans-serif;
    }

    .container {
      background-color: #d8d0ce;
      border-radius: 30px;
      width: 350px;
      padding: 20px;
    }

    .header {
      display: flex;
      justify-content: center;
      gap: 10px;
      font-size: 1.1rem;
      margin-bottom: 20px;
    }

    .header span {
      border-bottom: 2px solid transparent;
      padding-bottom: 5px;
      cursor: pointer;
    }

    .header .active {
      border-color: black;
    }

    label {
      display: block;
      font-weight: bold;
      margin: 10px 0 4px;
    }

    .form-group {
      position: relative;
      margin-bottom: 20px;
    }

    input {
      width: 100%;
      padding: 8px;
      border: none;
      border-bottom: 2px solid #000;
      font-size: 1rem;
      background: transparent;
      outline: none;
    }

    input.valid {
      border-color: #0077FF;
    }

    input.invalid {
      border-color: #F20F13;
    }

    .eye-icon {
      position: absolute;
      right: 0;
      top: 35px;
      cursor: pointer;
      user-select: none;
    }

    button {
      width: 100%;
      padding: 10px;
      background-color: #d8d0ce;
      border: none;
      margin-top: 10px;
      font-weight: bold;
      cursor: pointer;
      border-radius: 4px;
    }

    .footer {
      margin-top: 10px;
      text-align: center;
    }

    .footer button {
      background-color: #b3a7a4;
      font-size: 0.9rem;
    }
  `;

  validateEmail() {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    this.validEmail = emailRegex.test(this.email);
  }

  validatePassword() {
    this.validPassword = this.password.length >= 6;
  }

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }

  handleSubmit() {
    this.validateEmail();
    this.validatePassword();
    if (this.validEmail && this.validPassword) {
      alert('Inicio de sesión exitoso ✅');
      this.dispatchEvent(new CustomEvent('login-success', {
        detail: { email: this.email },
        bubbles: true,
        composed: true
      }));
    } else {
      alert('Correo o contraseña inválidos ❌');
    }
  }

  render() {
    return html`
      <div class="container">
        <div class="header">
          <span class="active">Inicio Sesión</span>
          <span> / Registro</span>
        </div>

        <div class="form-group">
          <label>Correo</label>
          <input
            type="email"
            .value=${this.email}
            @input=${e => this.email = e.target.value}
            @blur=${this.validateEmail}
            class=${this.validEmail ? 'valid' : 'invalid'}
          />
        </div>

        <div class="form-group">
          <label>Contraseña</label>
          <input
            type=${this.showPassword ? 'text' : 'password'}
            .value=${this.password}
            @input=${e => this.password = e.target.value}
            @blur=${this.validatePassword}
            class=${this.validPassword ? 'valid' : 'invalid'}
          />
          <span class="eye-icon" @click=${this.togglePasswordVisibility}>👁️</span>
        </div>

        <button @click=${this.handleSubmit}>Iniciar Sesión</button>

        <div class="footer">
          <button>No tienes cuenta Registrate</button>
        </div>
      </div>
    `;
  }
}

customElements.define('login-form', LoginForm);
