// This service is used to manipulate date to play around the week days and special yearly days,
// so that accordingly discount should be added while calculating tax

// This function is used to get the week day from date object
exports.getDay = (date) => {
    const d = new Date(date);
    return d.getDay();
}

/* This function is used to check whether the day is Monday or Wednesday
NOTE: Week days range fall between Sunday(0) to Saturday(6) */
exports.evenNumberPlateDiscountedDays = (day) => {
    return (day == 1 || day == 3) ? true :  false;
}

// This function is used to determine whether the day is Tuesday or Thursday
exports.oddNumberPlateDiscountedDays = (day) => {
    return (day == 2 || day == 4) ? true :  false;
}

// This function is for checking whether the current day is among Sunday or Saturday
exports.weekendDays = (day) => {
    return (day == 0 || day == 6) ? true :  false;
}


/*This function is helpful for checking the current date is among special yearly days
Special Days: 23rd March, 14th August and 25th December */
exports.specialDaysCheck = (date) => {
    /* We assume that day is in format 'MM-DD-YYYY'
    So, we need date splicing to get first 5 characters */
    const subDate = date.slice(0, 5) 
    if (subDate == '03-23' || subDate == '08-14' || subDate == '12-25') {
        return true;
    }
    return false;
}

// Checking the format of date. It must be in 'MM-DD-YYYY' Format.
exports.dateFormatChecking = (date) => {
    var regex=new RegExp("((0[1-9]|1[0-2])[-]([0-2]{1}[0-9]{1}|3[0-1]{1})[-][0-9]{4})");
    return regex.test(date)
}