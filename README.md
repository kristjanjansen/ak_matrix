### About

8x8 matrix based pixel font conversion tools.


### Installation

It's assumed you have NodeJS installed. Then enter the following in Terminal app (OSX):


    git clone https://github.com/kuressaareametikool/matrix
    cd matrix


### Create textfile-based font

Create a textfile with 8x8 letterforms, for example:

    o o o o o o o o 
    o o o o o o o o 
    o o . . . . o o 
    o o o o o o o o 
    o o o o o o o o 
    o o . . . . o o 
    o o . . . . o o 
    o o . . . . o o 

    o o o o o o . . 
    o o o o o o . . 
    o o . . o o . . 
    o o o o o o o o 
    o o o o o o o o 
    o o . . . . o o 
    o o o o o o o o 
    o o o o o o o o 

and save it to `test.txt` file.


### Playback textfile in console

Enter the following command:

    node txt-to-console.js test.txt

Optionally you can use `speed` parameter what sets the animation interval in millisecons (default is 1000ms or 1sec):

    node txt-to-console.js test.txt 200


### Convert textfile to PDF

Enter the following command:

    node txt-to-pdf.js test.txt test.pdf

Optionally you can use `rect` parameter what draws the rectangles instead of circles:

    node txt-to-pdf.js test.txt test.pdf


### Convert PNG to textfile.

Create a black-and-white PNG file `test.png` with following parameters:

  * Width: multiple of 8px
  * Height: 8px

Enter the following command:

    node png-to-txt.js test.png test.txt


### Generate random characters

Enter the following command:

    node random-to-txt.js test.txt


### (Offtopic) Accessing the files from the network drive

To copy the files from the Ametikool server to the local directory you can use following path:

    cp /Volumes/dk/Projektid/YOUR-NETWORK-PATH-HERE/*.txt ~/Documents/YOUR-LOCAL-PATH-HERE

