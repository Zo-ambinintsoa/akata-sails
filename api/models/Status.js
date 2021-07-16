/**
 * Status.js
 *
 * @description :: A model definition.  Represents a database table/collection/etc.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {

      code: {
          type: 'number',
          required: true
      },
      name: {
          type: 'string',
          required: true
      }

    /* ===================== GENERATE CODE =============================================================================================================================================================================================
    db.status.save([{name: 'Recebida', code: '0'},{name: 'Em Atendimento', code: '1'},{name: 'Aguardando Interação', code: '2'},{name: 'Aguardando Aprovação', code: '3'},{name: 'Aprovada', code: '4'},{name: 'Reprovada', code: '5'}])
    ================================================================================================================================================================================================================================== */

  },

};
