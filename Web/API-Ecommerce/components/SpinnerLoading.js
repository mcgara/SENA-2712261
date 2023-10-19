import Component from './Component/index.js';

export default class SpinnerLoading extends Component {
  static presetAttributes() {
    super.presetAttributes();
    this.attributes.add('hidden');
    this.attributes.add('remove');
  }
  
  attributeChanged(name, _oldValue, _newValue) {
    if (name === 'hidden') {
      this.onRender(() => this.render.elements.forEach(e => e.toggleAttribute('hidden')));
    }
    if (name === 'remove') this.onRender(() => this.remove());
  }
}
