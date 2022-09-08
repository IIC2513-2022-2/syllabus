import Koa from "koa";
import koaBody from "koa-body";
import KoaLogger from "koa-logger";
import router from "./routes.js";
import cors from "@koa/cors";

const PORT = 3000;

const app = new Koa();


app.use(cors());


// Logs requests from the server
app.use(KoaLogger());

// Parse Request Body
app.use(koaBody());

// app.use((ctx, next) => {
//   ctx.body = "Hello 2048 DCC!";
// })

app.use(router.routes());

app.listen(PORT, () => {
  console.log(`Starting app in port ${PORT}`);
});
