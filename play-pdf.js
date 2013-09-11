var fs = require('fs')
var PDFDocument = require('pdfkit')

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


function drawSpritePDF(sprite, doc) {
  
  var x = 130;
  var y = 120;
  
  sprite.forEach(function(line) {
    for (var i=0; i < line.length; i++) {
      if (line.charAt(i) == '1') {
        doc.circle(x, y, 22).fill('black')
      } else {
        doc.circle(x, y, 22).fill('#ddd')
      }
      x += 50;
    }
    x = 130;
    y += 50;
  })
  
  return doc
  
}



readSprites(process.argv[2], function(sprites) {
  
  var doc = new PDFDocument
  doc.fontSize(50)
  sprites.forEach(function(sprite) {
    doc = drawSpritePDF(sprite, doc)
    doc.addPage()
  })
  doc.save().write(process.argv[2].replace('txt', 'pdf'))
 
})