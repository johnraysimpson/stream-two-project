# Stream Two Project - Single Page Application - Destination Unknown

In this project I was briefed to create a single page application which allows users to input a destination and find accommodation, attractions and bars and restaurants in that area. With the use of different technologies my website achieves this in a user friendly way.

## UX

This website is for people who wish to go on holiday and plan what they want to do there using the Google Maps and Places API.

The imagery used makes the user aware of what this page is for, with the use of placeholders, jQuery events and Google Maps search results it gives the user clear instructions for what they need to do.

All links for companies of corresponding search results will open in a new page, meaningthe user can return to their search after browsing the company site.

Markers coincide with the colour of the buttons to ensure the user knows what they are searching, the button will change style depending on which one has been clicked.

## Features

Features come from Bootstrap, jQuery, the Google Maps and Places API and written by myself.

### Existing Features

The searching for particular types of locations was inspired by a Google Places example (https://developers.google.com/maps/documentation/javascript/examples/places-autocomplete-hotelsearch), the changes I made are below:
* The starting location is somewhere in the North Atlantic with a zoom of 2, this is to invoke a feeling that the user could go anywhere, with this I removed the country option and added bounds to retrieve all the cities around the world.
* Moved the searchInArea function out of the autocomplete and applied it to the buttons which only appear after a city has been searched.
* Added jQuery events for when a button is clicked.
* Changed the markers to different colours depending on search type, removed the addition of letters to icon.
* Kept most of the info window functionalityas it did exactly what I wanted it to do, made some stylistic changes and made the URL of the company clickable and opens a new tab.

When commiting to a city search, the buttons will be displayed using jQuery events.

The map can still be panned and zoomed after a city search, giving the user freedom to search in surrounding areas.

The buttons will change style when selected, the style will be removed and added to a different button if clicked on.

### Features left to implement

In the future, it would be good to have some sort of list creator that users can add to based on the searches so they have something to reference when planning their trip further.

There is scope to have more location type searches, I used the ones I think most people look for when planning a trip.

## Technologies used

* HTML
* CSS
* JavaScript
* Bootstrap (3.3.7)
* jQuery (3.2.1)
* Google Maps API
* Google Places API

## Testing

* I tested different grid columns using Bootstrap to see what was more aesthetically pleasing.
* I made sure to test the functionality of the city search and the location searches, ensuring that the button do not appear until a city was entered and that the location searches returned the correct results.
* Originally I wanted to have one button for all attractions and all food and drink, but it turns out the Google Places API doesn't support searches of many "types" (e.g you can't search "shopping" and "museums" at the same time). However, I prefer having multiple buttons, it ensures that not too many search results are returned or omitted.
* It took me quite some time to refactor the code. Before I had the "searchInArea" function within the call functions multiple times and found it difficult to pass through arguments to change the type of location and the colour of the marker. It turns out, with jQuery events (like "click()") you need topass through arguments as a set of data, it can be seen in the code I have written.
* This application works on devices of different screen sizes. However, when I tested this on a phone, the screen would zoom in slightly which I did not want to happen. I found out that if you set thefont size to 16px, this doesn't happen, which worked.

## Deployment

This site is hosted using GitHub pages, deployed directly from the master branch and can be accessed using this link https://johnraysimpson.github.io/stream-two-project/. The deployed site will update automatically upon new commits to the master branch. In order for the site to deploy correctly on GitHub pages, the landing page must be named index.html.

To run locally, you can clone this repository directly into the editor of your choice by pasting git clone https://github.com/johnraysimpson/stream-two-project.git into your terminal. To cut ties with this GitHub repository, type git remote rm origin into the terminal.

## Credits

### Content

* The information such as the name, phone number and email address is fictional.

### Media

* Images were found from free image websites.

### Acknowledgements

* As mentioned, the code in the hotels search example (https://developers.google.com/maps/documentation/javascript/examples/places-autocomplete-hotelsearch) was incredibly useful with understanding how the APIs are used and how to adapt these for my project.
* This page (https://stackoverflow.com/questions/3273350/jquerys-click-pass-parameters-to-user-function) was very helpful in overcoming my jQuery click refactoring problem.
* Myself and my partner go abroad quite frequently, so her input was very useful. I'm sure I'll be using this next time we travel.