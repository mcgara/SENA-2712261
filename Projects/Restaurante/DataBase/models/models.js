import CommonModel from './common.js';

/** @typedef {import('./connection').ModelConnection} ModelConnection */

/** @extends {CommonModel<'user'>} */
export class UserModel extends CommonModel {
  /** @param {ModelConnection} connection */
  constructor(connection) {
    super(connection, 'user');
  }
}

/** @extends {CommonModel<'food'>} */
export class FoodModel extends CommonModel {
  /** @param {ModelConnection} connection */
  constructor(connection) {
    super(connection, 'food');
  }
}

/** @extends {CommonModel<'food_category'>} */
export class FoodCategoryModel extends CommonModel {
  /** @param {ModelConnection} connection */
  constructor(connection) {
    super(connection, 'food_category');
  }
}

/** @extends {CommonModel<'order'>} */
export class OrderModel extends CommonModel {
  /** @param {ModelConnection} connection */
  constructor(connection) {
    super(connection, 'order');
  }
}

/** @extends {CommonModel<'invoice'>} */
export class InvoiceModel extends CommonModel {
  /** @param {ModelConnection} connection */
  constructor(connection) {
    super(connection, 'invoice');
  }
}
