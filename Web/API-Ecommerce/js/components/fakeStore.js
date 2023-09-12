import Mix from "./mixins.js";

export class FakeStore extends Mix.FakeStore(HTMLDivElement) {
  static tag = "api-fakestore";
  static extends = "div";
  
  constructor () { super(); }
}

export default { Abstract: FakeStore }
