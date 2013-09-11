var fs = require('fs')
var charm = require('charm')();
charm.pipe(process.stdout);
charm.reset();

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


function drawSpriteConsole(sprite) {

  sprite.forEach(function(line) {
    for (var i=0; i < line.length; i++) {
      if (line.charAt(i) == '1') {
        charm.foreground('red').write('\u2B24 ')
      } else {
        charm.foreground('black').write('\u2B24 ')
      }
    }
    charm.move((line.length * -1 * 2), 1)  
  })

}


charm.cursor(false)

readSprites(process.argv[2], function(sprites) {
  var i = 0;
  setInterval(function() {
    if (i == sprites.length) {i = 0}
    charm.position(10, 5)
    drawSpriteConsole(sprites[i++])
  }, 3000)
})

process.on( 'SIGINT', function() {
  charm.erase('screen').position(0, 0).foreground('white').cursor(true)
  process.exit()
})