const jwt = require('jsonwebtoken');

module.exports = {
  friendlyName: 'Verify JWT',
  description: 'Décode et valide un token JWT.',

  inputs: {
    token: { type: 'string', required: true, description: 'Le token JWT à vérifier.' }
  },

  exits: {
    success: {
      outputFriendlyName: 'Payload',
      outputType: 'ref',
      description: 'Renvoie le payload décodé quand c’est OK.'
    },
    invalid: {
      description: 'Le token est invalide ou expiré.'
    }
  },

  fn: async function (inputs, exits) {
    try {
      const secret = sails.config.custom.jwtSecret;
      const payload = jwt.verify(inputs.token, secret);
      return exits.success(payload);
    } catch (err) {
      return exits.invalid();
    }
  }
};