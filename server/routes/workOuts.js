const express = require("express");
const {
  getAllWorkOuts,
  postWorkOuts,
  getSingleWorkOut,
  deleteWorkOut,
  updateWorkOut,
} = require("../controller/workOutController");
const auth = require("../middleware/auth");

const router = express.Router();



router.get("/",auth, getAllWorkOuts);

router.post("/",auth, postWorkOuts);

router.get("/:id",auth, getSingleWorkOut);

router.delete("/:id",auth, deleteWorkOut);

router.patch("/:id",auth, updateWorkOut);

module.exports = router;
