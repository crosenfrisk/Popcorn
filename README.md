# Popcorn!
Movie and Show Suggestions *for You!*

## Table of Contents

* [Description](#Description)
* [Process](#Process) 
* [Challenges](#Challenges)
* [Implementation](#Implementation)
* [Who Did What](#Who-Did-What)
* [View the Project](#View-The-Project)
* [Future Enhancements](#Future-Enhancements)
* [Installation and Use](#Installation-and-Use)
* [Technologies Used](#Technologies-Used) 
* [Server-Side APIs](#Server-Side-APIs)
* [Credits](Credits)
* [MIT License](#MIT-License)

## Description

**Popcorn!** is a mobile-friendly application that helps users connect with new content based on personalized keyword searches, genres selected, and trending shows / movies according to two open source APIs: Online Movie Database and The Movie DB.

When a user clicks on a poster image, they can read the synopses of any movie or show. By clicking "Save" users can store movies and shows in a customized "Watchlist" and can later remove items from their Watchlist after viewing.


## Process

We wanted our application to provide a solution to a problem we feel is relevant to people of all ages in our society who grapple with indecision when it comes to at-home entertainment. Having spent the last two years at home during a global pandemic, streaming services have become a top form of entertainment when going out is less of a possibility. However, the more time we spend at home, the less we might feel we have options, or that we've "seen everything." Streaming services frequently only promote content within their own platform, keeping users insulated and perhaps leading to what feels like boredom or lack of options. While algorithms can sometimes be useful, sometimes letting a consumer choose a show or movie based on mood, selecting a genre or typing a keyword, giving users a sense of autonomy and choice. We hope our application's simple design and interface is intuitive for all.

USER STORY: 
AS AN indecisive media consumer 
I WANT TO select options based on preferences such as genre or popularity 
SO THAT I am presented with new media content to enjoy.

## Challenges

Each member of the group expressed concerns about contributing to the project based on their strengths and weaknesses. We found that daily Zoom meetings weren't an issue, nor were the git pull requests as daunting as we thought. Frequent communication through Slack helped us feel more confident as we created new features and functions, and we worked together to solve bugs as they arose.

Having diverse schedules sometimes made progress a little slower than we would have liked, but we are quite proud of how the project turned out overall in our two-week time frame.

## Implementation

After creating a User Story, we created a group repository and a Project (Kanban) board. We spoke about the areas we felt strongest about, and delegated tasks as needed. As new issues arose we assigned them in the Issues page of the repository and pinned / moved the issues around the Project board on GitHub.

By the end of Week 1 we had our app functioning as desired, so we moved on to improving UI/UX and cleaning up the visual appearance of the application. We prepared and delivered our presentation, and submitted our project ahead of schedule. We did discuss the possibility of future enhancements to the project and agreed we would be open to making changes together in the future.

## Who Did What

Claire acted as SCRUM master, lead communicator. She created the initial repository and files in VSC for the main branch and created the develop branch. She created the wireframe images for Desktop, Tablet, and Mobile as listed in the images folder using `Draw.io`. Claire assisted with JavaScript by creating the `loadGenres()` function and the `searchByGenres()` function. She created the `modal.js` file, designed the `dummyposter.png` for missing poster results, wrote the `about.html` content, and took the lead on creating the presentation using `docs.google.com/presentation`. Created favicon and implemented initial CSS (color changes) as placeholder for CSS from teammates in preparation for presentation. Shared idea of "how-to" remove single item from watchlist, which was then designed by Colin.

Colin mostly worked on the JavaScript file, handling DOM manipulation, fetch requests, and localStorage. He set up localStorage to handle saving/loading items in the user's Watchlist. He used a variety of endpoints from TMDB API, including Configuration for creating poster urls, Trending for the Top 10, Search for tv shows/movies based on user input, and Watch Providers for where to stream TV Shows. He handled fetch requests from OMDB API to get further information on movies by IMDB ID. He also spent time finding edge cases and fixing bugs,refactoring the functions to handle different kinds of data returned from different endpoints, and adding behavior to account for missing/bad data from the API.

<!-- Omar took on studying Bulma, a CSS framework like Bootstrap, to help design the look and flow of our application. He tied our modal to our JS. He also offered to do the Keyword search JS, so the function that works is a mix of his and Colin's work. Omar, please write whatever you'd like to say here!-->

<!-- Jake felt the most confident working with CSS. He helped make sure our page was responsive for mobile and tablet users with specialized media queries. Jake, please feel free to add more details here! -->


## View The Project

![Screenshot of Project](/assets/images/screenshot2.png)

[Link to Deployed Project](https://crosenfrisk.github.io/Popcorn/)

## Future Enhancements

* Rating Content 👍👎 || ⭐⭐⭐/⭐⭐⭐⭐⭐

* User Notes Section ✍

* UI/UX enhancements for swipe rather than click 👆

* Ability to share or export user watchlists 💬

* List of where the content can be streamed or rented. Currently this does not populate for each API fetched item. 📺

## Installation and Use

To use the app, simply visit the [deployed site](https://crosenfrisk.github.io/Popcorn/).

If you would like to play with the app, please use the fork option <img src="assets\images\code-branch-solid.svg" width="10" height="10"> or use the <CODE CLONE> button on GitHub, copy the SSH or HTTPS key and then use the command line prompt within Git Bash $ git clone git@github.com:crosenfrisk/Popcorn.git [and hit enter], this should save the file locally to your device.

After downloading the project from GitHub to your local device, open the Popcorn repository in a code editor such as Visual Studio Code, then view index.html in your web browser or Live Server.

Any questions, feedback, or ideas for future development, please comment @crosenfrisk, @soundproofboot, @osamarli, @jakeradermacher 💌


## Technologies Used

* [Bulma](https://bulma.io/)
Used for styling our CSS

* [Canva](https://www.canva.com/)
Used for the creation of dummy movie poster for "missing" posters.

* [Draw.io](https://app.diagrams.net)
Used for creation of wireframes

* **Font Awesome** for fork icon in README, with possible future use in application.

* **GitHub** for our repository and project/Kanban board.

* **Google Docs** for project proposal and presentation.

* **Slack** for ongoing communication between group members.

* **Zoom** for group meetings.


## Server-Side APIs:

USED: 
* [The Movie DB](https://developers.themoviedb.org) -- for the movie posters, genres, descriptions. Allows more comprehensive ways to search for recommendations.
Endpoints used - Configuration, Genres, Search, Trending, Watch Providers

* [OMDB](https://www.omdbapi.com/) -- for in depth details for movies.
Endpoints used - Search by IMDB ID

CONSULTED:
* [IMDB](https://imdb-api.com) -- referenced but not used.
* [Rotten Tomatoes](https://developer.fandango.com/rotten_tomatoes) -- referenced but not used.


## Credits

🎉 @nightmarefails for hosting office hours and sharing feedback. Gratitude to our classmates for their enthusiasm and support for our project.

## MIT License

Copyright &copy;2022 Omar Asamari, Colin Bares, Jake Radermacher, and Claire Rosenfrisk.

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
