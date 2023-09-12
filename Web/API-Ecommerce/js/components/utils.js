import { FakeStore } from "./fakeStore.js"

export class SetAttrsOnEvent extends FakeStore {
  static tag = "api-utils-set-attrs-event";
  static extends = "div";
  
  get query() { return this.getAttribute("query"); }
  set query(value) { this.setAttribute("query", value); }
  get addAttrs() { return this.getAttribute("add-attrs"); }
  set addAttrs(value) { this.setAttribute("add-attrs", value); }
  get rmAttrs() { return this.getAttribute("rm-attrs"); }
  set rmAttrs(value) { this.setAttribute("rm-attrs", value); }

  parserAttrs() {
    let add = [["", ""]];
    let rm = [""];
    delete add[0];
    delete rm[0];

    try { add = JSON.parse(this.addAttrs) ?? []; } catch {}
    try { rm = JSON.parse(this.rmAttrs) ?? []; } catch {}

    if (!Array.isArray(add)) add = Object.entries(add);
    else add = add.map(attr => {
      if (!Array.isArray(attr)) {
        if (attr !== null) attr = String(attr);
        attr = [attr, ""];
      }
      return attr;
    });
    if (!Array.isArray(rm)) rm = Object.keys(rm);
    else rm = rm.map(attr => attr !== null ? String(attr) : attr);
    return { add, rm };
  }

  alterAttributes() {
    const elements = document.querySelectorAll(this.query)
    if (this.query === null || elements.length === 0) return;
    const { add, rm } = this.parserAttrs();
    if (add.length === 0 && rm.length === 0) return;
    for (let element of elements) {
      for (let attr of rm) element.removeAttribute(attr);
      for (let [name, value] of add) element.setAttribute(name, value);
    }
  }

  build() { this.alterAttributes() }
  
  constructor () {
    super();
    if (this.runBuild === null) this.build();
  }
}

export class SetAttrsOnResponse extends SetAttrsOnEvent {
  static tag = "api-utils-set-attrs-response";
  static extends = "div";
  
  constructor () { super(); }
  
  build() {
    this.categories.then(() => super.build());
  }
}

export default {
  SetAttrsOnEvent,
  SetAttrsOnResponse
}
