import express from "express";

const app = express();

app.set("views", "pug-views");
app.set("view engine", "pug");
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("static"));

// Home route - HTML
app.get("/", (req, res) => {
  res.send("Hello World");
});

app.get("/about", function (req, res) {
  res.render("basic", { pageTitle: "About", name: "John" });
});

// Example API endpoint - JSON
app.get("/users/:id", (req, res) => {
  const userId = req.params.id;
  return res.send(`User ID: ${userId}`);
});

app.get("/blog/*splat", (req, res) => {
  const splat = req.params["splat"];
  return res.send(`Blog post ${splat.join(".")}`);
});

// Health check
app.get("/healthz", (req, res) => {
  res.status(200).json({ status: "ok", timestamp: new Date().toISOString() });
});

export default app;
