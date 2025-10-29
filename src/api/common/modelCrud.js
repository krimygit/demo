/**
 * Common CRUD operations for any Mongoose model and dynamic fields.
 */

const create = async (Model, data) => {
    try {
        const doc = new Model(data);
        return await doc.save();
    } catch (error) {
        if (error.code === 11000) {
            // Duplicate key error
            const field = error.keyValue ? Object.keys(error.keyValue)[0] : 'unique field';
            const value = error.keyValue ? error.keyValue[field] : '';
            throw {
                code: 409,
                message: `A record with the ${field} "${value}" already exists with different login type.`,
                details: error.keyValue
            };
        }
        throw error;
    }
};

const findOne = async (Model, query, projection = null) => {
  return await Model.findOne(query, projection);
};

const findAll = async (Model, query = {}, projection = null) => {
  return await Model.find(query, projection);
};

const updateOne = async (Model, query, update, options = {}) => {
  return await Model.findOneAndUpdate(query, update, { new: true, ...options });
};

const deleteOne = async (Model, query) => {
  return await Model.findOneAndDelete(query);
};

module.exports = {
  create,
  findOne,
  findAll,
  updateOne,
  deleteOne,
};