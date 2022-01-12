# Popcorn!
Movies and Film Suggestions for You!

## Table of Contents

* [Description](#Description)
* [Process](#Process) | * [Challenges](#Challenges)
* [Implementation](#Implementation)
* [Who-Did-What](#Who-Did-What)
* [View-the-Project](#View-The-Project)
* [Technologies Used](#Technologies-Used) | * [Server-Side APIs](#Server-Side-APIs)
* [Credits](Credits)
* [License](License)

## Description

**Popcorn!** is a mobile-friendly application that helps users connect with new content based on personalized keyword searches, genres selected, and trending shows / movies according to two open source APIs: Online Movie Database and The Movie DB.

When a user clicks on a poster image, they can read the synopses of any movie or show. By clicking "Save" users can store movies and shows in a customized "Watchlist" and can later remove items from their Watchlist after viewing.


## Process

We wanted our application to provide a solution to a problem we feel is relevant to people of all ages in our society who grapple with indecision when it comes to at-home entertainment. Having spent the last two years at home during a global pandemic, streaming services have become a top form of entertainment when going out is less of a possibility. However, the more time we spend at home, the less we might feel we have options, or that we've "seen everything." Streaming services frequently only promote content within their own platform, keeping users insulated and perhaps leading to what feels like boredom or lack of options. While algorithms can sometimes be useful, sometimes letting a consumer choose a show or movie based on mood (based on genre, run time, etc.) gives users a sense of autonomy and choice. We hope our application's simple design and interface is intuitive for all users.

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

<!-- Colin wrote the majority of the JavaScript functions for Top 10, Watchlist, and even created the Keyword search function. He used the API to help pull results for movie and show descriptions, cleaned up errors, and offered to support CSS design.  Colin, you can write more here, totally whatever you want to say -->

<!-- Omar took on studying Bulma, a CSS framework like Bootstrap, to help design the look and flow of our application. He tied our modal to our JS. He also offered to do the Keyword search JS, so the function that works is a mix of his and Colin's work. Omar, please write whatever you'd like to say here!-->

<!-- Jake felt the most confident in CSS. He designed the background, chose colors, stylized buttons, and make sure everything was mobile responsive using media queries. Jake, please feel free to add more details here! -->


## View The Project

[Screenshot of Project](https://crosenfrisk.github.io/Popcorn/)
## Technologies Used

[Bulma](https://bulma.io/)
Used for styling our CSS

[Draw.io](https://app.diagrams.net)
Used for creation of wireframes

[Canva](https://www.canva.com/)
Used for the creation of dummy movie poster for "missing" posters.

**Google Docs** for project proposal and presentation.

**GitHub** for our repository and Kanban board.

**Screencastify** video screen recorder, for application demo.

**Slack** for ongoing communication.


## Server-Side APIs:

USED: 
* [The Movie DB](https://developers.themoviedb.org) -- for the movie posters, genres, descriptions. Allows more comprehensive ways to search for recommendations.
Endpoints used - Configuration, Genres, Search, Trending

* [OMDB](https://www.omdbapi.com/) -- for in depth details for movies.
Endpoints used - Search by IMDB ID

CONSULTED:
* [IMDB](https://imdb-api.com) -- referenced but not used.
* [Rotten Tomatoes](https://developer.fandango.com/rotten_tomatoes) -- referenced but not used.



## Credits
<!-- * OMDB for their open source API. We used: Discover, Keywords, Genres, and ________ -->
* Canva for poster creation.
* Draw.io for wireframe design.
* Bulma for CSS framework.

## License
