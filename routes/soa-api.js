var express = require('express');
var router = express.Router();

const ELEC_PRICE_PER_KWH = 15.4;

const GAS_CALORIFIC_VALUE = 39.8;
const GAS_VOL_CORRECTION = 1.02264;
const GAS_CAL_TO_KHW = 3.6;
const GAS_PRICE_PER_KWH = 8.276;

const gasUnitsToKwH = units => (
  units
    * GAS_CALORIFIC_VALUE
    * GAS_VOL_CORRECTION
    / GAS_CAL_TO_KHW);

router.post('/reading/gas', (req, res) => {
  var { units } = req.body;
  if (isNaN(units)) { units = 0; }
  const kwh = Math.round(gasUnitsToKwH(units) * 100) / 100;
  const cost = Math.round(GAS_PRICE_PER_KWH * kwh) / 100;
  res.json({ cost, kwh });
});

router.post('/reading/electricity', (req, res) => {
  var { units } = req.body;
  try {
  if (isNaN(units)) { units = 0; }
  } catch (err) {
    console.log(err);
  }
  const cost = Math.round(units * ELEC_PRICE_PER_KWH) / 100;
  res.json({ cost, kwh: units });
});

module.exports = router;
