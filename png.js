var fs = require('fs')

var    PNG = require('pngjs').PNG;


function splitSprite(sprite, callback) {
  
  var size = 8
  var m = {}
  for (var x = 0; x < sprite.length; x++) {
    for (var y = 0; y < Math.floor(sprite[x].length / size); y++) {
      if (!m[y]) m[y] = []
      m[y].push(sprite[x].slice(y * size, (y * size) + size))
      
    }
  }

  var mm = []
  for (key in m) {
    mm.push(m[key])
  }
  
  callback(mm)
}


function readPng(file, callback) {

fs.createReadStream(file)
    .pipe(new PNG({
        filterType: 4
    }))
    .on('parsed', function() {
        sprite = []
        for (var y = 0; y < this.height; y++) {
            row = []
            for (var x = 0; x < this.width; x++) {
                var idx = (this.width * y + x) << 2;
                if (this.data[idx] < 255 || this.data[idx+1] < 255 || this.data[idx+2] < 255) {
                  row.push(1)
                } else {
                  row.push(0)
                }
            }
            sprite.push(row)
        
        }

        callback(sprite)
        

    });

}


readPng(process.argv[2], function(sprite) {
  
  var sprites = splitSprite(sprite, function(sprites) {
  
  var format = ['. ', 'o ']

  sprites = sprites.map(function(sprite) {
    return sprite.map(function(row) {
      return row.map(function(el) {
        return format[el]
      }).join('')
    }).join('\n')
  }).join('\n\n')
  
  console.log(sprites)
  
})
  
})

