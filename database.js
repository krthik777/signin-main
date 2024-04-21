// Description: This file contains the code to create a server that listens for POST requests and sends the username and password to a MongoDB database. So basically its a signup system.

const  host = "localhost"; //specify host 
const port = 5550;  //specify port number
//required modules
const { MongoClient } = require("mongodb");
const http = require("http");

// Create a server that listens for POST requests
const requestListener = function (req, res) {
  if (req.method === "POST") {
    let body = "";
    req.on("data", (chunk) => {
      body += chunk.toString();
    });
    req.on("end", () => {
      const { username, password } = JSON.parse(body);
      send(username, password);
      headers = {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "OPTIONS, POST",
        "Access-Control-Allow-Headers": "Content-Type",
      };

      res.writeHead(200, headers);
      res.end(JSON.stringify({ message: "User created" }));
    });
  } else if (req.method == "OPTIONS") {
    headers = {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "OPTIONS, POST",
      "Access-Control-Allow-Headers": "Content-Type",
    };

    res.writeHead(200, headers);
    res.end("yeassss !!!");
  } else {
    res.writeHead(200, { "Content-Type": "text/html" });
    res.end("wtf");
  }
};

const server = http.createServer(requestListener);
server.listen(port, host, () => {
  console.log(`Server is running on http://${host}:${port}`);
});

// Enter Connection URI for your MongoDB database in ""
const uri =
  "";

// Function to send username and password to MongoDB

async function send(username, password) {
  const client = new MongoClient(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  try {
    await client.connect();

    // Get reference to the database in ""
    const database = client.db("");

    // Get reference to the collection in ""
    const collection = database.collection("");

    // Check if the username already exists here query is sent as username in the database
    const existingUser = await collection.findOne({ "username": username });

    if (existingUser) {
      console.log(
        `Username '${username}' already exists. Not signing up.`
      );
    } else {
      // If new user not present Insert the new user into the collection
      await collection.insertOne({ "username": username, "password": password });
      console.log(`Username '${username}' wasn't there in the collection so the user name is added`);
    }
  } finally {
    console.log("done");
    // Close the connection
    await client.close();
  }
}

// the code has just basics and is made so that it can be easily understood and modified. ~@krthik777
