/* This function is used to determine the number of even 
 and odd digits in number plate */

exports.numberPlateEvenOddChecking = (number) => {
    let even_count = 0;
    let odd_count = 0;
    while (number > 0)
    {
        let rem = number % 10;
        if (rem % 2 == 0) {
            even_count++;
        } else {
            odd_count++;
        }  
        number = Math.floor(number / 10);
    }
    return {even_count, odd_count};
}

// Checking the format of number plate to make sure it must be in 'LLL NNN' format
exports.numberPlateFormatChecking = (numberPlate) => {
    const regex=new RegExp("^[A-Za-z]{3}-[0-9]{3}$");
    return regex.test(numberPlate)
}