import express from "express";

const app = express();

app.set("views", "pug-views");
app.set("view engine", "pug");
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("static"));

const PEOPLE = [
  { id: 1, name: "Tom" },
  { id: 2, name: "Jeff" },
];

app.get("/", (req, res) => {
  res.status(200).json({ status: "ok", timestamp: new Date().toISOString() });
});

app.get("/message", (req, res) => {
  // make this take a query param for the message
  const message = req.query.message ?? "Hello, demo days!";
  res.json({ message });
});

app.get("/people", (req, res) => {
  res.json(PEOPLE);
});

app.get("/people/:id", (req, res) => {
  const person = PEOPLE.find((p) => p.id === parseInt(req.params.id));
  if (!person) {
    return res.status(404).json({ error: "Person not found" });
  }

  res.json(person);
});

export default app;
