const { getParticularInterchangeDetails } = require("../helpers/interchanges.service");
const { dateFormatChecking } = require("../helpers/date.service")
const { numberPlateFormatChecking } = require("../helpers/numberPlate.sevice")

exports.entryFieldsFormatChecking = async (req, res, next) => {
    const { interchangeName, numberPlate, date } = req.body;
  
    if (numberPlateFormatChecking(numberPlate) == false) {
        return res.status(422).json({
            success: false,
            message: 'Number Plate is in wrong Format',
        });
    } else if (getParticularInterchangeDetails(interchangeName) == false || getParticularInterchangeDetails(interchangeName) == undefined) {
        return res.status(422).json({
            success: false,
            message: 'Interchange does not exist.',
        });
    } else if (dateFormatChecking(date) == false) {
        return res.status(422).json({
            success: false,
            message: 'Date is in wrong format. It must be in MM-DD-YYYY fromat',
        });
    }
    next();
};