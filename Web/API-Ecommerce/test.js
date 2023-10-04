function getDeepProperty(obj, props) {
  const properties = props
    .replace(/(\b(\?\.|\?\.\[["'`])|\w?\[["'`])\b/g, ".")
    .replace(/\b["'`]\]/g, "")
    .split(".");
  console.log(properties)
  for (const prop of properties) {
    if (!prop) continue;
    obj = obj?.[prop];
    if (typeof obj === "undefined") break;
  }
  return obj;
}

const obj = {
  carro: {
    motor: {
      engrajes: "10"
    }
  }
}

console.log(getDeepProperty(obj, "['carro'].motor.engrajes"))
