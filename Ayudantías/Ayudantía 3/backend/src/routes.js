import Router from "koa-router"
import movies from "./routes/movies.js";
import firstGet from "./routes/firstGet.js";

const router = new Router();

router.use('/movies', movies.routes());
router.use('/firstGet', firstGet.routes());

export default router;
