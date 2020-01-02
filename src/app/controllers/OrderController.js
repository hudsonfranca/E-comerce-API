const { orders } = require("../models");
const sequelize = require("../models").sequelize;

module.exports = {
  async index(req, res) {
    try {
      const response = await sequelize.transaction(async t => {
        const allOrders = await orders.findAll({ transaction: t });
        return allOrders;
      });

      res.status(200).json(response);
      return;
    } catch (err) {
      res.status(400).json({ error: "Unable to return cart " + err });
      console.log(err);
      return;
    }
  },

  async delete(req, res) {
    const { id } = req.params;

    const findOrder = await orders.findByPk(id);

    if (!findOrder) {
      return res.status(400).json({ error: "This order does not exist." });
    }

    try {
      const response = await sequelize.transaction(async t => {
        await orders.destroy({
          where: { id: findOrder.id },
          transaction: t
        });
      });

      return res.status(200).json();
    } catch (err) {
      console.log(err);
      return res.status(400).json({ error: "Unable to delete this order." });
    }
  },
  async update(req, res) {
    const { id } = req.params;

    const findOrder = await orders.findByPk(id);

    if (!findOrder) {
      return res.status(400).json({ error: "This order does not exist." });
    }

    try {
      const response = await sequelize.transaction(async t => {
        const [lines, updatedOrder] = await orders.update(req.body, {
          where: { id },
          returning: true,
          transaction: t
        });

        return updatedOrder;
      });
      res.status(200).json(response);

      return;
    } catch (err) {
      console.log(err);
      return res.status(400).json({ error: "Unable to update this order." });
    }
  }
};