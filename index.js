const express = require("express");
const app = express();

const dotenv = require("dotenv");
dotenv.config();

const PORT = process.env.PORT || 3000;

// Imports
const db = require("./db/conn");
const Vegetable = require("./models/vegetables");
const vegetableRoutes = require("./routes/vegetables");

// JSX-View-Engine
const jsxViewEngine = require("jsx-view-engine");

app.set("view engine", "jsx");
app.set("views", "./views");
app.engine("jsx", jsxViewEngine());

//method override
const methodOverride = require("method-override");
app.use(methodOverride("_method"));

app.listen(PORT, () => {
	console.log(`Listening on port ${PORT}`);
});

app.get("/", (req, res) => {
	res.send("You have arrived");
});

//localhost:4242/api/vegetables
app.use("/api/vegetables", vegetableRoutes);

// Route for Index View
app.get("/vegetables", async (req, res) => {
	try {
		const foundVegetables = await Vegetable.find({});
		res.status(200).render("vegetables/Index", { vegetables: foundVegetables });
	} catch (err) {
		res.send(err).status(400);
	}
});

app.get("/vegetables/new", (req, res) => {
	res.render("vegetables/New");
});
