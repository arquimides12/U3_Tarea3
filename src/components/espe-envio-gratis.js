import { LitElement, html, css } from 'lit';

class ESPEEnvioGratis extends LitElement {
  static get properties() {
    return {
      totalActual: { type: Number },
      totalGratis: { type: Number },
      tema: { type: String }
    };
  }

  static get styles() {
    return css`
      :host {
        display: block;
        font-family: Arial, sans-serif;
        max-width: 500px;
        margin: 0 auto;
      }

      .contenedor-envio {
        background-color: var(--envio-fondo);
        border-radius: 8px;
        padding: 12px;
        color: var(--envio-texto);
        border: 1px solid var(--envio-borde);
      }

      .etiqueta {
        font-size: 14px;
        margin-bottom: 8px;
      }

      .contenedor-barra {
        display: flex;
        gap: 10px;
        align-items: center;
      }

      .contenedor-fila {
        display: flex;
        justify-content: space-between;
      }

      .barra {
        background-color: var(--envio-barra-fondo);
        width: 100%;
        border-radius: 6px;
        overflow: hidden;
        height: 10px;
      }

      .progreso {
        height: 10px;
        background-color: var(--envio-barra-activa);
        width: 0%;
        transition: width 0.3s ease;
      }

      .estado {
        font-weight: bold;
        font-size: 14px;
        text-align: right;
        white-space: nowrap;
      }

      .gratis {
        color: var(--envio-verde);
      }
    `;
  }

  constructor() {
    super();
    this.totalActual = 0;
    this.totalGratis = 0;
    this.tema = 'claro';
  }

  connectedCallback() {
    super.connectedCallback();
    this._aplicarTema();
    this._productosMap = new Map();

    window.addEventListener('carrito-actualizado', (e) => {
      this._productosMap.set(e.detail.title, e.detail.total);
      this._recalcular();
    });

    window.addEventListener('carrito-removido', (e) => {
      this._productosMap.delete(e.detail.title);
      this._recalcular();
    });
  }

  _recalcular() {
    let nuevoTotal = 0;
    for (let valor of this._productosMap.values()) {
      nuevoTotal += valor;
    }
    this.totalActual = nuevoTotal;
  }

  updated() {
    this._aplicarTema();

    ['totalActual', 'totalGratis'].forEach(prop => {
      if (typeof this[prop] !== 'number' || isNaN(this[prop])) {
        console.warn(`Propiedad ${prop} no válida, se reinicia a 0`);
        this[prop] = 0;
      }
    });

    this.dispatchEvent(new CustomEvent('envio-gratis', {
      detail: { gratis: this.totalActual >= this.totalGratis },
      bubbles: true,
      composed: true
    }));
  }

  _aplicarTema() {
    const root = this.style;
    if (this.tema === 'oscuro') {
      root.setProperty('--envio-fondo', '#222');
      root.setProperty('--envio-texto', '#eee');
      root.setProperty('--envio-borde', '#444');
      root.setProperty('--envio-barra-fondo', '#333');
      root.setProperty('--envio-barra-activa', '#2196f3');
      root.setProperty('--envio-verde', '#4caf50');
    } else {
      root.setProperty('--envio-fondo', '#f9f9f9');
      root.setProperty('--envio-texto', '#333');
      root.setProperty('--envio-borde', '#ccc');
      root.setProperty('--envio-barra-fondo', '#e0e0e0');
      root.setProperty('--envio-barra-activa', '#007bff');
      root.setProperty('--envio-verde', '#28a745');
    }
  }

  calcularProgreso() {
    const porcentaje = Math.min((this.totalActual / this.totalGratis) * 100, 100);
    return `${porcentaje}%`;
  }

  renderEstado() {
    if (this.totalActual >= this.totalGratis) {
      return html``;
    }
    const diferencia = (this.totalGratis - this.totalActual).toFixed(2).replace('.', ',');
    return html`<span class="estado">$${diferencia} para envío gratis</span>`;
  }

  renderEnvio() {
    if (this.totalActual >= this.totalGratis) {
      return html`<span class="estado gratis">Envío gratis</span>`;
    }
    return html`<span class="estado" style="color: #aaa">Envío gratis</span>`;
  }

  renderProgreso() {
    if (this.totalActual >= this.totalGratis) {
      return html`<div class="progreso" style="width: ${this.calcularProgreso()}; background-color: var(--envio-verde);"></div>`;
    }
    return html`<div class="progreso" style="width: ${this.calcularProgreso()};"></div>`;
  }

  render() {
    return html`
      <div class="contenedor-envio">
        <div class="contenedor-fila">
          <div class="etiqueta">Envío</div>
          ${this.renderEstado()}
        </div>
        <div class="contenedor-barra">
          <div class="barra">
            ${this.renderProgreso()}
          </div>
          ${this.renderEnvio()}
        </div>
      </div>
    `;
  }
}

customElements.define('espe-envio-gratis', ESPEEnvioGratis);
