# using SendGrid's Python Library
# https://github.com/sendgrid/sendgrid-python
import os
from sendgrid import SendGridAPIClient
from sendgrid.helpers.mail import Mail
from dotenv import load_dotenv

load_dotenv() # Load environment variables from .env file
# Open the JSON file for reading
with open('../view/pages/email.html', 'r') as file:
    # Load the contents of the file into a variable
    html = file.read()


message = Mail(
    from_email='andrewv433@gmail.com',
    to_emails='avittig2@nd.edu',
    subject='The Wander Team Invites You To Explore!',
    html_content=html)
try:
    sg = SendGridAPIClient(os.getenv('SENDGRID_API_KEY'))
    response = sg.send(message)
    print(response.status_code)
    print(response.body)
    print(response.headers)
except Exception as e:
    print(e)