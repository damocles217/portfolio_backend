const express = require("express");
const cors = require("cors");

const router = require("./mail/api/mail.controller");

const app = express();

app.set("PORT", process.env.PORT || 8000);

app.use(express.json());
app.use(
	cors({
		origin: [process.env.CORS_OPTIONS] || "*",
		allowedHeaders: ["content-type", "Access-Control-Allow-Origin"],
		preflightContinue: true,
	})
);

app.use(router);

app.listen(app.get("PORT"), () => {
	console.log("Running on PORT: ", app.get("PORT"));
});
