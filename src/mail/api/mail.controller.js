const { Router } = require("express");
const { mailService } = require("../app/mail.service");

const router = Router();

router.post("/mail", async (req, res) => {
	const [errors, valid] = await mailService(req.body);

	if (!valid) return res.json(errors);
	return res.json(true);
});

module.exports = router;
