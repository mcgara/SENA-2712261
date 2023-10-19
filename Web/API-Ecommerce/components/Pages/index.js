import Component from '../Component/index.js';
import { RenderComponent } from '../Component/render.js';

const pages = {
  products: 'Products.html'
}

const pagesNames = Object.keys(pages);

export default class Pages extends Component {
  static get tagName() { return 'pages'; }
  static root = super.root + 'Pages/';
  static get render() { return null; }
  
  static presetAttributes() {
    super.presetAttributes();
    this.attributes.add('page-name');
  }

  get pageName() { return this.getAttribute('page-name'); }
  set pageName(value) { this.setAttribute('page-name', value); }
  
  presetRender() {
    if (this.noRender || !this.pageName || !pagesNames.includes(this.pageName)) return;
    const Render = RenderComponent.getRender(Pages.root + pages[this.pageName]);
    Render.onload = () => this.outerHTML = Render.text;
    Render.load();
  }
}
