const express = require("express");
const router = express.Router();
const Vegetable = require("../models/vegetables");

router.get("/seed", async (req, res) => {
	try {
		await Vegetable.create([
			{
				name: "potato",
				color: "brown",
				readyToEat: true,
			},
			{
				name: "zucchini",
				color: "green",
				readyToEat: true,
			},
			{
				name: "corn",
				color: "green",
				readyToEat: false,
			},
			{
				name: "asparagus",
				color: "green",
				readyToEat: true,
			},
			{
				name: "carrots",
				color: "brown",
				readyToEat: false,
			},
		]);
		res.status(200).redirect("/api/vegetables");
	} catch (err) {
		res.status(400).send(err);
	}
});

router.get("/", async (req, res) => {
	try {
		const foundVegetables = await Vegetable.find({});
		res.status(200).json(foundVegetables);
	} catch (err) {
		res.status(400).send(err);
	}
});

router.delete("/:id", async (req, res) => {
	try {
		const deletedFruit = await Vegetable.findByIdAndDelete(req.params.id);
		console.log(deletedFruit);
		res.status(200).redirect("/vegetables");
	} catch (err) {
		res.status(400).send(err);
	}
});

//Create
router.post("/", async (req, res) => {
	try {
		const createVegetable = await Vegetable.create(req.body);
		res.status(200).redirect("/vegetables");
	} catch (err) {
		res.status(400).send(err);
	}
});

// Edit
router.put("/:id", async (req, res) => {
	if (req.body.readyToEat === "on") {
		req.body.readyToEat = true;
	} else {
		req.body.readyToEat = false;
	}
	try {
		const updatedVegetable = await Vegetable.findByIdAndUpdate(
			req.params.id,
			req.body,
			{ new: true }
		);
		console.log(updatedVegetable);

		res.status(200).redirect("/vegetables");
	} catch (err) {
		res.status(400).send(err);
	}
});

module.exports = router;
