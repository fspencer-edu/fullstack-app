const app = require("./src/app");

const PORT = process.env.PORT || 5001;

app.listen(PORT, () => {
  console.log(`Backend listening on port ${PORT}`);
}).on("error", (err) => {
  console.error("Server failed to start:", err.message);
});