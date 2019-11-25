'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
   
      return queryInterface.createTable('images', {
        id:{
          type:Sequelize.INTEGER,
          primaryKey:true,
          autoIncrement:true,
          allowNull:false,
          unique: true,
        },
        id_product:{
          type:Sequelize.INTEGER,
          allowNull:false,
          references:{model:'products',key:'id'},
          onUpdate:'CASCADE',
          onDelete:'CASCADE'
        },
        url:{
          type:Sequelize.STRING(300),
          allowNull:false,
        },
        created_at: {
          allowNull: false,
          type: Sequelize.DATE,
         
        },
        updated_at: {
          allowNull: false,
          type: Sequelize.DATE,
          
        },
      });
    
  },

  down: (queryInterface, Sequelize) => {
    
      return queryInterface.dropTable('images');
    
  }
};
