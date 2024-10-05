const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');
const app = express();

const GOOGLE_MAPS_API_KEY = process.env.GOOGLE_MAPS_API_KEY;
const CONVEX_API_KEY = process.env.CONVEX_API_KEY;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.post('/submit-pin', async (req, res) => {
  const { latitude, longitude } = req.body;
  if (!latitude || !longitude) {
    return res.status(400).send('Latitude and longitude are required');
  }

  try {
    // Store pin in Convex backend
    await axios.post('https://convex.example.com/api/pins', {
      latitude,
      longitude
    }, {
      headers: {
        'Authorization': `Bearer ${CONVEX_API_KEY}`
      }
    });

    res.status(200).send('Pin submitted successfully');
  } catch (error) {
    console.error('Error submitting pin:', error);
    res.status(500).send('Error submitting pin');
  }
});

app.get('/map', (req, res) => {
  const mapUrl = `https://maps.googleapis.com/maps/api/js?key=${GOOGLE_MAPS_API_KEY}&callback=initMap`;
  res.send(`<!DOCTYPE html>
<html>
<head>
  <title>Map</title>
  <script src="${mapUrl}"></script>
  <script>
    function initMap() {
      const map = new google.maps.Map(document.getElementById('map'), {
        zoom: 4,
        center: { lat: -25.344, lng: 131.036 }
      });

      // Fetch pins from Convex backend and place them on the map
      fetch('/api/pins')
        .then(response => response.json())
        .then(pins => {
          pins.forEach(pin => {
            new google.maps.Marker({
              position: { lat: pin.latitude, lng: pin.longitude },
              map: map
            });
          });
        });
    }
  </script>
</head>
<body>
  <div id="map" style="height: 500px; width: 100%;"></div>
</body>
</html>`);
});

app.listen(3000, () => {
  console.log('Server started on port 3000');
});
