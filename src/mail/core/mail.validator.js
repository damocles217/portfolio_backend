const validator = (data) => {
	let valid = true;
	const errors = [];

	for (let value in data) {
		if (value === "email") {
			const regex = new RegExp(/.*@[a-zA-Z]+\.[a-zA-Z]{3}/g);
			valid = regex.test(data[value]);
		}
		if (value === "name") {
			const regex = new RegExp(/.{1}/);
			valid = regex.test(data[value]);
		}
		if (value === "phone") {
			const regex = new RegExp(/.{10,}/);
			valid = regex.test(data[value]);
		}

		if (!valid)
			errors.push({
				path: value,
				message: "You have to access a valid " + keys[index],
			});
	}

	return [errors, valid];
};
module.exports = { validator };
