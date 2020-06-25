import express from "express";
const app = express();
const port = process.env.PORT || 8080;
const verbose = false;

app.get("/", (req, res) => {
  res.sendFile(__dirname + '/public/page.html');
});

app.get( '/*' , ( req, res ) => {

  // This is the current file they have requested
  const file = req.params[0];

  // Send the requesting client the file.
  res.sendfile( __dirname + '/' + file );

});

app.listen(port, () => {
  // tslint:disable-next-line:no-console
  console.log(`server started on ${port}`)
})
