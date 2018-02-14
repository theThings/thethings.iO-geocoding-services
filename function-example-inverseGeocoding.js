var GOOGLE_API_KEY = 'YOUR GOOGLE API KEY';

function main(params, callback) {
       thethingsAPI.getProductThings(function (err, things) {
           async.eachSeries(things, function (thing, next) {
                   async.waterfall([
                              async.apply(getCoordinates, thing),
                              async.apply(calculateAddress, thing.thingToken)
                        ], function(err, results) {
                                  return next();
                                });
                },function(err, result) {
                  if( err ) {
                    // One of the iterations produced an error.
                    // All processing will now stop.
                    console.log('A thing failed to process');
                  }
                  else
                  {
                    console.log('All things have been processed successfully');
                  }
                  callback(err, 'done');
                })
              })
            }

 function getCoordinates(thing, callback)
 {
      thethingsAPI.thingRead(thing.thingToken, "$settings.geo", function(err,result){
          if(err)
          {
              console.log('Error reading location of thing');
              return callback(true);
          }
          else if (result[0].value == null)
          {
              return callback(true);
          }
          else
          {
             return callback(null,result[0].value);
          }
       })
 }

 function calculateAddress(thingToken, coordinates, callback) {
     var result = [];
     if(coordinates == null || 'ZERO_RESULTS')
     {
       return callback(null,'prueba')
     }
     if (GOOGLE_API_KEY == 'YOUR GOOGLE API KEY') {
         result.push({
             'key': 'GMapsErrors',
             'value': "Google Api Key not configured"
         });
         return callback(null, result);
     } else {
         var latitude = coordinates.lat;  // the argument coordinates must be an object that contains latitude and longitude as properties.
         var longitude = coordinates.long;
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
             return callback(null,result)
         });
     }
 }
