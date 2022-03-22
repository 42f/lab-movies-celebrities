const Movie = require("../models/Movie.model");
const Celebrity = require("../models/Celebrity.model");

const router = require("express").Router();

const listMoviesRoute = (req) => `${req.baseUrl}`;
const newMovieRoute = (req) => `${req.baseUrl}/create`;

const listMovieView = `movies/movies`;
const detailsMovieView = `movies/movie-details`;
const newMovieView = `movies/new-movie`;
const editMovieView = `movies/edit-movie`;


router.get('/', async (req, res, next) => {
	try {
		const movies = await Movie.find();
		res.render(listMovieView, { movies });
	} catch (error) {
		console.error(error);
		next(error);
	}
});


router.get("/create", async (req, res, next) => {
	try {
		const allCelebrities = await Celebrity.find();
		res.render(newMovieView, {
			routePost: newMovieRoute(req),
			celebrities: allCelebrities
		});
	} catch (error) {
		console.error(error);
		res.render(newMovieView, { routePost: newMovieRoute(req) });
	}

});

router.post("/create", async (req, res, next) => {
	try {
		const newMovie = req.body;
		await Movie.create(newMovie);
		res.redirect(listMoviesRoute(req));
	} catch (error) {
		console.error(error);
		res.render(newMovieView, { routePost: newMovieRoute(req) });
	}
});


// These route has to be last to avoid accidently overriding another one

async function getCelebritiesWithSelectedStatus(movie) {
	const celebrities = await Celebrity.find();
	return celebrities.map(celeb => {
		return {
			isSelected: movie.cast.some(memberId => memberId.equals(celeb._id)),
			data: celeb,
		}
	});
}

router.get("/:id/edit", async (req, res, next) => {
	try {
		const movie = await Movie.findById(req.params.id);
		const celebrities = await getCelebritiesWithSelectedStatus(movie);

		res.render(editMovieView, {
			routePost: `${req.baseUrl}/${req.params.id}/edit`,
			movie,
			celebrities
		});
	} catch (error) {
		console.error(error);
		res.redirect(listMoviesRoute(req));
	}

});

router.post("/:id/edit", async (req, res, next) => {
	try {
		const updatedMovie = req.body;
		await Movie.findByIdAndUpdate(req.params.id, updatedMovie);
		res.redirect(listMoviesRoute(req));
	} catch (error) {
		console.error(error);
		res.redirect(listMoviesRoute(req));
	}
});

router.post('/:id/delete', async (req, res, next) => {
	try {
		const movie = await Movie.findByIdAndDelete(req.params.id);
		res.redirect(listMoviesRoute(req));
	} catch (error) {
		console.error(error);
		res.redirect(listMoviesRoute(req));
	}
});

router.get('/:id', async (req, res, next) => {
	try {
		const movie = await Movie.findById(req.params.id).populate('cast');
		res.render(detailsMovieView, { movie });
	} catch (error) {
		console.error(error);
		next(error);
	}
});

module.exports = router;
