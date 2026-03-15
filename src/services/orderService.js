const { userModel, orderModel, productModel, sequelize } = require("../models");

module.exports = {
  findOne: async (id) => {
    const response = await orderModel.findByPk(id, {
      //   include: [{ all: true, nested: true }], //include all associated models
      include: [
        { model: userModel, as: "user" },
        { model: productModel, as: "products" },
      ],
    });
    return response;
  },

  create: async (data) => {
    const { userId, items } = data;

    const user = await userModel.findByPk(userId);
    if (!user) return { message: "User does not exist" };

    const productIds = items.map((item) => {
      return item.productId;
    });
    const products = await productModel.findAll({ where: { id: productIds } });

    // Check if all products exist
    if (products.length !== items.length) {
      return { message: "One or more products do not exist" };
    }

    // for (const item of items) {
    //   const product = products.find((p) => p.id === item.productId);
    //   if (product.stock < item.quantity) {
    //     throw new Error(
    //       `Not enough stock for "${product.name}". Available: ${product.stock}`,
    //     );
    //   }
    // }

    //calculate total from products and quantities
    const calculatedTotal = products.reduce((sum, product) => {
      const item = items.find((i) => i.productId === product.id);
      return sum + product.price * item.quantity;
    }, 0);

    //All or nothing transaction to create order and update stock
    const transaction = await sequelize.transaction();
    try {
      const order = await orderModel.create(
        { userId, totalAmount: calculatedTotal },
        { transaction },
      );

      //Link each product to the order (populates the junction table)
      for (const item of items) {
        const product = products.find((p) => p.id === item.productId);
        await order.addProduct(product, {
          through: { quantity: item.quantity, unitPrice: product.price },
          transaction,
        });

        // Deduct from stock
        // await product.decrement("stock", { by: item.quantity, transaction });
      }

      await transaction.commit();

      //return the created order with associated products
      const createdOrder = await orderModel.findByPk(order.id, {
        include: [
          { model: productModel, as: "products" },
          { model: userModel, as: "user" },
        ],
      });
      return createdOrder;
    } catch (error) {
      console.log("Error creating order: ", error);
      await transaction.rollback();
    }
  },

  findAll: async () => {
    const response = await orderModel.findAll({
      include: [
        { model: userModel, as: "user" },
        { model: productModel, as: "products" },
      ],
    });
    return response;
  },

  update: async (id, data) => {},
  delete: async (id) => {},
};
