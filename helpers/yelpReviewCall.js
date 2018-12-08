var fetchUrl = require("fetch").fetchUrl;

module.exports = yelpReview = (input) => {
    var options = {
        headers: {
            "authorization": process.env.YELP_API_TOKEN
        }
    }
    return new Promise((resolve, reject) => {
        fetchUrl(`https://api.yelp.com/v3/businesses/${input}/reviews`, options, function (error, meta, body) {
            var obj = JSON.parse(body);
            const reviewText = [];
            const reviewRating = [];
            const reviewTime = [];
            const reviewAuthor = [];
            const reviewImage = [];
            const reviewUrl = [];
            //    Loops through respone's reviews than pushes each property to their respective array for output
            if (obj.reviews.length > 0) {
                for (let i = 0; i < obj.reviews.length; i++) {
                    reviewText.push(obj.reviews[i].text)
                    reviewRating.push(obj.reviews[i].rating)
                    reviewTime.push(obj.reviews[i].time_created)
                    reviewAuthor.push(obj.reviews[i].user.name)
                    reviewImage.push(obj.reviews[i].user.image_url)
                    reviewUrl.push(obj.reviews[i].url)
                }
            }
            // Object to be returned when function is called. Each key contains an array
            yelpReviews = {
                reviewText: reviewText,
                reviewRating: reviewRating,
                reviewTime: reviewTime,
                reviewAuthor: reviewAuthor,
                reviewImage: reviewImage,
                reviewUrl: reviewUrl
            }
            resolve(yelpReviews);
        });
    })
}
