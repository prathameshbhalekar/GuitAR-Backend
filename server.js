import express from "express";
import mongoose from "mongoose";
import users from "./dbUser.js";
import cors from "cors";
import dbSongs from "./dbSongs.js";
import dotenv from "dotenv";
import path from 'path';
import { fileURLToPath } from 'url';
dotenv.config();

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const app = express();
const port = process.env.PORT || 9000;
app.use(cors());

app.use(express.json());
const connection_url =
  "mongodb+srv://admin:" +
  process.env.MONGODB_PASSWORD +
  "@cluster0.jx3fl.mongodb.net/guitarappdb?retryWrites=true&w=majority";
mongoose.connect(connection_url, {
  useCreateIndex: true,
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.get("/api/v1/downloads/Marker", function (req, res) {
  const file = `${__dirname}/downloads/marker.png`;
  res.download(file);
});

// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ User Info ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~`
// Find By Email
app.get("/api/v1/users/findbyemail", (req, res) => {
  try {
    const email = req.query.email;
    res.header("Access-Control-Allow-Origin", "*");
    users.findOne({ email: String(email) }, (err, data) => {
      if (err) {
        res.status(500).send(err);
      } else {
        res.status(200).send(data);
      }
    });
  } catch (err) {
    console.error(err);
  }
});

//Create User

app.post("/api/v1/users/create", (req, res) => {
  try {
    const user = req.body;
    res.header("Access-Control-Allow-Origin", "*");
    users.create(user, (err, data) => {
      if (err) {
        res.status(500).send(err);
      } else {
        res.status(201).send(data);
      }
    });
  } catch (err) {
    console.error(err);
  }
});

app.put("/api/v1/users/updateGuitar", (req, res) => {
  try {
    const email = req.query.email;

    const m_ratio1 = req.query.m_ratio1;
    const n_ratio1 = req.query.n_ratio1;
    const m_ratio2 = req.query.m_ratio2;
    const n_ratio2 = req.query.n_ratio2;
    const m_ratio3 = req.query.m_ratio3;
    const n_ratio3 = req.query.n_ratio3;
    const m_ratio4 = req.query.m_ratio4;
    const n_ratio4 = req.query.n_ratio4;

    const update = {
      guitar: {
        m_ratio1: m_ratio1,
        n_ratio1: n_ratio1,
        m_ratio2: m_ratio2,
        n_ratio2: n_ratio2,
        m_ratio3: m_ratio3,
        n_ratio3: n_ratio3,
        m_ratio4: m_ratio4,
        n_ratio4: n_ratio4,
      },
    };

    res.header("Access-Control-Allow-Origin", "*");

    users.updateOne({ email: String(email) }, update, (err, data) => {
      if (err) {
        res.status(500).send(err);
      } else {
        res.status(200).send(data);
      }
    });
  } catch (err) {
    console.error(err);
  }
});

app.put("/api/v1/users/updateStrokeColor", (req, res) => {
  try {
    const email = req.query.email;
    const color = req.query.color;

    const update = {
      strokeColor: String(color),
    };

    res.header("Access-Control-Allow-Origin", "*");

    users.updateOne({ email: String(email) }, update, (err, data) => {
      if (err) {
        res.status(500).send(err);
      } else {
        res.status(200).send(data);
      }
    });
  } catch (err) {
    console.error(err);
  }
});

app.put("/api/v1/users/updateSpeed", (req, res) => {
  try {
    const email = req.query.email;
    const speed = req.query.speed;

    const update = {
      speed: parseInt(speed),
    };

    res.header("Access-Control-Allow-Origin", "*");

    users.updateOne({ email: String(email) }, update, (err, data) => {
      if (err) {
        res.status(500).send(err);
      } else {
        res.status(200).send(data);
      }
    });
  } catch (err) {
    console.error(err);
  }
});

app.put("/api/v1/users/updateTextColor", (req, res) => {
  try {
    const email = req.query.email;
    const color = req.query.color;

    const update = {
      textColor: String(color),
    };

    res.header("Access-Control-Allow-Origin", "*");

    users.updateOne({ email: String(email) }, update, (err, data) => {
      if (err) {
        res.status(500).send(err);
      } else {
        res.status(200).send(data);
      }
    });
  } catch (err) {
    console.error(err);
  }
});

// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ Songs ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

// Get Songs
app.get("/api/v1/songs/get", (req, res) => {
  try {
    const { page = 1, limit = 10, query = "" } = req.query;
    res.header("Access-Control-Allow-Origin", "*");

    dbSongs
      .find({ title: { $regex: query, $options: "i" } }, (err, data) => {
        if (err) res.status(500).send(err);
        else {
          res.status(200).send(data);
        }
      })
      .limit(limit * 1)
      .skip((page - 1) * limit);
  } catch (err) {
    console.error(err);
  }
});

app.get("/api/v1/songs/getFromTitle", (req, res) => {
  try {
    const { title = "" } = req.query;
    res.header("Access-Control-Allow-Origin", "*");
    dbSongs.findOne({ title: title }, (err, data) => {
      if (err) res.status(500).send(err);
      else {
        res.status(200).send(data);
      }
    });
  } catch (err) {
    console.error(err);
  }
});

app.listen(port, () => console.log(`Listening on localhost:${port}`));
