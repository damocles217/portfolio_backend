const express = require("express");
const cors = require("cors");

const router = require("./mail/api/mail.controller");

const app = express();

app.set("PORT", process.env.PORT || 8000);

app.use((req, response, next) => {
	response.setHeader(
		"Access-Control-Allow-Origin",
		process.env.CORS_OPTIONS || "*"
	);
	response.setHeader("Access-Control-Allow-Credentials", "true");
	response.setHeader(
		"Access-Control-Allow-Methods",
		"GET,HEAD,OPTIONS,POST,PUT"
	);
	response.setHeader(
		"Access-Control-Allow-Headers",
		"Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers"
	);
	if (req.method == "OPTIONS") next();
});
app.use(express.json());
app.use(
	cors({
		origin: [process.env.CORS_OPTIONS] || "*",
		credentials: true,
		allowedHeaders: [
			"Access-Control-Allow-Headers",
			"Access-Control-Request-Headers",
			"Access-Control-Request-Headers",
			"Access-Control-Allow-Credentials",
			"content-type",
		],
		preflightContinue: true,
	})
);

app.use(router);

app.listen(app.get("PORT"), () => {
	console.log("Running on PORT: ", app.get("PORT"));
});
