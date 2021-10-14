# Project title: 3813ICT Assignment 2
## Project Description: Online chat app
### Documentation
**Git organisation**  
For this project, Git was used for version control and the service GitHub was utilized as the primary remote repository. The layout of the repository is set out the same way as the file structure on my computer and a README file is included to provide this documentation and testing information. The approach I took for version control was a “1 feature 1 commit” approach where I would commit my work to git after each function was implemented. At the end of each programming session, all of the commits were then pushed to the main branch of the remote repository at GitHub. 

**Data structures**  
For this project the data structures are managed in a mongo database. This mongo database stores 2 collections which are named “Users“ and ”Groups”. Each document in the users collection is made up of a username, email, role and password which are all stored as strings. Each document in the groups collection is made up of a group name, a group members array and a group assists array. This database is modified by the server according to the functions of the route.

**Rest API**  
The angular front end communicates with the express server through a HTTP Client using a REST style. This is done by passing or requesting the state of a resource to and from the server, which the server then responds to through routes. The routes used in this application are listed below.

_Authentication route (auth.js)_  
Usage: Validates a user by comparing the received username and password with values in the database<br>
Parameters: Username, password<br>
Return values:  Username, Success boolean<br>

_Add user route (adduser.js)_  
Usage: Creates a new user and a store it in a document in the database if that user does not already exist.<br>
Parameters: Username, email<br>
Return values:  Success boolean<br>

_Delete user route (deleteuser.js)_  
Usage: Receives user info and removes a document from the database if the user exists. Also remove this user from the groups collection.<br>
Parameters: Username<br>
Return values:  Success boolean<br>

_Update user route (updateuser.js)_  
Usage: Receives user info and modifies the role value in the database.<br>
Parameters: Username, Role<br>
Return values:  Success boolean<br>

_Password change route (passchange.js)_  
Usage: Change the user’s password after comparing to ensure that both passwords sent by the client are the same.<br>
Parameters: User, password1, password2<br>
Return values:  Success boolean<br>

**Angular Arctitecture**  
_Components_  
* Login: The first view the user sees. This view displays a login form for the user and redirects them to the chat on successful login.
* Chat: The main view of the application. From this view a user can join chat rooms and chat with other users, admins and group admins have permissions to modify groups.
* Add User: Accessible from the navigation bar for Admins. Displays a username and email form to create new users.
* Delete User: Accessible from the navigation bar for Admins. Displays a username form to delete existing users.
* Upgrade User: Accessible from the navigation bar for Admins. Displays a username and role form to upgrade the current role of existing users.
* Password: Accessible from the navigation bar for logged in users. Displays a password form for users to change their default password.

_Services_  
* Http Service: The http service is utilized by all of the components to post and fetch data to and from the database.
* Socket Service: The socket service contains all of the functions for communicating with sockets. These functions are called from the chat component. 

_Models_  
In each component is a model which stores client-side data, data worthy of mention are listed below
* User info: This model is used to store the username (and sometimes password) that the user types in from the view. This data is bound using an ngModel.
* Rooms: This array stores the rooms the user has access to and is displayed on the view.
* Users: This array stores all of the created users for Admin purposes.
