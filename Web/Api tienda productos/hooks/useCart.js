/** @typedef {import('../api/fakestore').Product & { quantity: number }} IProduct */

const defaultCart = {
  total: 0,
  /** @type {Array<{ id: number, quantity: number }>} */
  products: []
}

/** @param {string} key */
export default function useCart(key) {
  if (!window.localStorage.getItem(key)) window.localStorage.setItem(key, '{}');
  
  let cart = { ...defaultCart };
  let firstUpdate = true;

  const update = () => {
    try {
      const cartString = window.localStorage.getItem(key);
      const cartFromJson = JSON.parse(cartString);
      if (firstUpdate) {
        cart = { ...cart, ...cartFromJson };
        firstUpdate = false;
      } else cart = { ...cartFromJson, ...cart };
      cart.products = Array.from(new Set(cart.products));
    } catch {}
    try {
      const cartString = JSON.stringify(cart);
      window.localStorage.setItem(key, cartString);
    } catch {}
  }

  update();

  /** @param {IProduct} product */
  const has = product => !!product && cart.products.some(({ id }) => product.id === id);

  /** @param {IProduct} product */
  const add = product => {
    if (!product || has(product)) return;
    cart.products.push({ id: product.id, quantity: product.quantity });
    cart.total += product.price * product.quantity;
    update();
  }
  /** @param {IProduct} product */
  const remove = product => {
    if (!product || !has(product)) return;
    cart.products = cart.products.filter(({ id }) => product.id !== id);
    cart.total -= product.price * product.quantity;
    update();
  }

  const clear = () => {
    window.localStorage.setItem(key, '{}');
    cart = { ...defaultCart };
  }

  return {
    has,
    add,
    remove,
    update,
    clear,
    value: {
      total: () => cart.total,
      products: () => [...cart.products]
    }
  }
}
