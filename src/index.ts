import * as http from "http";
import bodyParser from "body-parser";
import cors from "cors";
import express from "express";
import nconf from "nconf";

import * as database from "./database";

import routes from "./routes";

database.open();

const app = express();
const server = new http.Server(app);

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(routes);

const port = nconf.get("PORT") || 5000;
app.set("port", port);
server.listen(port, () => console.log(`Server started on port ${port}`));
