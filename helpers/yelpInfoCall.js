var fetchUrl = require("fetch").fetchUrl;


module.exports = yelpInfoCall = (input) => {
    var options = {
        headers: {
            "authorization": process.env.YELP_API_TOKEN
        }
    }
    return new Promise((resolve, reject) => {
        console.log("yelpInfoCall ran: ", input)
        // yelp api call
        fetchUrl(`https://api.yelp.com/v3/businesses/search?term=${input}&location=charlotte_nc`, options, function (error, meta, body) {
            var obj = JSON.parse(body);
            console.log(obj.businesses[0]);
            if (obj.businesses) {
                var result = obj.businesses[0];
                yelpInfo = {
                    yelpID: result.id,
                    image: result.image_url,
                    overallRating: result.rating,
                    priceRating: result.price,
                    phone: result.display_phone,
                    address: result.location.address1,
                    lat: result.coordinates.latitude,
                    long: result.coordinates.longitude
                }
<<<<<<< HEAD
                if((result.location.address1.length>2)){
                  yelpInfo.address = result.location.address1;
                }
                // if(!(result.location.address1.length<2)){
                //     yelpInfo.lat = result.coordinates.latitude;
                //     yelpInfo.long = result.coordinates.longitude;
=======
                // if (result.location.address1.length > 2) {
                //     yelpInfo.address = result.location.address1;
                // }
                // if(!(result.location.address1.length>2)){
                //     yelpInfo.lat = result.coordinates.latitude;
                //     yelpInfo.long = result.coordinates.longitude;
                // }else{
                //     yelpInfo.address = result.location.address1
>>>>>>> 505cbfae48843805bdb43d242aefb6a5fc9a41e7
                // }

                console.log("yelpInfo: ", yelpInfo)
                resolve(yelpInfo);
            }

        })

    });
}