const { getParticularInterchangeDetails } = require("../helpers/interchanges.service");
const { setEntryPointRecord, getEntryPointRecord, isEntryPointRecordExists } = require("../helpers/data.service");
const { BASE_TAX, TAX_PER_KM, BASIC_DISCOUNT, WEEKEND_TAX_PER_KM, SPECIAL_DAYS_DISCOUNT } = require('../constants')
const { getDay , evenNumberPlateDiscountedDays, specialDaysCheck,
     oddNumberPlateDiscountedDays , weekendDays } = require("../helpers/date.service")
const { numberPlateEvenOddChecking } = require("../helpers/numberPlate.sevice")


// Same controller is being used for entry & exit of a car based on number plate
exports.tollBoothEntry = async (req, res) => {
	try {
        // Fetching data from request body
        const { interchangeName, numberPlate, date } = req.body;
        // Case 1: Car is already entered from any interchange & it is now exiting
        if (isEntryPointRecordExists(numberPlate)) {
            // Fetching the previously stored entry point interchange details of car
            const entryPointDetails = getEntryPointRecord(numberPlate);
            // Exit point interchange details of the car
            const exitPoint = getParticularInterchangeDetails(interchangeName)
            // Calculating the distance between two interchanges (exit point - entry point)
            const measuredDistance = exitPoint.distance - entryPointDetails.distance;
            // Getting the day only once from exit Date object because actual calculations are made at the time of leaving
            const day = getDay(date);
            let calculatedBaseTollTax, discount = 0; 
            /* There are two cases, either its week day for which toll tax will be normal 
            OR, there's weekend for which toll tax will be slightly high.
            One more thing, whatever discount will be made, it will be applicable to calculatedBaseTollTax,
            which is in other words is subTotal. */

            // Case 1: Exit day is any day of weekend
            if (weekendDays(day)) {
                calculatedBaseTollTax = BASE_TAX + ( WEEKEND_TAX_PER_KM * measuredDistance)
            } else { // Case 2: Exit day is any day among weekdays
                calculatedBaseTollTax= BASE_TAX + (TAX_PER_KM  * measuredDistance)
                /* We calculate the number plate digits part and determine the even and odd count digits
                Numner Plate Format: LLL NNN, where we assume that NNN consists of Digits
                We slice the number plate string and get only the digits part.*/
                const { even_count, odd_count } = numberPlateEvenOddChecking(numberPlate.slice(4, 7));
                // Discount will be applicable if any one of the following two conditions are fulfilled
                if ((even_count > 0 && evenNumberPlateDiscountedDays(day)) || ( odd_count > 0 && oddNumberPlateDiscountedDays(day))) {
                    discount += BASIC_DISCOUNT;
                }
            }
            /* No matter whether the current day is among weekdays or weekend,
             a special day discount will be applicable */
            if (specialDaysCheck(date)) {
                discount += SPECIAL_DAYS_DISCOUNT;
            }
            // Percentage amount is calculated
            const calculatedDiscountAmount = calculatedBaseTollTax * (discount/100);
            // total tax to be paid is calculated by subtracting the percentage amount from subTotal
            const total = calculatedBaseTollTax - calculatedDiscountAmount;
            return res
                .status(200)
                .json({ success: true, message: `Car is exiting from ${interchangeName}.`,
                    baseRate: BASE_TAX, discount: discount + '%', subTotal: calculatedBaseTollTax , total});
        } else { // Case 2: Car is entring from any of the interchange, new entry will be made
            /* Getting details based on interchange parameter name 
            so that distance and tax must be collected at the time of exit. */
            const entryPoint = getParticularInterchangeDetails(interchangeName)
            // Making an entry to our system data collection
            setEntryPointRecord(numberPlate, {...entryPoint, date })
            return res
                .status(200)
                .json({ success: true, message: `Car Entry is made for ${interchangeName}.`});
        }
    } catch {
        return res.status(500).json({
            success: false,
            message: 'Internal Server Error Ocurred'
        });
    }
}