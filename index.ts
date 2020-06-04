import { Application } from "https://deno.land/x/oak/mod.ts";
import { organ } from "https://raw.githubusercontent.com/denjucks/organ/master/mod.ts";

import router from "./routes/index.routes.ts";

const app = new Application();
// Adding the Organ middleware. Note that when no values are passed to the 
// organ function, the default format "combined" will be used. For more info
// on this format, see the section on predefined formats below.
app.use(organ());

app.use(router.routes());
app.use(router.allowedMethods())

const PORT: number = 3005;

console.log('Server running on port', PORT);
await app.listen({ port: PORT });