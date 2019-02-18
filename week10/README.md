# WEEK 10 HOMEWORK ASSIGNMENT

<p>This week's homework assignment was to create a Command Line Interface App (LIRI Bot). The app allows users to input a variety of commands. We were tasked with using Node.JS, node packages such as Axios and Spotify-npm-API.</p>

## CHALLENGES
* Getting used to only working from the command line.
* Having to manage a varying amount of data coming back from different calls, each structured differently.
* Formatting the way the data is displayed on the console to my liking.

 ### COMMAND TYPES:
#### concert-this - <p>"concert-this" followed by the name of a music artist or band, calls the 'bandsintown' API, and bring up a list of upcoming concerts. It will display certain info about the event, such as:</p>
 * The name of the venue
 * The venue's location
 * The date of the venue

#### spotify-this-song - <p>"spotify-this-song" followed by the name or title of a song, will make a call to the Spotify API package and display a certain amount of results (I limited it to 10). For each result, it will display:</p>
 * The name of the song
 * The artist's name 
 * The name of the album it is in
 * A link to a preview of the song


#### movie-this - <p>"movie-this" followed by the title of a movie, will call the OMDb API and display the desired data. The user will be shown:</p>
  * Title of the movie.
  * Year the movie came out.
  * IMDB Rating of the movie.
  * Rotten Tomatoes Rating of the movie.
  * Country where the movie was produced.
  * Language of the movie.
  * Plot of the movie.
  * Actors in the movie.

#### do-what-it-says - <p>"do-what-it-says" does not need to be followed up with a second command value. This command reads from the file 'random.txt', and inputs the text into a command. (Example: random.txt has the words 'spotify-this-song,hello' written inside of it. It will take the first half ('spotify-this-song') and input that into the command type. It will do the same for the second half of the text, except it will input it into the second command value relating to the command type (in this case, searching the spotify API).

