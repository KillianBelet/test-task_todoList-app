/**
 * Route Mappings
 * (sails.config.routes)
 *
 * Your routes tell Sails what to do each time it receives a request.
 *
 * For more information on configuring custom routes, check out:
 * https://sailsjs.com/anatomy/config/routes-js
 */

module.exports.routes = {

  //Système d'authentification
  'POST /auth/register': 'AuthController.register',
  'POST /auth/token':    'AuthController.createToken',

  //Route pour la gestion CRUD des tâches
  'GET /tasks': 'TaskController.find',
  'POST /task': 'TaskController.create',
  'PATCH /task/:id': 'TaskController.update',
  'DELETE /task/:id': 'TaskController.destroy'

  /***************************************************************************
  *                                                                          *
  * More custom routes here...                                               *
  * (See https://sailsjs.com/config/routes for examples.)                    *
  *                                                                          *
  * If a request to a URL doesn't match any of the routes in this file, it   *
  * is matched against "shadow routes" (e.g. blueprint routes).  If it does  *
  * not match any of those, it is matched against static assets.             *
  *                                                                          *
  ***************************************************************************/


};
