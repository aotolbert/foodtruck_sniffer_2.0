var yelpInfoCall = require("./yelpInfoCall");
var geocoder = require("./geocoder");
const db = require('../models');

module.exports = yelpInfoAdd = (truck, id) => {
    console.log("this ran", "Truck: ", truck, "id: ", id)
    yelpInfoCall(truck).then((res) => {
        console.log("res: ", res);
        if (res.address) {
            const lat = geocoder.convertAddressLat(res.address);
            const lng = geocoder.convertAddressLong(res.address);
            res.lat = lat;
            res.long = lng;
        }
        db.FoodTruck.update(res,
            {
                where: {
                    id: id
                }
            })
    })
}