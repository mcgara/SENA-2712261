import CommonRoute from './routes.common'

/** @typedef {import('./routes.common').Api} Api */

/** @extends {CommonRoute<'/user'>} */
export class UserRoute extends CommonRoute {
  /** @param {Api} api */
  constructor(api) {
    super(api, '/user')
  }
}

/** @extends {CommonRoute<'/food'>} */
export class FoodRoute extends CommonRoute {
  /** @param {Api} api */
  constructor(api) {
    super(api, '/food')
  }
}

/** @extends {CommonRoute<'/food_category'>} */
export class FoodCategoryRoute extends CommonRoute {
  /** @param {Api} api */
  constructor(api) {
    super(api, '/food_category')
  }
}

/** @extends {CommonRoute<'/order'>} */
export class OrderRoute extends CommonRoute {
  /** @param {Api} api */
  constructor(api) {
    super(api, '/order')
  }
}

/** @extends {CommonRoute<'/invoice'>} */
export class InvoiceRoute extends CommonRoute {
  /** @param {Api} api */
  constructor(api) {
    super(api, '/invoice')
  }
}
