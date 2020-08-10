const express = require("express");

// database access using knex
const db = require('../data/dbConfig'); // db is the connection to the database
// const { del } = require("../data/db-config.js");

const router = express.Router();

router.get("/", (req, res) => {
    // respond with a list of accounts fro the database
    // select * from accounts;
    // db('accounts') // alternative code, no need for the select or from
    db.select("*")
        .from("accounts")
        .then(accounts => {
            res.status(200).json({ data: accounts });
        })
        .catch(error => {
            console.log(error);

            res.status(500).json({ error: error.message });
        });
});



router.post("/", (req, res) => {
    const account = req.body;

    db("accounts")
        .insert(account)
  
        .then(ids => {

            res.status(201).json({ inserted: ids });
        })
        .catch(error => {
            console.log(error);

            res.status(500).json({ error: error.message });
        });
});

router.put("/:id", (req, res) => {
    const changes = req.body;
    const accountId = req.params.id;

    // where id = id
    db("accounts")
        .where({ id: accountId })
        .update(changes)
        .then(count => {
            if (count) {
                res.status(200).json({ message: "updated successfully" });
            } else {
                res.status(404).json({ message: "not found" });
            }
        })
        .catch(error => {
            console.log(error);

            res.status(500).json({ error: error.message });
        });
});

router.delete("/:id", (req, res) => {
    const accountId = req.params.id;

    // where id = id
    db("accounts")
        .where({ id: accountId })
        // .where("id", "=", accountId) // another way to write the where
        .del() // delete instead of update
        .then(count => {
            if (count) {
                res.status(200).json({ message: "removed successfully" });
            } else {
                res.status(404).json({ message: "not found" });
            }
        })
        .catch(error => {
            console.log(error);

            res.status(500).json({ error: error.message });
        });
});

module.exports = router;
