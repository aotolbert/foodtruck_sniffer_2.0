var yelpInfoCall = require("./yelpInfoCall");
const db = require('../models');

module.exports = yelpInfoAdd = (truck) => {
    yelpInfoCall(truck).then((res) => {
        db.FoodTruck.update({ res },
            {
                where: {
                    id: FoodTruckId
                }
            })
    })
}