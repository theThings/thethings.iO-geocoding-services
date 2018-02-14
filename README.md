# thethings.iO-geocoding-services

At thethings.iO we usually receive the location as geographic GPS coordinates (latitude and longitude). It is known that it is the best way if you want to represent your assets on a map. However, geographic coordinates are not meaningful if they are not represented on a map. That’s why some customers ask us for the possibility of the integration of geocoding services in thethings.iO IoT platform.

Thanks to the Cloud Code service, we help you to integrate third-party services that enable you to transform the data from your connected things into information that will be useful to your daily activities.

In this repo you can find the functions that handle the httpRequest to the geolocation APIs of Google and OpenCage (both geocoding and inverse geocoding). You can also find two examples:

#### Example 1. Trigger (Inverse geocoding with Open Cage API)
With this code every time you send data to the platform that contain location information, the trigger will be executed and we will transform the coordinates from the resource $settings.geo into a physical address. Then we will save it into the resource address. You just have to create a new trigger in the cloud-code. Then copy and paste the code.

#### Example 2. Function (Inverse geocoding with Google Maps Geocoding API)
In this case, we transform all the addresses of all the things of one product just in one cloud-code execution. Create a new function, choose the product and copy and paste the code from the file. Finally, introduce “{}” in the Preview Params (Check the picture below). The function will calculate the address for all the devices that contain information in the resource $settings.geo and will be saved in the resource address of each thing.
