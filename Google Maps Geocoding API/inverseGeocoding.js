var GOOGLE_API_KEY = 'YOUR GOOGLE API KEY'

function calculateAddress(thingToken, coordinates, callback) {
    var result = [];
    if (GOOGLE_API_KEY == 'YOUR GOOGLE API KEY') {
        result.push({
            'key': 'GMapsErrors',
            'value': "Google Api Key not configured"
        });
        return callback(null, result);
    } else {
        var latitude = coordinates.latitude;  // the argument coordinates must be an object that contains latitude and longitude as properties.
        var longitude = coordinates.longitude;
        var location = latitude + ',' + longitude;
        httpRequest({
            host: 'maps.googleapis.com',
            path: '/maps/api/geocode/json?latlng=' + location + '&key=' + GOOGLE_API_KEY,
            method: 'GET',
            secure: true,
            headers: {
                'Content-Type': 'application/json'
            }
        }, function(err, res) {
           //return callback(null,res);
            res = JSON.parse(res.result);
            if (err) return callback(err);
            if (res.error) {
  				    result.push({
                      'key': 'GMapsErrors',
                      'value': "Google Api Message: " + res.error.message
                  });
                  return callback(null, result);
            }
            result.push({
                    'key': 'address',
                    'value': res.results[0].formatted_address
            })
            return thethingsAPI.thingWrite(thingToken, {'values' : result}, params, callback)
        });
    }
}
