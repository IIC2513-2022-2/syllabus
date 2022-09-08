import Router from "koa-router";

const router = new Router();

const movies = [
	{
		name:'Interestellar',
		year: '2019',
	},
	{
		name: 'Top Gun',
		year: '1986',
	},
	{
		name: 'Interestellar',
		year: '2014',
	},
]

router.get('movies.show', '/', async (ctx) => {
  ctx.body = movies;
})

export default router;