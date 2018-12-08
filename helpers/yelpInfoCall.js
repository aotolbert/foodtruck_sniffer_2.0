var fetchUrl = require("fetch").fetchUrl;


module.exports = yelpInfo = (input) => {
    var options = {
        headers: {
            "authorization": process.env.YELP_API_TOKEN
        }
    }
    return new Promise((resolve, reject) => {
        // yelp api call
        fetchUrl(`https://api.yelp.com/v3/businesses/search?term=${input}&location=charlotte_nc`, options, function (error, meta, body) {
            var obj = JSON.parse(body);
            if (obj.businesses) {
                var result = obj.businesses[0];
                yelpInfo = {
                    yelpID: result.id,
                    address: result.location.address1,
                    image: result.image_url,
                    overallRating: result.rating,
                    priceRating: result.price,
                    phone: result.display_phone,
                }
                resolve(yelpInfo);
            }

        })
    });
}