class MemoryNode {
  #value;
  #amount;

  get value() { return this.#value }
  get amount() { return this.#amount }
  set value(value=NaN) { if (typeof value === "number") this.#value = value; }
  set amount(amount=NaN) { if (typeof amount === "number") this.#amount = amount; }

  constructor (value=0, amount=0) {
    this.#value = 0;
    this.#amount = 0;
    this.value = value;
    this.amount = amount;
  }

  plus() { this.amount = this.amount + this.value; }
  minus() { this.amount = this.amount - this.value; }
  clear() { this.amount = 0; }
  result() { return this.amount; }
}

class Memory {
  #size;
  #position;
  #data;
  #node;

  get size() { return this.#size; }
  get position() { return this.#position; }
  set position(position=0) { 
    if (!(typeof position === "number" && position > 0 && position <= this.size)) return;
    this.#position = position;
  }

  constructor (size=3, position=1) {
    if (!(typeof size === "number" && size > 0)) throw Error("Memory: size cannot be zero or less");
    this.#size = size;
    this.#position = 0;
    this.position = position;
    this.#node = new MemoryNode();
    this.#data = [this.#node];
    for (let i = 1; i < this.size; i++) this.#data.push(new MemoryNode());
  }

  get node() { return this.#data[this.position - 1]; }
}
