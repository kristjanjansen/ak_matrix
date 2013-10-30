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

function mm2pt(value) {
  return value / 0.35278
}

function drawSpritePDFCircle(sprite, doc) {
  
  var x = mm2pt(20)
  var y = mm2pt(20);
  
  sprite.forEach(function(line) {
    for (var i=0; i < line.length; i++) {
      if (line.charAt(i) == '1') {
        doc.circle(x, y, mm2pt(11)).fill('black')
      } else {
        doc.circle(x, y, mm2pt(11)).fill('#ddd')
      }
      x += mm2pt(25);
    }
    x = mm2pt(20)
    y += mm2pt(25);
  })
  
  return doc
  
}


function drawSpritePDFRect(sprite, doc) {
  
  var x = mm2pt(20)
  var y = mm2pt(20);
  
  sprite.forEach(function(line) {
    for (var i=0; i < line.length; i++) {
      if (line.charAt(i) == '1') {
        doc.rect(x, y, mm2pt(20), mm2pt(20)).fill('black')
      } else {
        doc.rect(x, y, mm2pt(20), mm2pt(20)).fill('#fff')
      }
      x += mm2pt(20);
    }
    x = mm2pt(20)
    y += mm2pt(20);
  })
  
  return doc
  
}


readSprites(process.argv[2], function(sprites) {
  
  var doc = new PDFDocument
  doc.fontSize(50)
  
  sprites.forEach(function(sprite) {
    doc = (process.argv[4] == 'rect') ? drawSpritePDFRect(sprite, doc) : drawSpritePDFCircle(sprite, doc)
    doc.addPage()
  })
  
  
  doc.save().write(process.argv[3])
 
})