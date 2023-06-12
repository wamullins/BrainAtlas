const express = require("express");
const Router = require("./routes/AppRouter");
const db = require("./db");

const PORT = process.env.port || 3001;
const app = express();

app.use(express.json());

/// need to fully understand what "use" is actually doing

app.use("/api", Router);
app.use(express.static("client"));

app.listen(PORT, () => console.log(`Listening on port: ${PORT}`));

// i think this is all i need but will need to confirm
