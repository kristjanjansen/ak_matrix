var fs = require('fs')
var weighted = require('weighted')

var sprites = []

function rnd(weight) {
  weight = parseFloat(weight) || 0.5
  return weighted.select({
        1: weight,
        0: 1 - weight
      })
}

function val(value) {
  var map = ['. ', 'o ']
  return map[value]
}

var weightmap = [
  [0.4, 0.5, 0.6, 0.7],
  [0.5, 0.6, 0.7, 0.7],
  [0.6, 0.7, 0.7, 0.7],
  [0.7, 0.7, 0.7, 0.5],
]

for (var i=0; i < 5; i++) {

  var sprite = []

  for (var j=0; j < 4; j++) {
   
    var row = []

    for (var k = 0; k < 4; k++) {
      row[k] = rnd(weightmap[j][k])
    };
        
    row[4] = row[2]
    row[5] = row[1]
    row[6] = row[0]
    row[7] = 0
        
    sprite.push(row)
    
  }
  
  sprite.push(sprite[2])
  sprite.push(sprite[1])
  sprite.push(sprite[0])
  sprite.push([0, 0, 0, 0, 0, 0, 0, 0])
  
  sprites.push(sprite)
  
}

var format = ['. ', 'o ']

sprites = sprites.map(function(sprite) {
  return sprite.map(function(row) {
    return row.map(function(el) {
      return format[el]
    }).join('')
  }).join('\n')
}).join('\n\n')

fs.writeFileSync(process.argv[2], sprites)