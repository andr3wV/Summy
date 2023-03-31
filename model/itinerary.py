#TODO: Change prompt to be dynamic with user input

import os
import openai
import json
from dotenv import load_dotenv

load_dotenv() # Load environment variables from .env file
openai.api_key = os.getenv('OPEN_AI_KEY')

#open json file

# Open the JSON file for reading
with open('data/jotform.json', 'r') as file:
    # Load the contents of the file into a variable
    jotform = json.load(file)

query = {
	'first': jotform['4']['answer']['first'],
	'birthday': jotform['65']['prettyFormat'],
    'budget': int(jotform['56']['answer']),
    'visited': jotform['58']['answer'],
    'fly_from': jotform["51"]["answer"],
    'date_from': jotform["53"]["answer"]["month"]+ ' ' + jotform["53"]["answer"]["day"],
	'date_to': jotform["54"]["answer"]["month"]+ ' ' + jotform["54"]["answer"]["day"],
    'numPassengers': int(jotform['50']['answer']),
    'gender': jotform['3']['answer']

}


system_intel = 'You are a experienced travel agent. You are going to recommend one travel destination for a client based on their profile. The client wants to travel spontaneously and wants you to recommend a random destination. Make sure the destination you choose is feasible given the client’s budget and availability. For example, if a client only has 5 days to travel, you wouldn’t want to recommend a destination in Asia because the client will need more time to visit most countries in Asia. DO NOT recommend anywhere in Mexico, Canada, the United Kingdom, the Caribbean. DO NOT recommend any of the countries the client has already been to. DO NOT recommend the most visited mainstream European cities. DO recommend destinations that the average US traveler hasn’t been to. For destination recommendation, only output the country name, nothing else.  For itinerary generation, make each day sound exciting!'
prompt = f"Your client is {query['first']}. {query['first']} is a {query['gender']} from the United States of America. He is going to be traveling with {query['numPassengers']} other person and they are flying out of {query['fly_from']}. He is leaving on {query['date_from']} and returns on {query['date_to']}. The budget for the whole trip is {query['budget']}. They have been to these countries before: {query['visited']}. The reason they travels is because they love the feeling of exploring a new place. Where should they go?"
prompt2 = "Create an itinerary!"
messages = [
    	{"role": "system", "content": system_intel}, 
    	{"role": "user", "content": prompt}]

response = openai.ChatCompletion.create(
	model="gpt-4",
	max_tokens= 2048,
	temperature=1,
	messages=messages
    )

country = response['choices'][0]['message']['content']
messages.append({"role": "assistant", "content": country})
messages.append({"role": "user", "content": prompt2})

response = openai.ChatCompletion.create(
	model="gpt-4",
	max_tokens= 2048,
	temperature=1,
	messages=messages
    )
itinerary = response['choices'][0]['message']['content']

print(country)
print(itinerary)
