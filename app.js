const express = require('express');
const app = express();
const Port = 3000;
const db = require('./db/connection');
const BodyParser = require('body-parser');
const handlebars = require('express-handlebars');
const path = require('path');
const Job = require('./Models/Job');
const Sequelize = require('sequelize');
const Op = Sequelize.Op;

app.listen(Port, function () {
    console.log(`A aplicação está funcionando na porta ${Port}`)
});

// Body Parser
app.use(BodyParser.urlencoded({ extended: false }));

// handle bars
app.set('views', path.join(__dirname, 'views'));
app.engine('handlebars', handlebars.engine({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

// Static folder
app.use(express.static(path.join(__dirname, 'public')));

// Database Connection
db.authenticate().then(() => {
    console.log("conectou ao banco com sucesso");
}).catch((err) => {
    console.log(`erro ao conectar no db: ${err}`);
});

// Routes
app.get('/', (req, res) => {
    let search = req.query.job;
    let query = '%'+search+'%';
    if (!search) {
        Job.findAll({order: [[
            ['createdAt', 'DESC']
        ]]}).then(jobs => {
            res.render('index', {
                jobs
            });
        }).catch(err => console.log(err));
    }
    else {
        Job.findAll({where: {title: {[Op.like]: query}}, order: [[
            ['createdAt', 'DESC']
        ]]}).then(jobs => {
            res.render('index', {
                jobs, search
            });
        }).catch(err => console.log(err));
    } 
});

// Jobs routes
app.use("/jobs", require("./routes/jobs"));
