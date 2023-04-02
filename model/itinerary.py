import os
import openai
import json
from dotenv import load_dotenv
import requests

load_dotenv() # Load environment variables from .env file
openai.api_key = os.getenv('OPEN_AI_KEY')

#open json file

# Open the JSON file for reading
with open('data/jotform.json', 'r') as file:
    # Load the contents of the file into a variable
    jotform = json.load(file)

query = {
	'first': jotform['5']['answer']['first'],
	'birthday': jotform['6']['prettyFormat'],
    'budget': int(jotform['37']['answer']),
    'visited': jotform['38']['answer'],
    'fly_from': jotform["34"]["answer"],
    'date_from': jotform["35"]["answer"]["month"]+ ' ' + jotform["35"]["answer"]["day"],
	'date_to': jotform["36"]["answer"]["month"]+ ' ' + jotform["36"]["answer"]["day"],
    'numPassengers': int(jotform['3']['answer']),
    'gender': jotform['7']['answer']
}

system_intel = 'You are a experienced travel agent. You are going to recommend one travel destination for a client based on their profile. The client wants to travel spontaneously and wants you to recommend a random destination. Make sure the destination you choose is feasible given the client’s budget and availability. For example, if a client only has 5 days to travel, you wouldn’t want to recommend a destination in Asia because the client will need more time to visit most countries in Asia. DO NOT recommend anywhere in Mexico, Canada, the United Kingdom, the Caribbean. DO NOT recommend any of the countries the client has already been to. DO NOT recommend the most visited mainstream European cities. DO recommend destinations that the average US traveler hasn’t been to. For destination recommendation, only output the country name, nothing else.  For itinerary generation, make each day sound exciting!'
prompt = f"Your client is {query['first']}. {query['first']} is a {query['gender']} from the United States of America. He is going to be traveling with {query['numPassengers']} other people and they are flying out of {query['fly_from']}. He is leaving on {query['date_from']} and returns on {query['date_to']}. The budget for the whole trip is {query['budget']}. They have been to these countries before: {query['visited']}. The reason they travel is because they love the feeling of exploring a new place. Where should they go?"
prompt2 = "Create an itinerary!"
messages = [
    	{"role": "system", "content": system_intel}, 
    	{"role": "user", "content": prompt}
    ]

# Get country name
response = openai.ChatCompletion.create(
	model="gpt-4",
	max_tokens= 2048,
	temperature=1,
	messages=messages
    )

country = response['choices'][0]['message']['content']
messages.append({"role": "assistant", "content": country})
messages.append({"role": "user", "content": prompt2})

# Get itinerary
response = openai.ChatCompletion.create(
	model="gpt-4",
	max_tokens= 2048,
	temperature=1,
	messages=messages
    )
itinerary = response['choices'][0]['message']['content']

# Get country description
system_intel = "You are an experienced travel agent and who gets very excited when people go to new places. In a few paragraphs, get the user excited about where they are going and explain why that country is amazing! Don't write a concluding paragraph where you restate what was already said."
prompt = country
messages = [
    	{"role": "system", "content": system_intel}, 
    	{"role": "user", "content": prompt}
    ]

response = openai.ChatCompletion.create(
	model="gpt-4",
	max_tokens= 2048,
	temperature=1,
	messages=messages
    )
description = response['choices'][0]['message']['content']



# Get Photo URLs from unsplash
url = f"https://api.unsplash.com/search/photos?query={country}&client_id={os.getenv('UNSPLASH_KEY')}"
response = requests.get(url)

photo1 = response.results[0].urls.regular
photo2 = response.results[1].urls.regular
photo3 = response.results[2].urls.regular
photo4 = response.results[3].urls.regular

result ={
    "country": country, 
    "description": description,
    "itinerary": itinerary,
    "photos": [photo1, photo2, photo3, photo4]
}

# Write to itinerary.json
with open('data/itinerary.json', 'w') as file:
	# Save dictionary into this file
	json.dump(result, file, indent = 4)



