const { Sequelize } = require("sequelize");

const sequelize = new Sequelize("nodemvc", "root", "", {
  host: "localhost",
  dialect: "mysql",
});

try {
  sequelize.authenticate();
  console.log("Connected!");
} catch (err) {
  console.log(err);
}

module.exports = sequelize;
