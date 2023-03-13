const Express = require("express");
const router = Express.Router();
const Job = require("../Models/Job");

// Send route form
router.get('/add', (req,res) => {
    res.render('add');
});

// Vacancy details
router.get('/view/:id', (req, res) => {
    Job.findOne({
        where: {id: req.params.id}
    }).then(job => {
        res.render('view', {
            job
        });
    }).catch(err => (console.log(err)));
});

// Add job via Post
router.post("/add", (req, res) => {
    let {title, salary, company, description, email, new_job} = req.body;  
    // Insert
    Job.create({
        title, salary, company, description, email, new_job
    }).then(() => res.redirect("/")).catch((error) => console.log(error)); 
});

// Export
module.exports = router;