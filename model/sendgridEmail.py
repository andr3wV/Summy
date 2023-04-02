# using SendGrid's Python Library
# https://github.com/sendgrid/sendgrid-python
import os
from sendgrid import SendGridAPIClient
from sendgrid.helpers.mail import Mail
from dotenv import load_dotenv
import json

load_dotenv() # Load environment variables from .env file
# Open the JSON file for reading
with open('../view/pages/email.html', 'r') as file:
    # Load the contents of the file into a variable
    html = file.read()

with open('data/itinerary.json', 'r') as file:
    data = json.load(file)

html = html.replace('{{{image1}}}', data['photos'][0])
html = html.replace('{{{image2}}}', data['photos'][1])
html = html.replace('{{{image3}}}', data['photos'][2])
html = html.replace('{{{image4}}}', data['photos'][3])
html = html.replace('---mainCountry---', data['country'])
html = html.replace('---description---', data['description'])
html = html.replace('---welcomeCountry---', f"Welcome to {data['country']}!")
html = html.replace('---itinerary---', data['itinerary'])
html = html.replace('{{{lonelyPlanet}}}', "https://www.lonelyplanet.com/" + data['country'].lower())

message = Mail(
    from_email='andrewv433@gmail.com',
    to_emails='avittig2@nd.edu',
    subject='Your trip is booked!',
    html_content=html)
try:
    sg = SendGridAPIClient(os.getenv('SENDGRID_API_KEY'))
    response = sg.send(message)
    print(response.status_code)
    print(response.body)
    print(response.headers)
except Exception as e:
    print(e)