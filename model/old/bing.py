import asyncio
from EdgeGPT import Chatbot
import json

async def getCountry():
	countryMsg = "Act as if you are a travel agent. You are going to recommend one travel destination for a client based on their profile. The client wants to travel spontaneously and wants you to recommend a semi-random destination. Make sure the destination you choose is feasible given the client’s budget and availability.For example, if a client only has 5 days to travel, you wouldn’t want to recommend a destination in Asia because the client will need more time to visit most countries in Asia. The destination can be a country, city, region, etc. depending on if it fits the client’s timeline. Feel free to look up reviews on websites like Tripadvisor when choosing the location. Do not recommend anywhere in Mexico, the United Kingdom, the Caribbean, or any of the countries the client has already been to; you  want to recommend destinations that the average US traveler hasn’t been to. CLIENT INFO: Your client is Andrew. Andrew is a 20 year old male from the United States of America. He is going to be traveling with one other person and they are flying out of Chicago. He is leaving on May 8th and wants to return on May 19th. His budget for the whole trip is $3000. He has been to these countries before: the United States, Costa Rica, France, Italy, Switzerland, Germany, Mexico, the Caribbean, Japan, and Spain. The reason he travels is because he loves the feeling of exploring a new place."
	countries = ["Afghanistan", "Albania", "Algeria", "Andorra", "Angola", "Antigua and Barbuda", "Argentina", "Armenia", "Australia", "Austria", "Azerbaijan", "Bahamas", "Bahrain", "Bangladesh", "Barbados", "Belarus", "Belgium", "Belize", "Benin", "Bhutan", "Bolivia", "Bosnia and Herzegovina", "Botswana", "Brazil", "Brunei", "Bulgaria", "Burkina Faso", "Burundi", "Cabo Verde", "Cambodia", "Cameroon", "Canada", "Central African Republic (CAR)", "Chad", "Chile", "China", "Colombia", "Comoros", "Costa Rica", "Cote d'Ivoire", "Croatia", "Cuba", "Cyprus", "Czech Republic", "Democratic Republic of the Congo", "Denmark", "Djibouti", "Dominica", "Dominican Republic", "Ecuador", "Egypt", "El Salvador", "Equatorial Guinea", "Eritrea", "Estonia", "Eswatini (formerly Swaziland)", "Ethiopia", "Fiji", "Finland", "France", "Gabon", "Gambia", "Georgia", "Germany", "Ghana", "Greece", "Grenada", "Guatemala", "Guinea", "Guinea-Bissau", "Guyana", "Haiti", "Honduras", "Hungary", "Iceland", "India", "Indonesia", "Iran", "Iraq", "Ireland", "Israel", "Jamaica", "Japan", "Jordan", "Kazakhstan", "Kenya", "Kiribati", "Kosovo", "Kuwait", "Kyrgyzstan", "Laos", "Latvia", "Lebanon", "Lesotho", "Liberia", "Libya", "Liechtenstein", "Lithuania", "Luxembourg", "Madagascar", "Malawi", "Malaysia", "Maldives", "Mali", "Malta", "Marshall Islands", "Mauritania", "Mauritius", "Micronesia", "Moldova", "Monaco", "Mongolia", "Montenegro", "Morocco", "Mozambique", "Myanmar (formerly Burma)", "Namibia", "Nauru", "Nepal", "Netherlands", "New Zealand", "Nicaragua", "Niger", "Nigeria", "North Korea", "North Macedonia (formerly Macedonia)", "Norway", "Oman", "Pakistan", "Palau", "Palestine", "Panama", "Papua New Guinea", "Paraguay", "Peru", "Philippines", "Poland", "Portugal", "Qatar", "Republic of the Congo", "Romania", "Russia", "Rwanda", "Saint Kitts and Nevis", "Saint Lucia", "Saint Vincent and the Grenadines", "Samoa", "San Marino", "Sao Tome and Principe", "Saudi Arabia", "Senegal", "Serbia", "Seychelles", "Sierra Leone", "Singapore", "Slovakia", "Slovenia", "Solomon Islands", "Somalia", "South Africa", "South Korea", "South Sudan", "Spain", "Sri Lanka", "Sudan", "Suriname", "Sweden", "Syria", "Taiwan", "Tajikistan", "Tanzania", "Thailand", "Timor-Leste", "Togo", "Tonga", "Trinidad and Tobago", "Tunisia", "Turkey", "Turkmenistan", "Tuvalu", "Uganda", "Ukraine", "United Arab Emirates", "United Kingdom", "Uruguay", "Uzbekistan", "Vanuatu", "Vatican City (Holy See)", "Venezuela", "Vietnam", "Yemen", "Zambia", "Zimbabwe"]

	bot = Chatbot(cookiePath='./cookies.json')
	response = await bot.ask(prompt = countryMsg)	
	await bot.close()

	print(response["item"]["messages"][1]["text"])

	#returns just the country name
	for word in response["item"]["messages"][1]["text"]:
		if word in countries:
			return word
	print('no country found')
	return "[Pick a  RANDOM EXOTIC COUNTRY THAT THE CLIENT HAS NEVER BEEN TO]"

async def getItinerary(country):
	itineraryMsg = "In less than 1000 characters, create a brief itinerary for your client who wants to travel to " + country + "based on their preferences. In the itinerary, estimate the costs; make sure the flight estimation costs are roughly accurate. You don’t have to explain every detail in the itinerary…you’re giving it to your client just so they have a general idea of what to do in the destination and what their trip will generally look like."

	bot = Chatbot(cookiePath='./cookies.json')
	response = await bot.ask(prompt = itineraryMsg)	
	await bot.close()

	return '\n\n' + response["item"]["messages"][1]["text"]


#main
if __name__ == "__main__":
	country = asyncio.run(getCountry())
	print(f"Your client wants to travel to {country}!")
	print()
	print()

	print(asyncio.run(getItinerary(country)))
