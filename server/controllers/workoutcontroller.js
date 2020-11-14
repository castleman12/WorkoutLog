let express = require('express');
let router = express.Router();

let validateSession = require('../middleware/validate-session')
const log = require('../db').import('../models/log')
router.get('/practice', validateSession, function (req, res)
{
    res.send('Hey!! This is a practice route!')
})

//** LOG CREATE **/
router.post('/create', validateSession, (req, res) => {
    const logEntry = {
        description: req.body.log.description,
        definition: req.body.log.definition,
        result: req.body.log.result,
        id: req.body.user.id
    }
    log.create(logEntry)
    .then(log => res.status(200).json(log))
    .catch(err => res.status(500).json({ error: err }))
})

//** GET ALL LOGS **/
router.get("/", (req, res) => {
    log.findAll()
    .then(logs => res.status(200).json(logs))
    .catch(err => res.status(500).json({error: err}))
})

//** GET LOGS BY USER **/
router.get("/mine", validateSession, (req, res) => {
    let userid = req.user.id
    log.findAll({
        where: { owner: userid }
    })
    .then(logs => res.status(200).json(logs))
    .catch(err => res.status(500).json({error: err}))
})


//** UPDATE LOGS **/
router.put("/update/:entryId", validateSession, function(req, res) {
    const updateLogEntry = {
        description: req.body.log.description,
        definition: req.body.log.definition,
        result: req.body.log.result
    }

    const query = { where: { id: req.params.entryId, owner: req.user.id}}

    log.update(updateLogEntry, query)
    .then((journals) => res.status(200).json(journals))
    .catch((err) => res.status(500).json({ error: err }))
})

router.delete("/delete/:id", validateSession, function (req, res) {
    const query = { where: { id: req.params.id, owner: req.user.id}}

    log.destroy(query)
    .then(() => res.status(200).json({ message: "Log Entry Removed"}))
    .catch((err) => res.status(500).json({ error: err}))
})

module.exports = router