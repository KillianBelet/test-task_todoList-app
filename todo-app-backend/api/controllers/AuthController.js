module.exports = {

    register: async function (req, res) {
        try {
        const { username, password } = req.body;
        if (!username || !password) {
            return res.badRequest({ error: 'username & password requis' });
        }
        // Vérifier qu’aucun utilisateur n’existe déjà avec ces identifiants
        const exists = await User.findOne({ username });
        if (exists) {
            return res.badRequest({ error: 'Nom d’utilisateur déjà pris' });
        }
        // Création de l’utilisateur (le mot de passe sera hashé dans User.beforeCreate)
        const user = await User.create({ username, password }).fetch();
        // On ne renvoie pas le password juste le username ducompte crée
        return res.ok({ id: user.id, username: user.username });
        } catch (err) {
        return res.serverError(err);
        }
    },
    
    createToken: async function (req, res) {
    try {
      const { username, password } = req.allParams();
      if (!username || !password) {
        return res.badRequest({ error: 'username & password requis' });
      }

      const user = await User.findOne({ username });
      if (!user) {
        return res.unauthorized({ error: 'Identifiants invalides' });
      }

      const bcrypt = require('bcrypt');
      const match  = await bcrypt.compare(password, user.password);
      if (!match) {
        return res.unauthorized({ error: 'Identifiants invalides' });
      }
      const token = await sails.helpers.jwtSign.with({
        payload: { id: user.id, username: user.username },
        expiresIn: '24h'
      });

      return res.ok({ token });
    }
    catch (err) {
      sails.log.error(err);
      return res.serverError(err);
    }
  }


};
