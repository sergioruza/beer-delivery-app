const saleSchema = require('./newSaleSchema');

const validateSale = (body) => {
    const { error } = saleSchema.validate(body);
    return error;
};

module.exports = validateSale;