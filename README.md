# MyReads "A book tracking app"

MyReads is a bookshelf app that allows us to select and categorize books that we have read, currently reading, or want to read. 

## How to load the application
The project uses Node.js and the Create-React-App. If you do not have Node >= 12.x installed, you can download it here: [Node.js]

Once Node is installed, navigate to the directory where you want to save the app
```sh
$ git clone https://github.com/daliaalymohamed/myreads_book_tracking_app.git
```
once the app is downloaded ,  cd into the app folder and install the dependencies
```sh
$ npm install
```
or 

```sh
$ yarn install
```
then write
```sh
$ npm start
```
or

```sh
$ yarn start
```
You will find that the server runs on https://localhost:3000

## How to use the application
- Books are sorted into three categories: "Currently Reading", "Want to Read" and "Read".
- Every book features green button to change the shelf of the book. Setting option to none hides the book from the shelf.

## For production
Build the app for production to the /build folder:

```sh
$ npm run build
```
