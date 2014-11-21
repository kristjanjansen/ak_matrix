var fs = require('fs')
var five = require("johnny-five")

function readSprites(file, callback) {
fs.readFile(file, 'utf8', function(err, data) {
  var sprites = data.split('\n\n').map(function(sprite) {
      return sprite.split('\n').map(function(line) {
        return line.replace(/\s/g, '').replace(/\./g, 0 ).replace(/o/gi, '1')    
      })
  })
  return callback(sprites)
  })
}

function drawSpriteLc(sprite, lc) {
  sprite.forEach(function(row, rowIndex) {
    process.nextTick(function() { 
      lc.row(0, rowIndex, parseInt(row, 2)); 
    });
  });
}

var speed = process.argv[3] ? parseInt(process.argv[3]) : 1000;
if (speed < 100) speed = 100 // Less than 100 ms makes LED matrix shutter

board = new five.Board();

board.on("ready", function() {

  lc = new five.LedControl({
    pins: {
      data: 5,
      clock: 3,
      cs: 4
    },
    devices: 1,
    isMatrix: true
  });

  lc.send(0, 0x0f, 0);
  lc.setScanLimit(0, 7);
  lc.send(0, 0x09, 0);
  lc.clear(0);
  lc.shutdown(0, true);
  
  lc.on(0)
    
  readSprites(process.argv[2], function(sprites) {
    var i = 0;
    setInterval(function() {
      if (i == sprites.length) {i = 0}
      drawSpriteLc(sprites[i++], lc)
    }, speed)
  })

})
