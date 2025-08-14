import { LitElement, html, css } from 'lit';

class ESPEBotonCarrito extends LitElement {
  static get properties() {
    return {
      cantidad: { type: Number },
      tema: { type: String }
    };
  }

  static get styles() {
    return css`
      :host {
        display: inline-block;
      }

      .contenedor-icono {
        position: relative;
        width: 30px;
        height: 30px;
        background-color: var(--fondo-icono);
        border-radius: 50%;
        display: flex;
        justify-content: center;
        align-items: center;
        color: var(--color-icono);
        font-size: 20px;
        cursor: pointer;
      }

      .badge {
        position: absolute;
        top: -2px;
        right: -4px;
        background-color: var(--color-badge);
        color: white;
        font-size: 8px;
        font-weight: bold;
        padding: 2px 6px;
        border-radius: 12px;
      }
    `;
  }

  constructor() {
    super();
    this.cantidad = 0;
    this.tema = 'claro';
  }

  updated() {
    this._aplicarTema();
    if (typeof this.cantidad !== 'number' || isNaN(this.cantidad)) {
      console.warn('Propiedad cantidad no válida, se reinicia a 0');
      this.cantidad = 0;
    }
  }

  _aplicarTema() {
    const s = this.style;
    if (this.tema === 'oscuro') {
      s.setProperty('--fondo-icono', '#2e7d32');
      s.setProperty('--color-icono', '#ffffff');
      s.setProperty('--color-badge', '#43a047');
    } else {
      s.setProperty('--fondo-icono', '#e0f2f1');
      s.setProperty('--color-icono', '#2e7d32');
      s.setProperty('--color-badge', '#2e7d32');
    }
  }

  _emitirEventoClick() {
    this.dispatchEvent(new CustomEvent('carrito-click', {
      detail: { cantidad: this.cantidad },
      bubbles: true,
      composed: true
    }));
  }

  render() {
    return html`
      <div class="contenedor-icono" @click=${this._emitirEventoClick}>
        🛒
        ${this.cantidad > 0
          ? html`<span class="badge">${this.cantidad}</span>`
          : ''}
      </div>
    `;
  }
}

customElements.define('espe-boton-carrito', ESPEBotonCarrito);
