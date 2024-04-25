import requests

API_KEY = 'AIzaSyC5GbePcqqgPe5OV4vKMr7zUvyb0zVD5rY'
endpoint = 'https://maps.googleapis.com/maps/api/directions/json'
params = {
    'origin': '起始地點',
    'destination': '目的地點',
    'key': API_KEY
}

response = requests.get(endpoint, params=params)
directions = response.json()

print(directions)
