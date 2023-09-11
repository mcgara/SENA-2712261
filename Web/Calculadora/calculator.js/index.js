import { Operators } from "./operators.js";
import { DecimalPlace } from "./decimalPlace.js";
import { Expression } from "./expression.js";


class Calculator {
  constructor (display = "0", history="0", memory={ m1: 0, m2: 0, m3: 0 }) {
    this.display = display ?? "0";
    this.history = history ?? "0"
    this.memory = memory ?? { m1: 0, m2: 0, m3: 0 };
  }

  

}

