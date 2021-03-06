# Project Schema
## Tables
### User 
  
| `username` | password | firstName | lastName | joinDate | email | pictureUrl|
| --- | --- | --- | --- | --- | --- | --- |

### Conversation
|`conversationID` | name |
| --- | --- |	

### Post
|`postId`| conversationId| username| content| timestamp|
|---|---|---|---|---|
- Foreign Key *converstationId* references **Conversation**
- Foreign Key *username* references **User**

### Shortcut
|`shortcutId`| pattern| username| command|
|---|---|---|---|
- Foreign Key *username* references **User**

### Participant
|`p_id`| username| conversationId|
|---|---|---|
- Foreign Key *username* references **User**
- Foreign Key *converstationId* references **Conversation**

## Explanation
- Note: Primary keys for the tables above are always the first value, and is "coded"
- User
	- Named User because each chatting user will have its own unique account and info
	- The data in the columns represents all the attributes each user account will want to store
	- Users are participants in posts, which are contained in groups
	- All of its columns are unique (in the sense that the same column name is not in any other tables) except for the username, which is used to identitfy users in posts, converstations, etc.
	- Fields
		- username is the unique name of user
		- password is for security
		- first and last names are for the more personal use in chats that they can be identified by
		- joinDate would be for sorting purposes
		- email would be for logging in, resetting password, notifications etc.
		- pictureUrl would be for linking to a unique photo for each user.
- Conversation
	- Named Conversation for each conversation between a group of users.
	- The group only has an id and name, but this id will be used in multiple other tables
	- The conversationId is in posts so you can know which group a post belongs to, and it's in Participant so we can know who is supposed to be in each group
	- Normalization is present as it only shares the conversationId column with other tables so that they can have association
	- Fields
		- conversationId is for association (primary key)
		- the name is for the benefit of the end user (e.g. "CS452 team" could be the name)
- Post
	- A table for all individual posts made in any chat
	- Stores all important information to slot a post exactly where it should be
	- Posts are a part of a group, and are also tied to specific users
	- It shares some fields in order to have proper association, the rest are unique
	- Fields
		- postId is unique for each post (primary key)
		- conversationId identifies which group chat it is in
		- username indicates who posted it
		- content is what the message says
		- timestamp is when it was posted
- Shortcut
	- A table for useful text shortcuts that transform one phrase into another
	- Has a specific command that activates it, and can be set to multiple or all users
	- It has only association with the User table, and no others
	- It takes shared usernames but is otherwise unique
	- Fields
		- shortcutId is a unique id (primary key)
		- pattern is a pattern to be identified in text
		- username is an assigner user(s)
		- command is what it will turn into/what will happen to the selected text
- Participant
	- Assigns users to chats
	- Just says what users are in what chats, by conversationId and username
	- Participants are in groups, and make posts and shortcuts
	- It shares all of its fields with others, but for necessary association (this table is a natural result of normalizing the other tables, to remove columns that are lists of entities)
	- Fields
		- p_id is unique for each particpant (primary key)
		- username is the name of the user
		- conversationId is what chat the user is a part of
