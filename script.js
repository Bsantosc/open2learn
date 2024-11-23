// script.js
// script.js
const clientId = import.meta.env.VITE_SPOTIFY_CLIENT_ID;
const clientSecret = import.meta.env.VITE_SPOTIFY_CLIENT_SECRET;

let accessToken = '';

// Get Spotify Access Token
async function getAccessToken() {
  const response = await fetch('https://accounts.spotify.com/api/token', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      Authorization: `Basic ${btoa(clientId + ':' + clientSecret)}`,
    },
    body: 'grant_type=client_credentials',
  });

  const data = await response.json();
  accessToken = data.access_token;
}

// Fetch Top Tracks
async function fetchTopTracks() {
  if (!accessToken) await getAccessToken();

  const response = await fetch('https://api.spotify.com/v1/tracks?ids=3n3Ppam7vgaVa1iaRUc9Lp,7ouMYWpwJ422jRcDASZB7P', {
    headers: { Authorization: `Bearer ${accessToken}` },
  });

  const data = await response.json();
  displayData('Top Tracks', data.tracks);
}

// Fetch Top Artists
async function fetchTopArtists() {
  if (!accessToken) await getAccessToken();

  const response = await fetch('https://api.spotify.com/v1/artists?ids=6eUKZXaKkcviH0Ku9w2n3V,66CXWjxzNUsdJxJ2JdwvnR', {
    headers: { Authorization: `Bearer ${accessToken}` },
  });

  const data = await response.json();
  displayData('Top Artists', data.artists);
}

// Display Data
function displayData(title, items) {
  const contentDiv = document.getElementById('content');
  contentDiv.innerHTML = `<h2>${title}</h2><ul>` +
    items.map(item => `<li>${item.name}</li>`).join('') +
    '</ul>';
}

// Initialize the page with the token
getAccessToken();
