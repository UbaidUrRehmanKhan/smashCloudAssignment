// Joi Validator is used to Validate the coming parameters In POST request
const Joi = require('joi');

exports.tollBoothEntryValidator = async (req, res, next) => {
	const schema = Joi.object({
		numberPlate: Joi.string().required().label('numberPlate'),
        interchangeName: Joi.string().required().label('interchangeName'),
        date: Joi.date().required().label('date') // Date Format: MM-DD-YYYY
	});
	const { error } = schema.validate(req.body);
	if (error) {
		return res.status(422).json({ message: error.details[0].message });
	}
	return next();
}