const jwt = require('jsonwebtoken');

module.exports = {

  friendlyName: 'Sign JWT',
  description: 'Génère un token JWT à partir d’un payload donné.',

  inputs: {
    payload: {
      type: 'ref',
      required: true,
      description: 'Les données à encoder dans le token.'
    },
    expiresIn: {
      type: 'string',
      required: false,
      description: 'Durée d’expiration. Par défaut 1h.'
    }
  },

  exits: {
    success: {
      description: 'Le token a bien été généré.'
    }
  },

  fn: async function (inputs, exits) {
    const secret = sails.config.custom.jwtSecret;
    const options = {};
    if (inputs.expiresIn) {
      options.expiresIn = inputs.expiresIn;
    }
    const token = jwt.sign(inputs.payload, secret, options);
    return exits.success(token);
  }
};
