var OPENCAGE_KEY = 'Your OpenCage Geocoder API key here'

function calculateAddress(thingToken, coordinates, callback) {
    var result = [];
    if (OPENCAGE_KEY == 'Your OpenCage Geocoder API key here') {
        result.push({
            'key': 'OpenCageErrors',
            'value': "OpenCage Geocoder API key not configured"
        });
        return callback(null, result);
    } else {
        var latitude = coordinates.latitude;  // the argument coordinates must be an object that contains latitude and longitude as properties.
        var longitude = coordinates.longitude;
        var location = latitude +'+'+ longitude;
        httpRequest({
            host: 'api.opencagedata.com',
            path: '/geocode/v1/json?q=' + location + '&key=' + OPENCAGE_KEY,
            method: 'GET',
            secure: true
        }, function(err, res) {
           //return callback(null,res);
            res = JSON.parse(res.result);
            if (err) return callback(err);
            if (res = []) {
  				    result.push({
                      'key': 'OpenCageErrors',
                      'value': "OpenCage Message: " + res.error.message
                  });
                  return callback(null, result);
            }
            result.push({
                    'key': 'address',
                    'value': res.results[0].formatted
            })
            return thethingsAPI.thingWrite(thingToken, {'values' : result}, params, callback)
        });
    }
}
