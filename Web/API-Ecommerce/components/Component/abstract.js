import { Render, RenderComponent } from './render.js';
import { camelToDash } from '../../utils/index.js';

/** @type {import('./abstract').MixComponent} */
export const MixComponent = ClassHTMLElement =>
class Component extends ClassHTMLElement {
  static mix = MixComponent;
  static get tagName() { return camelToDash(this.name); }
  static get tagPrefix() { return 'com'; }
  static get tagExtends() { return null; }

  static root = './components/'
  static get source() { return this.root + this.name + '.html'; };
  static get render() { return RenderComponent.getRender(this.source); }

  static attributes = new Set(['build', 'no-build', 'render', 'no-render']);
  static get observedAttributes() { return Array.from(this.attributes); }
  static presetAttributes() {}

  static define(
    registry=window.customElements,
    prefix=this.tagPrefix,
    name=this.tagName,
    tagExtends=this.tagExtends
  ) {
    let error = 'parameter registry must be type CustomElementRegistry';
    if (registry instanceof CustomElementRegistry) error = '';
    if (!prefix) error = 'tag prefix not assigned';
    if (!name) error = 'no named tag to component';
    if (error) throw TypeError(error);
    name = String(prefix + '-' + name).toLowerCase();
    this.presetAttributes();
    registry.define(name, this, { extends: tagExtends ?? undefined });
  }

  constructor (...args) { super(...args); }

  get canBuild() { return this.getAttribute('build'); }
  get noBuild() { return this.hasAttribute('no-build'); }
  get canRender() { return this.getAttribute('render'); }
  get noRender() { return this.hasAttribute('no-render'); }
  set canBuild(value) { this.setAttribute('build', value); }
  set noBuild(value) { this.toggleAttribute('no-build', !!value); }
  set canRender(value) { this.setAttribute('render', value); }
  set noRender(value) { this.setAttribute('no-render', String(value)); }
  
  isRunConnected = false;
  removeOnConnected = false;
  render = new Render(this);

  onRender(onload) {
    /** @type {object} */
    const constructor = this.constructor;
    if (!(constructor.render && typeof onload === 'function')) return;
    constructor.render.onload = onload;
    constructor.render.load();
  }

  build() {}
  connected() {}
  attributeChanged(_name, _oldValue, _newValue) {}
  disconnected() {}
  // adopted() {}

  presetBuild() {
    if (this.noBuild) return;
    this.build();
  }

  presetRender() {
    /** @type {object} */
    const constructor = this.constructor;
    if (!(!this.noRender && constructor.render)) return;
    this.onRender(() => this.render.text = constructor.render.text);
  }

  connectedCallback() {
    this.connected();
    if (this.canBuild !== 'no-build') this.presetBuild();
    if (this.canRender !== 'no-render') this.presetRender();
    this.isRunConnected = true;
    if (this.removeOnConnected) {
      /** @type {object} */
      const constructor = this.constructor;
      if (constructor.render) this.onRender(() => this.remove());
      else this.remove();
    }
  }
  attributeChangedCallback(_name, _oldValue, _newValue) {
    if (!this.isRunConnected) return;
    this.attributeChanged(_name, _oldValue, _newValue);
    this.presetBuild();
  }
  disconnectedCallback() {
    if (!this.removeOnConnected) this.render.clearElements();
    this.disconnected();
  }
  // adoptedCallback() {}
}

export class Component extends MixComponent(HTMLElement) {}
export default Component;
