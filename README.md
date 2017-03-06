# HostMe

A clone of AirBnb where users can search for rooms, create a profile, send and recieve messages,
add rooms to their favorites list, and edit rooms/experiences. 

Group project with Tami Rogers, Lisa Thomas, and Kevin Fernandez 


**Required Tools**
```
--Backend--
SQL Server
Entity Framework
ASP Web API

--Frontend--
HTML5
CSS Frameworks
Angular
Angular UI Router
ngSweetAlert
Angular Local Storage
Angular Social Login
Angular Filepicker
Font Awesome
```

## App Requirements
- Create a Facebook social login page to get the user's name and email from  Facebook and save to the database. 
- Basic messaging
- Remote hosted property images
- Favorites
- Font Awesome icons 

## Pages
- Facebook social login page 
- Top navigation bar with RoomMe icon, Profile, Listings, Add Listing and Login nav links
- Home Page
	- shows the top nav bar
	- displays content promoting the site
	- has a link to show property listings
- Listings Page
	- displays a grid of panels of all available listings
	- search feature
- Listing Detail Page
	- shows additional detail data on the listing
	- ability to add to favorites to rent
	- ability to contact host using a message form
	- message history to display in a table below message form
- Add Listing Page Fields
	- Address
	- City
	- State
	- Zip
	- Price
	- Description
	- Filepicker button to add image
	- Add Listing Button
- Profile Page
	- displays user profile detail
	- ability to edit custom user profile data
		- zip code
		- contact phone
		- birthdate
		- password
		- email
		- username
	- link to messages
	- link to logout
	- table of favorites to rent
	- ability to add property to list as host
	- display user's properties with edit / delete buttons
- Messages Page
	- displays table of messages to/from user with links to show individual message detail
