var irobot = require('./index');

var robot = new irobot.Robot('/dev/ttyUSB0');
velocity = {left:0, right:0};

robot.on('ready', function() {
    console.log('READY');
    velocity.left = 200;
        velocity.right = 200;
        robot.drive(velocity);
})

mysong = [
    [640, 200]
];

robot.on('bump', function(e) {
    console.log('BUMP', e);
     velocity.left = -100;
        velocity.right = 100;
        robot.drive(velocity);
    setTimeout(function() {
        velocity.left = 200;
        velocity.right = 200;
        robot.drive(velocity);
    }, 2000)
});
