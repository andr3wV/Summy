#TODO: Change prompt to be dynamic with user input

import os
import openai
import asyncio
from dotenv import load_dotenv
from EdgeGPT import Chatbot


def getCountry():
	load_dotenv() # Load environment variables from .env file
	api_key = os.getenv('OPEN_AI_KEY') # Get the value of APIKEY1 from environment variables
	openai.api_key = api_key #set API key

	response = openai.Completion.create(
	model="text-davinci-003",
	prompt="Act as if you are a travel agent. You are going to recommend one travel destination for a client based on their profile. The client wants to travel spontaneously and wants you to recommend a semi-random destination. Make sure the destination you choose is feasible given the client’s budget and availability. For example, if a client only has 5 days to travel, you wouldn’t want to recommend a destination in Asia because the client will need more time to visit most countries in Asia. The destination can be a country, city, region, etc. depending on if it fits the client’s timeline.  Do not recommend anywhere in Mexico, Canada, the United Kingdom, the Caribbean, or any of the countries the client has already been to; you want to recommend destinations that the average US traveler hasn’t been to. Also try to avoid most mainstream European cities. Only output the country name, nothing else. CLIENT INFO: Your client is Andrew. Andrew is a 20 year old male from the United States of America. He is going to be traveling with one other person and they are flying out of Chicago. He is leaving on May 8th and wants to return on May 19th. His budget for the whole trip is $3000. He has been to these countries before: the United States, Costa Rica, France, Italy, Switzerland, Germany, Mexico, the Caribbean, Japan, and Spain. The reason he travels is because he loves the feeling of exploring a new place. ",
	temperature=0.7,
	max_tokens=50,
	top_p=1,
	frequency_penalty=0,
	presence_penalty=0
	)
	print(response)
	return response

async def getItinerary(country):
	itineraryMsg = f"In less than 1000 words, create an full itinerary for your client for the country of {country}. In the itinerary, estimate the costs. The client is Andrew. Andrew is a 20 year old male from the United States of America. He is going to be traveling with one other person and they are flying out of Chicago. He is leaving on May 8th and wants to return on May 19th. His budget for the whole trip is $3000. The reason he travels is because he loves the feeling of exploring a new place. Please keep it to less than 1000 words!"

	bot = Chatbot(cookiePath='./cookies.json')
	response = await bot.ask(prompt = itineraryMsg)	
	response2 = await bot.ask(prompt = "Continue")
	response3 = await bot.ask(prompt = "Continue")
	await bot.close()

	return [response["item"]["messages"][1]["text"], response2["item"]["messages"][1]["text"], response3["item"]["messages"][1]["text"]]

async def main():
	country = getCountry()
	itinerary = await getItinerary(country)
	print(itinerary)

# Call the main function to start the event loop and run the coroutine
asyncio.run(main())
