var yelpInfoCall = require("./yelpInfoCall");
var geocoder = require("./geocoder");
const db = require('../models');

module.exports = yelpInfoAdd = (truck, id) => {
    console.log("yelpInfoAdd ran", "Truck: ", truck, "id: ", id)
    yelpInfoCall(truck).then((res) => {
<<<<<<< HEAD
        console.log("res: ", res);
        if (res.address) {
            const lat = geocoder.convertAddressLat(res.address);
            const lng = geocoder.convertAddressLong(res.address);
            res.lat = lat;
            res.long = lng;
        }
=======
        // console.log("res: ", res);
        // if (res.address) {
        //     const lat = convertAddressLat(address);
        //     const lng = convertAddressLong(address);
        //     res.lat = lat;
        //     res.long = lng;
        // }
>>>>>>> 505cbfae48843805bdb43d242aefb6a5fc9a41e7
        db.FoodTruck.update(res,
            {
                where: {
                    id: id
                }
            })
    })
}