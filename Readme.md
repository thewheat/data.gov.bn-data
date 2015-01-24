# Data extractiong from data.gov.bn

for [Brunei Geek Meet #6 - all about that data](http://www.meetup.com/BruneiGeekMeet/events/219892386/)

Data from: [http://data.gov.bn](http://data.gov.bn)

Folders

- /dist
	- data.gov.bn.json : the json representation of the data.gov.bn site
	- readme.txt : explains the format of the json file
- /scraper
	- scrapes data.gov.bn website with CasperJS and saves a HTML page with links to all attachments (saves in "download-attachments" folder)
- /download-attachments
	- contains all correct attachments in the "attachments" folder. attachments are referenced in the /dist/data.gov.bn.json
