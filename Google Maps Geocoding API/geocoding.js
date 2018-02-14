var GOOGLE_API_KEY = 'YOUR GOOGLE API KEY'

function calculateCoordinates(thingToken, address, callback) {
    var result = [];
    if (GOOGLE_API_KEY == 'YOUR GOOGLE API KEY') {
        result.push({
            'key': 'GMapsErrors',
            'value': 'Google Api Key not configured'
        });
        return callback(null, result);
    } else {
        var location = address.replace(/[^\x00-\x7F]/g,'').replace(/ /gi,'%20');
        // The parameter region helps Google to locate the place. It is known that there are several places in the world with the same name.
        httpRequest({
            host: 'maps.googleapis.com',
            path: '/maps/api/geocode/json?address=' + location + '&key=' + GOOGLE_API_KEY + '&region=ES',
            method: 'GET',
            secure: true,
            headers: {
                'Content-Type': 'application/json'
            }
        }, function(err, res) {
           //return callback(null,res);
            res = JSON.parse(res.results);
            if (err) return callback(err);
            if (res.error) {
  				    result.push({
                      'key': 'GMapsErrors',
                      'value': "Google Api Message: " + res.error.message
                  });
                  return callback(null, result);
            }
            result.push({
                    'key': '$geo',
                    'value': [res[0].geometry.location.lng, res[0].geometry.location.lat]
            })
            return thethingsAPI.thingWrite(thingToken, {'values' : result}, params, callback)
        });
    }
}
