# Points to Ponder

1- Code is properly structured and well defined in their relevant directories like controller, routes, etc.

2- Structure is pretty much simple, flexible and traditional, yet modular.

3- Proper commenting is added to explain the code properly.

4- Tried to implement my own logic as much as possible instead of trying to utilize any of additional/extra package, so that code reviewer must acknowledge my logic building skills.

5- No DB calls or file writing is made because no requirement is mentioned accordingly, 
instead an internal data structure is used that persists along the server instance lifetime and makes the saving/retrieval process easier & faster.

6- Same API is used with same parameters at entry and exit of car.

7- Here is the Interchanges List. 

```bash
InterchangesList = [
    {name : 'Zero Point', distance: '0'},
    {name : 'NS Interchange', distance: '5'},
    {name : 'Ph4 Interchange', distance: '10'},
    {name : 'Ferozpur Interchange', distance: '17'},
    {name : 'Lake City Interchange', distance: '24'},
    {name : 'Raiwand Interchange', distance: '29'},
    {name : 'Bahria Interchange', distance: '34'},
]
```

8- The name of interchange will follow the convention and case sensitivity while entry is made against a car. For example, entry will be made when value is 'Zero Point' while there will be error message if the value of interchange is 'zero point'.

9- As per the instructions, plate number format will be XXX-000 (with a dash in between alphabets and numbers).

## Installation

1 - Code can run by installing node-modules in root directory through this command:

```bash
npm install
```
2- Now run the following command:
```bash
node server.js
```

## Usage

Hit the following post request API in Postman:
```bash
http://localhost:3000/api/tollBooth/add
```
Example for Request Params in JSON Body while entering/exiting: 
```python
{ 
    "numberPlate": "LLL 321",
    "interchangeName" : "Zero Point",
    "date": "10-12-2022" // MM-DD-YYYY
}
```
Response Format while exiting:

```python
# Result
{
    "success": true,
    "message": "Car is exiting from Bahria Interchange.",
    "baseRate": 20,
    "discount": "10%",
    "subTotal": 26.8,
    "total": 24.12
}

```