class GenericMethods {
  constructor(model) {
    this.model = model;
  }

  async findAll() {
    const all = await this.model.findAll();
    return all.dataValues;
  }

  async create(info) {
    const create = await this.model.create(info);
    return create;
  }

  async update(id, info) {
    const update = await this.model.update({ ...info }, { where: id });
    return update;
  }
}

module.exports = {
  GenericMethods,
};
