import { Component } from "./lib/index.js";

class Spider extends Component.Mix(HTMLImageElement) {
  static get tagName() { return "x-spider"; }
  static get tagExtends() { return "img"; }
  constructor () {
    super();
    this.innerHTML = "Hello World Spider";
    console.log(this.tagName, this.nodeName, Spider.observedAttributes)
  }

  connectedCallback() {
    console.log("Custom square element added to page.");
  }

  disconnectedCallback() {
    console.log("Custom square element removed from page.");
  }

  adoptedCallback() {
    console.log("Custom square element moved to new page.");
  }

  attributeChangedCallback(name, oldValue, newValue) {
    console.log("Custom square element attributes changed.", name, oldValue, newValue, "ostia");
  }

  build() { console.log("Ostia") }
}

// const hi = Spider.prototype.attributeChangedCallback;
// Spider.prototype.attributeChangedCallback = (name, oldValue, newValue) => {
//   hi(name, oldValue, newValue);
//   console.log("Hello World");
//   Spider.prototype.build();
// };
Spider.define();

// customElements.define("x-spider", Spider);

// const doc = new DOMParser();
// const docf = new DocumentFragment()

// const xml = new XMLHttpRequest();
// xml.open("GET", "./spinner.html", false);
// xml.onreadystatechange = function () {
//   if (this.readyState !== 4) return;
//   if (this.status !== 200) return;
//   // console.log(this.response);
//   // const data = doc.parseFromString(this.responseText, "text/html");
//   document.body.innerHTML = this.responseText;
//   // console.log(data.body);
// }
// xml.send();

