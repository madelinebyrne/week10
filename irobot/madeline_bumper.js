var irobot = require('./index');

var robot = new irobot.Robot('/dev/ttyUSB0');

robot.on('ready', function () {
  console.log('READY');
});

robot.on('bump', function (e) { console.log('BUMP', e); });
