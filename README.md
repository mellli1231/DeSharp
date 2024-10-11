# DeSharp Vancouver!

Site: https://de-sharp.vercel.app/

Striving for a safer Vancouver, we wanted to create a solution that will help tackle the ongoing opioid crisis in Vancouver. A key part of this is the leftover needles discarded on the ground, which pose a significant danger to anybody around them. This is why we came together and created DeSharp: a tool to help significantly decrease the number of needles lying around.

DeSharp is a web-based app meant for government or non-profit use. The public facing page allows any user who has come across a needle to easily report it to our staff. They take a photo of the needle, and submit a report along with their name and a comment, and it uses the default HTML geolocation library to pull latitude and longitude to submit as well. Both the public and admin side now see these reports as pins on the map, and the government/non-profit staff can dispatch teams to collect these sharps.

It began off as an idea for a mobile app via android studio, but we quickly pivoted to a web app, utilizing Defang to quickly build up a skeleton for the project. We then built the rest in VS Code starting first with connecting it to a convex database, then using the reports in a database to visualize these reports as pins on a map.

Although we would love to say we got this on our first try, we went through several iterations of DeSharp before landing on the one we have today. We initially wanted to implement an image verification feature but due to time constraints that will be saved for a future release.

One accomplishment we are proud of is our implementation of the addition and removal of reports on the map. We initially wanted to have a heat map display all reports but we ended up leveraging the Google Maps API to display a functioning map on our main page and add reports in the form of red pins at the location of reports

Throughout the project, we learned a lot about databases through the implementation of convex, how to better integrate APIs, and overall more about frontend development.

As for future releases, you can look forward to an AI image recognition being implemented to automate verification of needles and a feature to give staff the best route to take to pass by the most reports. Stay tuned!
