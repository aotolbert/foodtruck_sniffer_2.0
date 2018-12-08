var yelpReviewCall = require("./yelpReviewCall");
const db = require('../models');

// call to the database to receive the names of the food trucks stored
populateArray = () => {
    let dbTruckYelpIDs = [];
    db.FoodTruck.findAll({
        attributes: ["yelpID"]
    }).then((results) => {
        for (var g = 0; g < results.length; g++) {
            if(results[g].dataValues.yelpID){
            dbTruckYelpIDs.push(results[g].dataValues.yelpID);
            }
        }
    }).then(() => {
        for (let i = 0; i < dbTruckYelpIDs.length; i++) {
            reviewToDB(dbTruckYelpIDs[i])
        }
    })
}
reviewToDB = (truck) => {
    yelpReviewCall(truck)
        .then((res) => {
            if(!(res === null)){
            let Res = res;
            db.FoodTruck.findAll({ where: { yelpID: truck } })
                .then((res) => {
                    FoodTruckId = res[0].id
                    db.YelpReview.destroy({
                        where: {
                            FoodTruckId: FoodTruckId
                        }
                    })
                }).then(() => {
                    for (let b = 0; b < Res.reviewTime.length; b++) {
                        db.YelpReview.create({
                            rating: Res.reviewRating[b],
                            username: Res.reviewAuthor[b],
                            content: Res.reviewText[b],
                            contentTimeCreated: Res.reviewTime[b],
                            contentUrl: Res.reviewUrl[b],
                            userImage: Res.reviewImage[b],
                            FoodTruckId: FoodTruckId
                        })
                    }
                })
        }})
}
setInterval(() => { populateArray(); }, 1000 * 60 * 60 * 12);
setTimeout(populateArray, 30 * 1000)
