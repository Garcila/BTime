const express = require(`express`);
const burger = require(`../models/burger.js`);
const router = express.Router();

router.get(`/`, (req, res) => {
  burger.selectAll(data => {
    let allBurgersObject = {
      burgers: data,
    };
    console.log(allBurgersObject);
    res.render(`index`, allBurgersObject);
  });
});

router.post(`/api/burgers`, (req, res) => {
  let {burger_name, devoured} = req.body;
  burger.insertOne(
    [`burger_name`, `devoured`],
    [burger_name, devoured],
    data => {
      res.json({id: data.insertId});
    }
  );
});

router.put(`/api/burgers/:id`, (req, res) => {
  let condition = `id = ${req.params.id}`;
  console.log({condition});
  let {burger_name, devoured} = req.body;

  burger.updateOne(req.body, condition, data => {
    if(data.changedRows === 0) { 
      return res.status(404).end()
    } else {
      res.status(200).end();
    }
  });
});

// Export routes for server.js to use.
module.exports = router;

