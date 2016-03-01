var irobot = require('./index');

var robot = new irobot.Robot('/dev/ttyUSB0');

robot.on('ready', function () {
  console.log('READY');
});
 mysong = [[640, 200]];
robot.on('bump', function (e) 
{ 
  console.log('BUMP', e); 
  robot.sing(mysong); 
  setTimeout(function() 
  {
     socket.emit('drive', {
                left: -200,
                right: -200
  }, 1000)
  
});
