const { createTransport } = require("nodemailer");
const { google } = require("googleapis");
const { validator } = require("../core/mail.validator");
const OAuth2 = google.auth.OAuth2;

const mailService = async (body) => {
	const [errors, valid] = validator(body);
	if (!valid) return [errors, valid];

	const transportData = {
		service: "gmail",
		auth: {
			clientSecret: process.env.CLIENT_SECRET,
			refreshToken: process.env.REFRESH_TOKEN,
			clientId: process.env.CLIENT_ID,
			user: "axelstart101@gmail.com",
			type: "OAuth2",
		},
	};

	const oAuthClient = new OAuth2(
		transportData.auth.clientId,
		transportData.auth.clientSecret,
		"https://developers.google.com/oauthplayground"
	);

	oAuthClient.setCredentials({
		refresh_token: transportData.auth.refreshToken,
		tls: {
			rejectUnauthorized: false,
		},
	});

	const { token } = await oAuthClient.getAccessToken();

	transportData.auth.accessToken = token;

	const transporter = createTransport(transportData);

	const htmlTemplate = `
		<!DOCTYPE html>
		<html lang="en">
			<head>
				<meta charset="UTF-8" />
				<meta http-equiv="X-UA-Compatible" content="IE=edge" />
				<meta name="viewport" content="width=device-width, initial-scale=1.0" />
				<title>Hi Aksel</title>
			</head>
			<body>
				<div>
					<h2>Hi there, I'm ${body.name}</h2>
					<h3>I'm loocking for you, please contact me in ${body.email} or in the phone: ${body.phone}</h3>
				</div>
			</body>
		</html>
	`;

	const mailOpts = {
		from: process.env.MAIL_FROM || "none",
		to: process.env.MAIL_TO || "nonetoo",
		subject: "I want to contract you for dev jobs",
		html: htmlTemplate,
	};

	await transporter.sendMail(mailOpts);

	return [[], valid];
};

module.exports = { mailService };
