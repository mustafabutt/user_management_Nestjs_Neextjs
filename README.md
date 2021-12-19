                        Instructions

Make sure you have installed Nodejs and MongoDB.
Clone the source code and run the following commands in to the root directory. 

npm install 
npm run start


Now open postman and make a post request on the following url to save a file data into DB.

http://localhost:3000/books

Request body = {
               	"bookName":"test.txt"  ||  "bookName":"test.pdf"
               }
               
               
Fetch all the posted data by sending a get request on the follwoing link 

http://localhost:3000/books
