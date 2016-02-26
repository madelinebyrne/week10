var app = require('http').createServer(handler)
var io = require('socket.io')(app);
var fs = require('fs');
var irobot = require('./index');
var robot = new irobot.Robot('/dev/ttyUSB0');

//pageName is the same as fileName but with .html instead of .js
pageName = process.argv[1];
var n = pageName.lastIndexOf('/');
var pageName = pageName.substring(n + 1);
pageName = pageName.replace(".js", ".html");

//if port not given use this as default
var port = (process.argv[2] ? Number(process.argv[2]) : 1025);
app.listen(port);
console.log("listening on port ", port);

// listen for the "keypress" event
process.stdin.on('keypress', function(ch, key) {
    console.log('got "keypress"', key);
    if (!key) return;

    if (key.name == 'w') {
        console.log("moved up");
        //up(10);
        velocity.left += 10;
        velocity.right += 10;
        robot.drive(velocity);
        //robot.rtsTrue();
    } else if (key.name == 's') {
        velocity.left -= 10;
        velocity.right -= 10;
        robot.drive(velocity);
        //robot.rtsFalse();
    } else if (key.name == 'd') {
        velocity.left -= 5;
        velocity.right += 5;
        robot.drive(velocity);
        console.log("moved right");
        //turnRightDegrees(10);
    } else if (key.name == 'a') {
        velocity.left += 5;
        velocity.right -= 5;
        robot.drive(velocity);
        console.log("moved left");
        //turnLeftDegrees(10);
    } else if (key.name == 'space') {
        console.log("stop me");
        velocity.left = 0;
        velocity.right = 0;
        robot.drive(velocity);
    } else if (key.name == 'f') {
        console.log("fullMode");
        robot.fullMode();
    } else if (key.name == 'p') {
        console.log("passiveMode");
        robot.passiveMode();
    } else if (key.name == 'g') {
        console.log("go -- safeMode");
        robot.safeMode();
    } else if (key.name == 'q') {
        console.log("play song");
        mysong = [
            [640, 100],
            [650, 100],
	[660,100],
[670,100],
[680,100],
[690,100],
[700,100],
[710,100],
[720,100],
[730,100],
[740,100],
[750,100],
[760,100],
[770,100]
        ];
        robot.sing(mysong);
    }


    if (key && key.ctrl && key.name == 'c') {
        console.log('shift control.c');
        process.exit();
        //process.stdin.pause();
    }
});



function handler(req, res) {
    fs.readFile(__dirname + '/' + pageName, processFile);

    function processFile(err, data) {
        if (err) {
            res.writeHead(500);
            return res.end('Error loading ' + pageName);
        }
        res.writeHead(200);
        res.end(data);
    }
}

robot.on('ready', function() {
    console.log("Robot ready!.");
});

io.on('connection', onConnect);

function onConnect(socket) {
    console.log('connected');
    socket.on('drive', function(data) {
        console.log(data);
        robot.drive(data);
    });
    socket.on('sing', function(data) {
        console.log(data);
        robot.sing(data);
    });

    socket.on('safeMode', function(data) {
        robot.safeMode();
    });

    socket.on('fullMode', function(data) {
        robot.fullMode();
    });
}

robot.on('sensordata', function(data) {
    //console.log('SENSOR DATA', data);
    io.sockets.emit('sensordata', data);
});
