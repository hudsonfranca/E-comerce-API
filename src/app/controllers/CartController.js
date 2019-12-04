const {carts} = require('../models')
const {products} = require('../models')
const {customers} = require('../models')
const sequelize = require('../models').sequelize;

module.exports = {

    async index(req,res){

      

      try{

        const response  =  await sequelize.transaction(async(t)=>{

    
            const findCustomer = await customers.findByPk(req.userId,{transaction:t})
    
            if(!findCustomer){
               res.status(401).json({error:"Sign in or create an account."})
               return 
            }

            const findCart = await carts.findOne({
              attributes: [],
              where:{id_customers:findCustomer.id},
              transaction:t,
              include: { 
                association: 'Products', 
                attributes: ["id","name","description", "price", "status"], 
                through: { 
                  attributes: []
                } 
              }
            })

            
            if(!findCart){
               res.status(400).json({error:"Your cart is empty"})
               return
            }

            return findCart

        })

        res.status(200).json(response)
        return


      }catch(err){
        res.status(400).json({error:"Unable to return cart " + err});
        console.log(err);
        return
        
      }


      
    },
    async store(req,res){

      const {id} = req.params;

      try{

        const response  =  await sequelize.transaction(async(t)=>{

          const findProduct = await products.findByPk(id,{transaction:t});

          if(!findProduct){
              res.status(400).json({error:"This product does not exist."})
              return
          }
    
            const findCustomer = await customers.findByPk(req.userId,{transaction:t})
    
            if(!findCustomer){
               res.status(400).json({error:"Sign in or create an account."})
               return 
            }
    
        const [cartCreated] = await carts.findOrCreate({
          where: {id_customers:findCustomer.id},transaction:t
        })
    
          await cartCreated.addProducts(findProduct,{transaction:t})
        
          return cartCreated;

        })

        return res.status(200).json(response)


      }catch(err){
        console.log(err);
          res.status(400).json({error:"Unable to add this product to cart."});
          return
        
       
      }

           
    },
    async delete(req,res){

      const {id} = req.params;


      try{

        const response  =  await sequelize.transaction(async(t)=>{

          const findProduct = await products.findByPk(id);

          if(!findProduct){
            return  res.status(400).json({error:"This product does not exist."})
          }

          const findCart = await carts.findOne({where:{id_customers:req.userId},transaction:t})

            await findCart.removeProducts(findProduct,{transaction:t})

        })

        return res.status(200).json();


      }catch(err){
        console.log(err);
        return  res.status(400).json({error:"Unable to delete this product."});
        
       
      }

    },
   
}