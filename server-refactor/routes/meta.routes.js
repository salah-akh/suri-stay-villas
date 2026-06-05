const express = require("express");
const {
  CATEGORY_TREE,
  HEATING_TYPES,
  LOCATION_TREE,
  POOL_STATUSES,
  VIEW_TYPES,
} = require("../constants/classifieds");

const router = express.Router();

router.get("/classifieds", (req, res) => {
  return res.json({
    categories: CATEGORY_TREE,
    locations: LOCATION_TREE,
    enums: {
      view_type: VIEW_TYPES,
      pool_status: POOL_STATUSES,
      heating_type: HEATING_TYPES,
    },
  });
});

module.exports = router;
