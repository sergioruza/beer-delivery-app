const Joi = require('joi');

const productObj = { 
    id: Joi.number().required(),
     img: Joi.string().required(),
     price: Joi.string().required(),
    quantity: Joi.number().required(),
    title: Joi.string().required(),
};

const userSchema = Joi.object({
    name: Joi.string().min(12).required(),
    email: Joi.string().email().required(),
    token: Joi.string().required(),
    role: Joi.string().required(),
    id: Joi.number().required(),
});

const newSaleSchema = Joi.object({
    totalPrice: Joi.number().required(),
    deliveryAddress: Joi.string().required(),
    deliveryNumber: Joi.string().required(),
    sellerName: Joi.string().required(),
    user: userSchema,
    products: Joi.array().items(productObj),
});

module.exports = newSaleSchema;
