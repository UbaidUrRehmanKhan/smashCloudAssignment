/* This Service is used to keep the list of interchanges 
and fetching function to get the details of a particular interchange */
const InterchangesList = [
    {name : 'Zero Point', distance: '0'},
    {name : 'NS Interchange', distance: '5'},
    {name : 'Ph4 Interchange', distance: '10'},
    {name : 'Ferozpur Interchange', distance: '17'},
    {name : 'Lake City Interchange', distance: '24'},
    {name : 'Raiwand Interchange', distance: '29'},
    {name : 'Bahria Interchange', distance: '34'},
]

/* This function is used to get a particular interchange details 
so that we become able to calculate the distance and likewise tax */
exports.getParticularInterchangeDetails = (interchangeName) => {
    const interchange = InterchangesList.find(o => o.name === interchangeName);
    return interchange;
}