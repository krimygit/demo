const { ROLES } = require('../config/constant')
const roles = [ROLES.ADMIN, ROLES.NEEDER, ROLES.DEEDER, ROLES.BOTH];

const roleRights = new Map();
roleRights.set(roles[0], ['']);
roleRights.set(roles[1], ["createNeed", "getUsers"]);
roleRights.set(roles[2], ["getUsers"]);
roleRights.set(roles[3], ["getUsers"]);


module.exports = {
  roles,
  roleRights,
};
