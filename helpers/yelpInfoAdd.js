var yelpInfoCall = require("./yelpInfoCall");
var geocoder = require("./geocoder");
const db = require('../models');

module.exports = yelpInfoAdd = (truck, id) => {
    console.log("yelpInfoAdd ran", "Truck: ", truck, "id: ", id)
    yelpInfoCall(truck).then((res) => {
        // console.log("res: ", res);
        // if (res.address) {
        //     const lat = convertAddressLat(address);
        //     const lng = convertAddressLong(address);
        //     res.lat = lat;
        //     res.long = lng;
        // }
        db.FoodTruck.update(res,
            {
                where: {
                    id: id
                }
            })
    })
}