// This service is used to maintain the data structure that persists along the session of server


/* Here MAP data structure is used because it store the data in Key & value Pair,
and also its become easier to fetch data based on Key */
let entryPointsRecordsArray = new Map()

// Entry of number plate in data set, where number plate is unique to become Key
exports.setEntryPointRecord = (numberplate, details) => {
    entryPointsRecordsArray.set(numberplate, details)
}

/* Fetching entry point record and deletes it from the data set 
so that no replication could happen against number plate Key */
exports.getEntryPointRecord = (numberPlate) => {
    const fetchedRecord = entryPointsRecordsArray.get(numberPlate)
    entryPointsRecordsArray.delete(numberPlate)
    return fetchedRecord;
}

// checking whether entry against number plate is already made or not (checking key existence)
exports.isEntryPointRecordExists = (numberPlate) => {
    return entryPointsRecordsArray.has(numberPlate)
}
