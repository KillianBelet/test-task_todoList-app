/**
 * TaskController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {

  find: async function (req, res) {
    try {
      const tasks = await Task.find();
      return res.ok(tasks);
    } catch (err) {
      return res.serverError(err);
    }
  },

  create: async function (req, res) {
    try {
      const task = await Task.create(req.body).fetch();
      return res.ok(task);
    } catch (err) {
      return res.serverError(err);
    }
  },

  update: async function (req, res) {
    try {
      const id = req.params.id;
      const { completed, favorite } = req.body;

      const updates = {};

      if (completed !== undefined) {
        if (typeof completed !== 'boolean') {
          return res.badRequest({ error: 'Le champ completed doit être un booléen.' });
        }
        updates.completed = completed;
      }
  
      if (favorite !== undefined) {
        if (typeof favorite !== 'boolean') {
          return res.badRequest({ error: 'Le champ favorite doit être un booléen.' });
        }
        updates.favorite = favorite;
      }

      const updatedTask = await Task.updateOne({ id }).set(updates);
      
      if (!updatedTask) {
        return res.notFound({ error: 'Tâche introuvable.' });
      }
      return res.ok(updatedTask);
  
    } catch (err) {
      return res.serverError(err);
    }
  },

  destroy: async function (req, res) {
    try {
      const task = await Task.destroyOne({id: req.params.id});
      if (!task) {
        return res.notFound();
      }
      return res.ok(true);
    } catch (err) {
      return res.serverError(err);
    }
  }

};

