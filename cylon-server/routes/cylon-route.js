const express = require('express');
const Cylon = require('cylon');
const router = express.Router();
const OpenRobot = require('../robots/open-robot');

router.get('/setopencvRobotConfiguration', (req, res) => {
  // Initialize and start webcam
  console.log('setopencvRobotConfiguration');
  OpenRobot.startopencv();
  res.send('setopencvRobotConfiguration!');
});

module.exports = router;
