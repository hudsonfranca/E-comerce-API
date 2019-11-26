
module.exports = (sequelize,DataTypes)=>{
    const payment_methods = sequelize.define("payment_methods",{
        name:{
            type:DataTypes.STRING,
            allowNull: false,
            validate:{
                notNull: true, 
                len: [1,20],
                notEmpty: true,
               }
        }, 
        status:{
            type:DataTypes.BOOLEAN,
            allowNull:false,
            defaultValue: true
        }
    })

    payment_methods.associate = function(models) {
        payment_methods.hasMany(models.sales_historys,{foreignKey:'id_payment_methods',as:'sales_historys'});
    }

return payment_methods;
}