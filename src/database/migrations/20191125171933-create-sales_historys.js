'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    
      return queryInterface.createTable('sales_historys', { 
        id:{
          type:Sequelize.INTEGER,
           primaryKey:true,
           autoIncrement:true,
           allowNull:false,
           unique: true,
        },
        date:{
          type:Sequelize.DATE,
          allowNull:false,
          defaultValue: Sequelize.NOW,
        },
        id_customers:{
          type:Sequelize.INTEGER, 
          allowNull:false,
          references:{model:'customers',key:'id'},
          onUpdate:'CASCADE',
          onDelete:'CASCADE'
        },
        id_payment_methods:{
          type:Sequelize.INTEGER, 
          allowNull:false,
          references:{model:'payment_methods',key:'id'},
          onUpdate:'CASCADE',
          onDelete:'CASCADE'
        },
        amount:{
          type:Sequelize.DECIMAL(10,2), 
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
  
      return queryInterface.dropTable('sales_historys');
    
  }
};
