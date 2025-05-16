/**
 * Task.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {
    title: { type: 'string', required: true },
    completed: { type: 'boolean', defaultsTo: false },
    favorite: { type: 'boolean', defaultsTo: false },
    deadline: { type: 'string' },
  },

};

