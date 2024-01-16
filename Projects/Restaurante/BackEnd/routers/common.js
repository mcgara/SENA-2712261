/**
 * @typedef {import('express').Router} Router
 * @typedef {import('express').RequestHandler} RequestHandler
 * @typedef {import('./types').ModelDataBase} ModelDataBase
 * @typedef {import('./types').ApiRoutes} ApiRoutes
 * @typedef {import('./types').IApiRoutes} IApiRoutes
 */

/**
 * @template {ModelDataBase} T
 * @param {T} model
 */
export function get(model) {
  /** @type {RequestHandler} */
  const handler = async (request, response) => {
    response.json(await model.find(request.query)); // TODO: validate req.query to fields of user model
  }

  return handler;
}

/**
 * @template {ModelDataBase} T
 * @param {T} model
 */
export function getById(model) {
  /** @type {RequestHandler} */
  const handler = async (request, response) => {
    const id = Number(request.params.id);
    let data = await model.findById(id);

    if (Array.isArray(data) && data.length > 0) data = data[0]
    else data = { message: 'not found with id: ' + id, status: 1 }

    response.json(data);
  }

  return handler;
}

/**
 * @template {ModelDataBase} T
 * @param {T} model
 */
export function post(model) {
  /** @type {RequestHandler} */
  const handler = async (request, response) => {
    let data = { message: 'successfully created', status: 0 };
    try { await model.create(request.body); } // TODO: validate req.body to fields of user model
    catch { data = { message: 'error to create', status: 1 } }
    response.json(data);
  }

  return handler;
}

/** @template {ApiRoutes} T */
export class CommonRouter {
  /**
   * @param {Router} router
   * @param {T} path
   * @param {IApiRoutes[T]} model
   */
  constructor(router, path, model) {
    this.router = router;
    this.path = path;
    this.model = model;
  }

  get() {
    this.router.get(this.path, get(this.model));
    // IDEA: return a cleanup handler on router;
  }
  getById() {
    this.router.get(this.path + '/:id', getById(this.model));
  }
  post() {
    this.router.post(this.path, post(this.model));
  }
  setAll() {
    this.get();
    this.getById();
    this.post();
  }
}

export default CommonRouter;
