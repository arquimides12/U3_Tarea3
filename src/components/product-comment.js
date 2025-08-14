import { LitElement, html, css } from 'lit';

export class ProductComment extends LitElement {
  static properties = {
    status: { type: String },
    comment: { type: String }
  };

  constructor() {
    super();
    this.status = 'initial';
    this.comment = '';
  }

  static styles = css`
    :host {
      display: block;
      width: 400px;
      background-color: #d8d0ce;
      border-radius: 20px;
      font-family: Arial, sans-serif;
      padding: 35px;
    }

    .header {
      display: flex;
      align-items: center;
      gap: 10px;
      margin-bottom: 10px;
    }

    .circle {
      width: 15px;
      height: 15px;
      border-radius: 50%;
      background-color: #ccc;
    }

    .circle.sent {
      background-color: #006935;
    }

    .circle.cancelled {
      background-color: #F20F13;
    }

    textarea {
      width: 100%;
      height: 80px;
      border-radius: 10px;
      border: none;
      padding: 10px;
      resize: none;
      font-size: 1rem;
    }

    .footer {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-top: 10px;
    }

    .footer span {
      font-size: 0.8rem;
      color: #333;
    }

    .footer button {
      padding: 8px 15px;
      margin-left: 10px;
      border: none;
      border-radius: 6px;
      cursor: pointer;
    }

    .cancelled {
      background-color: #F20F13;
      color: #fff;
    }

    .sent {
      background-color: #006935;
      color: #fff;
    }
  `;

  handleSend() {
    this.status = 'sent';
  }

  handleCancel() {
    this.status = 'cancelled';
  }

  render() {
    return html`
      <div class="header">
        <div
          class="circle ${this.status === 'sent'
            ? 'sent'
            : this.status === 'cancelled'
            ? 'cancelled'
            : ''}"
        ></div>
        <strong>Agrega una opinión sobre el producto</strong>
      </div>

      <textarea
        placeholder="Escribe aquí..."
        .value=${this.comment}
        @input=${e => (this.comment = e.target.value)}
        maxlength="1500"
      ></textarea>

      <div class="footer">
        <span>${this.comment.length}/1500</span>
        <div>
          <button
            class=${this.status === 'sent' ? 'sent' : ''}
            @click=${this.handleSend}
          >
            ${this.status === 'sent' ? 'Opinión enviada' : 'Enviar opinión'}
          </button>
          <button
            class=${this.status === 'cancelled' ? 'cancelled' : ''}
            @click=${this.handleCancel}
          >
            ${this.status === 'cancelled' ? 'Opinión cancelada' : 'Cancelar'}
          </button>
        </div>
      </div>
    `;
  }
}

customElements.define('product-comment', ProductComment);
