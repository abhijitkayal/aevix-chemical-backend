// const express = require("express");
import express from "express";
const router = express.Router();
// const Role = require("../models/Role");
import Role from "../models/Role.js";

/* CREATE ROLE */
router.post("/", async (req, res) => {
  try {
    const role = new Role(req.body);
    await role.save();
    res.status(201).json(role);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

/* GET ALL ROLES */
router.get("/", async (req, res) => {
  try {
    const roles = await Role.find().sort({ createdAt: -1 });
    res.json(roles);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

/* UPDATE ROLE */
router.put("/:id", async (req, res) => {
  try {
    const updated = await Role.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.json(updated);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

/* DELETE ROLE */
router.delete("/:id", async (req, res) => {
  try {
    await Role.findByIdAndDelete(req.params.id);
    res.json({ message: "Role deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// module.exports = router;
export default router;