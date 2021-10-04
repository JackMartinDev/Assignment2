# Project title: 3813ICT Assignment 1
## Project Description: Online chat app
### Documentation
**Git organisation**  
For this assignment, GitHub was utilized as the primary remote repository. Each time a new feature was implemented into the code, it was committed to the local repository with a short message describing the new functionality. At the end of each programming session, all of the commits were then pushed to the main branch of the remote repository at GitHub. 

**Data structures**  
Two main data structures are used to manage the data for the project. The first is a JSON file named users.json which contains an array of objects to store each user. Each object contains the username, email, id and role of the user. The second is a JSON file named groups.json which contains an array of objects used to store the information about each group. Each objects contain a group name, an array of users in the group, and an array of channels in the group.

**Angular architecture**  
All components come from the app module base component. From the app module links are provided to the other components, upgradeuser, login, deleteuser, chat, adduser. These components utilize the httpservice for communication. 

**Server Architecture**  
The server is split into 3 sections, data, server, and routes. The data is comprised of json files which are read and written to in various routes. The server file is responsible for creating the server and keeping it live. Each route file contains the appropriate functions required to process the data once the route has been hit.

**Server and client responsibility division**  
All data that was required to be persistent or data that needed to be used over different components was delegated to the server through the use of json files, which were then read using file system methods. All functions that modified and sanitised this data were also handled by the server. The project was designed so that the components were only responsible for displaying the required data and stored as little variables as possible.

**Server-side routes**  
_Authentication route (auth.js)_  
This route takes in the user entered ‘username’ as a parameter and checks the value against the array of user data stored in the users.json file to confirm if they are correct. If the user is not found in the file, a Boolean of false is returned. If the user is found in the file, a Boolean of true as well as an object that represents the user is returned.

_Add user route (adduser.js)_  
This route takes in the user entered ‘username’ and ‘email’ as parameters and looks for the data in the users.json file. If a user with the same user information does not already exist, a new user and created and written back into the json file, and a Boolean of true is then returned. If a user matching the parameter data already exists, write nothing to the json file and return false.

_Delete user route (deleteuser.js)_  
This route takes in the user entered ‘username’ as a parameter and searches the json file for a user with the same name. If the user is found they are then deleted, and the file is rewritten and a return value of true is sent back. If no user with the specified username exists, a Boolean of false is returned.

_Update user route (updateuser.js)_  
This route takes in the user entered ‘username’ and ‘role’ as parameters and searches the json file for a user with the same name. If the user exists, the role of the user is overwritten by the role passed as the parameter and the json file is rewritten and a Boolean of true is returned. If the user does not exist, then a Boolean value of false is returned.

_Group route (fetchgroups.js)_  
This route is responsible for all actions associated with the group json data. It takes in both the user entered data and a check value which changes depending on the event triggered. The check value determines which logic is executed once the route is hit. The route adds groups, deletes groups, adds users to groups and removes users from groups as well as returning the data when requested by the client. 

**Client and server interactions**  
In this project the client and server communicated to each other using the angular HTTP Client service. Each time a certain event was triggered in the view, the HTTP Client post methods were used to connect to routes on the server. In these server side routes, the appropriate data is modified and the required data is returned in return methods. The values returned from the server could then be stored in local storage or variables in order to update the view.
