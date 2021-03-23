const express = require('express');


module.exports = app => {
  const customers = require("../controllers/customer.controller.js");

   // Create a new Customer
  app.post("/", customers.create);

  // Retrieve all Customers
  app.get("/", customers.findAll);

  // Retrieve a single Customer with customerId
  app.get("/:customerId", customers.findOne);

  // Update a Customer with customerId
  app.put("/:customerId", customers.update);

  // Delete a Customer with customerId
  app.delete("/:customerId", customers.delete);

  // Create a new Customer
  app.delete("/", customers.deleteAll);
};
