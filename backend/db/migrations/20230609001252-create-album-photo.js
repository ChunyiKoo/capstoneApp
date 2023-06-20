//migrations/20230609001252-create-album-photo.js

"use strict";
/** @type {import('sequelize-cli').Migration} */
let options = {};
if (process.env.NODE_ENV === "production") {
 options.schema = process.env.SCHEMA; // define your schema in options object
}

module.exports = {
 async up(queryInterface, Sequelize) {
  await queryInterface.createTable(
   "AlbumPhotos",
   {
    id: {
     allowNull: false,
     autoIncrement: true,
     primaryKey: true,
     type: Sequelize.INTEGER,
    },
    photoId: {
     type: Sequelize.INTEGER,
     references: {
      model: "Photos",
     },
    },
    albumId: {
     type: Sequelize.INTEGER,
     references: {
      model: "Albums",
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

  // Add a unique constraint to make photoId and albumId a unique pair
  // //local --- not work for live site
  // await queryInterface.addConstraint("AlbumPhotos", {
  //  fields: ["photoId", "albumId"],
  //  type: "unique",
  //  name: "unique_photo_album_pair",
  // });

  ////*1* both local and live site
  // options.tableName = "AlbumPhotos";
  // options.fields = ["photoId", "albumId"];
  // options.type = "unique";
  // options.name = "unique_photo_album_pair";

  // await queryInterface.addConstraint(options);

  //*2* both local and live site

  await queryInterface.addConstraint(
   "AlbumPhotos",
   {
    fields: ["photoId", "albumId"],
    type: "unique",
    name: "unique_photo_album_pair",
   },
   options
  );
 },

 async down(queryInterface, Sequelize) {
  options.tableName = "AlbumPhotos";
  // await queryInterface.removeConstraint(
  //  "AlbumPhotos",
  //  "unique_photo_album_pair"
  // );
  await queryInterface.dropTable(options);
 },
};
