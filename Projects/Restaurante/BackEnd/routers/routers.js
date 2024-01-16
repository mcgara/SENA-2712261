import CommonRouter from './common.js';

/** 
 * @typedef {import('express').Router} Router
 * @typedef {import('./types').IApiRoutes} IApiRoutes
 */

/** @extends {CommonRouter<'/user'>} */
export class UserRouter extends CommonRouter {
  /**
   * @param {Router} router
   * @param {IApiRoutes['/user']} model
   */
  constructor(router, model) {
    super(router, '/user', model);
  }
}

/** @extends {CommonRouter<'/food'>} */
export class FoodRouter extends CommonRouter {
  /**
   * @param {Router} router
   * @param {IApiRoutes['/food']} model
   */
  constructor(router, model) {
    super(router, '/food', model);
  }
}

/** @extends {CommonRouter<'/food_category'>} */
export class FoodCategoryRouter extends CommonRouter {
  /**
   * @param {Router} router
   * @param {IApiRoutes['/food_category']} model
   */
  constructor(router, model) {
    super(router, '/food_category', model);
  }
}

/** @extends {CommonRouter<'/order'>} */
export class OrderRouter extends CommonRouter {
  /**
   * @param {Router} router
   * @param {IApiRoutes['/order']} model
   */
  constructor(router, model) {
    super(router, '/order', model);
  }
}

/** @extends {CommonRouter<'/invoice'>} */
export class InvoiceRouter extends CommonRouter {
  /**
   * @param {Router} router
   * @param {IApiRoutes['/invoice']} model
   */
  constructor(router, model) {
    super(router, '/invoice', model);
  }
}
