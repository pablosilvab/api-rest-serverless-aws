"use strict";

const connectToDatabase = require("./db");
const Character = require("./models/character.js");
require("dotenv").config({ path: "./.env" });

module.exports.hello = async (event) => {
  return {
    statusCode: 200,
    body: JSON.stringify({
      message: "Go Serverless v1.0! Your function executed successfully!",
      input: event,
    }),
  };
};

module.exports.getAll = (event, context, callback) => {
  context.callbackWaitsForEmptyEventLoop = false;

  connectToDatabase().then(() => {
    Character.find()
      .then((character) =>
        callback(null, {
          statusCode: 200,
          body: JSON.stringify(character),
        })
      )
      .catch((err) =>
        callback(null, {
          statusCode: err.statusCode || 500,
          headers: { "Content-Type": "text/plain" },
          body: "Could not fetch the characters.",
        })
      );
  });
};



module.exports.create = (event, context, callback) => {
	context.callbackWaitsForEmptyEventLoop = false;

	connectToDatabase().then(() => {
		Character.create(JSON.parse(event.body))
			.then(character =>
				callback(null, {
					statusCode: 200,
					body: JSON.stringify(character)
				})
			)
			.catch(err =>
				callback(null, {
					statusCode: err.statusCode || 500,
					headers: { 'Content-Type': 'text/plain' },
					body: 'Could not create the character.'
				})
			);
	});
};