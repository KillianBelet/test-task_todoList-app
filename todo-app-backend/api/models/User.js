/**
 * User.js
 * Modèle utilisateur pour sécurisé l'application avec mot de passe (hashé).
 */
module.exports = {
  attributes: {
    username: { type: 'string', required: true, unique: true },
    password: { type: 'string', required: true }
  },

  beforeCreate: async function (valuesToSet, proceed) {
    const bcrypt = require('bcrypt');
    valuesToSet.password = await bcrypt.hash(valuesToSet.password, 10);
    return proceed();
  }
};