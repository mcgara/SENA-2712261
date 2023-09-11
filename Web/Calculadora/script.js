import { Expression, Expr } from "./calculator.js/expression.js";


const a = Expression("500+2", 2);
// const a = Expression("1232-12", 2);
// const b = Expr("\u00D7")
a.result
console.log(a.value, a.result, a.toDecimal(), a.toString(), "asdf", a.valueToString())
