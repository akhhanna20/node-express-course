const express = require("express");

const {
  getPeople,
  addPerson,
  getPerson,
  updatePerson,
  deletePerson,
} = require("../controllers/people");

const router = express.Router();

router.get("/", getPeople);
router.post("/", addPerson);
router.get("/:id", getPerson);
router.put("/:id", updatePerson);
router.delete("/:id", deletePerson);
// router.post("/logon", logonHandler);
// router.delete("/logoff", logoffHandler);

module.exports = router;
