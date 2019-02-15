# Week 8 Group Project

## OVERVIEW
<p>This was the first group project of the course. We were free to build whatever we wanted so long as it met certain requirements.<p>
  
 ## REQUIREMENTS:
 * Must uses at least two APIs
* Must use AJAX to pull data
* Must utilize at least one new library or technology that we haven’t discussed*
* Must have a polished frontend / UI
* Must meet good quality coding standards (indentation, scoping, naming)
* Must NOT use alerts, confirms, or prompts (look into modals!)
* Must have some sort of repeating element (table, columns, etc)
* Must use Bootstrap or Alternative CSS Framework
* Must be Deployed (GitHub Pages or Firebase)
* Must have User Input Validation
* <a href="https://sindygeb.github.io/incredible-ninjas/">First group project (deployed link)</a>
* <a href="https://github.com/sindygeb/incredible-ninjas">Repository link</a>

## PROJECT DESCRIPTION: 
<p>The API we decided we really wanted to use in some way was the <a href="https://www.faceplusplus.com/face-detection/#demo">Face++ API</a>. It is able to take in a picture or link to an image online and returns a variety of data based on the image provided. The only data we wanted was the (supposed) age of the user. Using the age we would calculate what year it was back when the user was 18. (Example being, if the user is 40 then the year in which he was 18 would be 1979.) Taking that year, we would run pass it into a music API to get back the top 10 tracks of that year. Based on set backs and time constraints, we were not able to let the user provide their year manually if they wanted / had to. Along with that, we weren't able to allow the user to upload an image from their device. Looking into it, it would require a back end (PHP) and other technologies we have not covered yet.</p>

## Challenges:

<p>As mentioned above, we ran into a few issues and set backs. One major set back was the application of a music API. Looking around we found that most of them either required authentication types that we didn't have time to learn about from scratch, or that the API was abandoned and not functional. Because of that, we decided to create our own database of tracks and artists. Because of the limited time, we only added the top tracks for one year for the presentation example.</p>
