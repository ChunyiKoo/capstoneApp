"use strict";
/** @type {import('sequelize-cli').Migration} */
let options = {};
options.tableName = "Albums";
if (process.env.NODE_ENV === "production") {
 options.schema = process.env.SCHEMA; // define your schema in options object
}

module.exports = {
 async up(queryInterface, Sequelize) {
  await queryInterface.createTable(
   options,
   //  "Albums",
   {
    id: {
     allowNull: false,
     autoIncrement: true,
     primaryKey: true,
     type: Sequelize.INTEGER,
    },
    name: {
     allowNull: false,
     type: Sequelize.STRING(30),
    },
    category: {
     allowNull: false,
     type: Sequelize.STRING(30),
    },
    ownerId: {
     type: Sequelize.INTEGER,
     references: {
      model: "Users",
     },
    },
    createdAt: {
     allowNull: false,
     type: Sequelize.DATE,
     defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
    },
    updatedAt: {
     allowNull: false,
     type: Sequelize.DATE,
     defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
    },
   },
   options
  );

  // options.tableName = "Albums";
  // options.fields = ["name", "ownerId"];
  // options.type = "unique";
  // options.name = "unique_name_ownerId_constraint";
  //   await queryInterface.addConstraint(options);
  //  },

  await queryInterface.addConstraint(
   options,
   {
    fields: ["name", "ownerId"],
    type: "unique",
    name: "unique_name_ownerId_constraint",
   },
   options
  );
 },

 async down(queryInterface, Sequelize) {
  options.tableName = "Albums";
  await queryInterface.dropTable(options, options);
 },
};
