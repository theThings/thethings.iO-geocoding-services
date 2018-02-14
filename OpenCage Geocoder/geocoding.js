var OPENCAGE_KEY = 'Your OpenCage Geocoder API key here'

function calculateCoordinates(thingToken, address, callback) {
    var result = [];
    if (OPENCAGE_KEY == 'Your OpenCage Geocoder API key here') {
        result.push({
            'key': 'OpenCageErrors',
            'value': "OpenCage Geocoder API key not configured"
        });
        return callback(null, result);
    } else {
        var location = address.replace(/[^\x00-\x7F]/g,'').replace(/ /gi,'%20');
        httpRequest({
            host: 'api.opencagedata.com',
            path: '/geocode/v1/json?q=' + location + '&key=' + OPENCAGE_KEY,
            method: 'GET',
            secure: true
        }, function(err, res) {
           //return callback(null,res);
            res = JSON.parse(res.results);
            if (err) return callback(err);
            if (res = []) {
  				    result.push({
                      'key': 'OpenCageErrors',
                      'value': "OpenCage Message: " + res.error.message
                  });
                  return callback(null, result);
            }
            result.push({
                    'key': '$geo',
                    'value': [res[0].geometry.lng, res[0].geometry.lat]
            })
            return thethingsAPI.thingWrite(thingToken, {'values' : result}, params, callback)
        });
    }
}
