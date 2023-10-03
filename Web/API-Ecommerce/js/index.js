import * as Utils from "./utils.js";
import API from "./api/index.js";
import Components from "./components/index.js";

Components.Utils.HTML.Head.define();
Components.Utils.HTML.Body.define();
Components.Utils.HTML.Title.define();
Components.Utils.HTML.Page.define();
Components.Utils.HTML.Part.define();

// API.FakeStore.products().then(products => console.log(products))

export default {
  API,
  Utils
}
