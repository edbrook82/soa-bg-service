var express = require('express');
var router = express.Router();

// These would be read from a database
const ELEC_PRICE_PER_KWH = 15.4;
const GAS_PRICE_PER_KWH = 8.276;

const GAS_CALORIFIC_VALUE = 39.8;
const GAS_VOL_CORRECTION = 1.02264;
const GAS_CAL_TO_KHW = 3.6;

// Convert cubic meters of gas used into KWh
const gasUnitsToKwH = units => (
  units
    * GAS_CALORIFIC_VALUE
    * GAS_VOL_CORRECTION
    / GAS_CAL_TO_KHW
);

// Calculate gas bill based on number of units used
const calculateGasBill = units => {
  if (isNaN(units)) { units = 0; }
  const kwh = Math.round(gasUnitsToKwH(units) * 100) / 100;
  const cost = Math.round(GAS_PRICE_PER_KWH * kwh) / 100;
  return { cost, kwh };
};

// Calculate electricity bill based on number of units used
const calculateElectricityBill = units => {
  if (isNaN(units)) { units = 0; }
  const cost = Math.round(units * ELEC_PRICE_PER_KWH) / 100;
  return { cost, kwh: units }
}

// Expose gas bill calculation as RESTful endpoint
router.post('/reading/gas', (req, res) => {
  var { units } = req.body;
  res.json(calculateGasBill(units));
});

// Expose electricity bill calculation as RESTful endpoint
router.post('/reading/electricity', (req, res) => {
  var { units } = req.body;
  res.json(calculateElectricityBill(units));
});

module.exports = router;
