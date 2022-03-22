const Celebrity = require("../models/Celebrity.model");

const router = require("express").Router();

const listCelebritiesRoute = (req) => `${req.baseUrl}`;
const newCelebrityRoute = (req) => `${req.baseUrl}/create`;
const newCelebrityView = (req) => `celebrities/new-celebrity`;
const listCelebrityView = (req) => `celebrities/celebrities`;

router.get('/', async (req, res, next) => {
	try {
		const celebrities = await Celebrity.find();
		res.render(listCelebrityView(req), {celebrities});
	} catch (error) {
		console.error(error);
		next(error);
	}
});

router.get("/create", (req, res, next) => {
	res.render(newCelebrityView(req), { routePost: newCelebrityRoute(req) });
});

router.post("/create", async (req, res, next) => {
	try {
		const newCelebrity = req.body;
		await Celebrity.create(newCelebrity);
		await Celebrity.findByIdAndUpdate
		res.redirect(listCelebritiesRoute(req));
	} catch (error) {
		console.error(error);
		res.render(newCelebrityView(req), { routePost: newCelebrityRoute(req) });
	}
});

module.exports = router;

