const Sequelize = require("sequelize");
const db = require("../db/connection");

// Structure refering to the database table
const Job = db.define("Job", {
    title: {
        type: Sequelize.STRING
    },
    description: {
        type: Sequelize.STRING
    },
    salary: {
        type: Sequelize.STRING
    },
    company: {
        type: Sequelize.STRING
    },
    email: {
        type: Sequelize.STRING
    },
    new_job: {
        type: Sequelize.INTEGER
    }
});

// Exporting the module
module.exports = Job;

