require("dotenv").config();
const express = require("express");
const cors = require("cors");
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");

const port = process.env.PORT || 3000;

const app = express();

app.use(cors());
app.use(express.json());

const uri = process.env.DB_URI;

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

async function run() {
  try {
    // await client.connect();

    const database = client.db("scholarshipmania");
    const scholarships = database.collection("scholarships");

    app.post("/scholarships", async (req, res) => {
      const scholarship = req.body;

      const result = await scholarships.insertOne(scholarship);

      res.send(result);
    });

    app.get("/scholarships", async (req, res) => {
      const result = await scholarships.find().toArray();
      res.send(result);
    });

    app.get("/scholarships/:id", async (req, res) => {
      const { id } = req.params;

      const result = await scholarships.findOne({ _id: new ObjectId(id) });

      res.send(result);
    });

    console.log(
      "Pinged your deployment. You successfully connected to MongoDB!"
    );
  } finally {
  }
}

run().catch(console.dir);

app.get("/", (req, res) => {
  res.send("Hello world!");
});

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});
