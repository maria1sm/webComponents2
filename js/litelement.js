
import {html, css, LitElement} from 'https://cdn.jsdelivr.net/gh/lit/dist@3/core/lit-core.min.js';
class AvatarComponent extends LitElement {
  static get styles() {
    const { cssRules } = document.styleSheets[0]
    //const { cssRules2 } = document.styleSheets[1]
    const bootstrap = css([Object.values(cssRules).map(rule => 
    rule.cssText).join('\n')])
    //const style = css([Object.values(cssRules2).map(rule => 
    //rule.cssText).join('\n')])
    return [
      //style,
      bootstrap,
      css`
      .disabled{
        opacity: 0.3;
      }
      .no-display{
        display:none;
      }
      `
    ];
  }
  static properties = {
    personas: { type: Array },
    gender: { type: String }
  };

  constructor() {
    super();
    this.personas = [];
    this.gender = "";
  }
  
  async connectedCallback() {
    super.connectedCallback();
    await this.fetchPeople();
    this.requestUpdate();
  }

  async fetchPeople() {
    try {
      if (this.gender !== "") { 
      const gender = this.gender;
      const url = `https://randomuser.me/api/?gender=${gender}&results=25`;
      const response = await fetch(url);
      const data = await response.json();
      this.personas = data.results;
      }      
    } catch (error) {
      console.error('Error fetching data', error);
    }
  }
  
  render() {
    return html`
      <div class="d-flex flex-wrap justify-content-center mt-5">
        ${this.personas.map(
          (persona) => html`
            <picture class="d-flex flex-column m-2 align-items-center ${persona.disabled ? 'disabled' : ''}">
              <img class="rounded-circle" src="${persona.picture.large}" @click=${() => this.toggleDisabled(persona)}>
              <b>${persona.name.first}</b>
            </picture>
          `
        )}
      </div>
    `;
  }

  toggleDisabled(persona) {
    persona.disabled = !persona.disabled;
    this.requestUpdate();
  }
}


customElements.define('avatar-component', AvatarComponent);

const menButton = document.getElementById('men');
const womenButton = document.getElementById('women');
const avatarComponent = document.getElementById('avatar-component');

menButton.addEventListener('click', () => {
avatarComponent.setAttribute('gender', 'male');
avatarComponent.fetchPeople();
});

womenButton.addEventListener('click', () => {
avatarComponent.setAttribute('gender', 'female');
avatarComponent.fetchPeople();
});



