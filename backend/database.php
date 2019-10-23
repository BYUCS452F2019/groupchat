<?php

class Database
{
    // This needs to be filled out still
    $servername = "localhost";
    $dbusername = "gcdbadmin";
    $dbpassword = "gcdbadmin";
    $dbname = "groupchat";

    // Creates database
    function createDB()
    {
        try 
        {
            $db = new PDO("mysql:host=$servername;", $dbusername, $dbpassword);
            // set the PDO error mode to exception
            $db->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
            $sql = "CREATE DATABASE $dbname IF NOT EXISTS";
            // use exec() because no results are returned
            $db->exec($sql);
            echo "Database created successfully<br>";
        }
        catch(PDOException $e)
        {
            echo $sql . "<br>" . $e->getMessage();
        }
        
        $db = null;
    }

    // Creates any tables that don't exist
    function createTables()
    {
        createUserTable();
        createConversationTable();
        createPostTable();
        createShortcutTable();
        createParticipantTable();
    }

    function createUserTable()
    {
        try 
        {
            $db = new PDO("mysql:host=$servername;dbname=$dbname", $dbusername, $dbpassword);
            // set the PDO error mode to exception
            $db->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
        
            // sql to create table
            $sql = "CREATE TABLE User IF NOT EXISTS (
            username VARCHAR(30) NOT NULL PRIMARY KEY,
            password VARCHAR(30) NOT NULL,
            firstName VARCHAR(30) NOT NULL,
            lastName VARCHAR(30) NOT NULL,
            email VARCHAR(50) NOT NULL,
            pictureUrl VARCHAR(50) NOT NULL,
            join_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
            )";
        
            // use exec() because no results are returned
            $db->exec($sql);
            echo "Table User created successfully";
        }
        catch(PDOException $e)
        {
            echo $sql . "<br>" . $e->getMessage();
        }
        
        $db = null;
    }

    function createConversationTable()
    {
        try 
        {
            $db = new PDO("mysql:host=$servername;dbname=$dbname", $dbusername, $dbpassword);
            // set the PDO error mode to exception
            $db->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
        
            // sql to create table
            $sql = "CREATE TABLE Conversation IF NOT EXISTS (
            conversationId INT(6) UNSIGNED AUTO_INCREMENT PRIMARY KEY,
            name VARCHAR(30) NOT NULL
            )";
        
            // use exec() because no results are returned
            $db->exec($sql);
            echo "Table User created successfully";
        }
        catch(PDOException $e)
        {
            echo $sql . "<br>" . $e->getMessage();
        }
        
        $db = null;
    }

    function createPostTable()
    {
        try 
        {
            $db = new PDO("mysql:host=$servername;dbname=$dbname", $dbusername, $dbpassword);
            // set the PDO error mode to exception
            $db->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
        
            // sql to create table
            $sql = "CREATE TABLE Post IF NOT EXISTS (
            postId INT(6) UNSIGNED AUTO_INCREMENT PRIMARY KEY,
            foreign key(conversationId) references Conversation ON DELETE CASCADE,
            foreign key(username) references User ON DELETE CASCADE,
            content TEXT NOT NULL,
            timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
            )";
        
            // use exec() because no results are returned
            $db->exec($sql);
            echo "Table User created successfully";
        }
        catch(PDOException $e)
        {
            echo $sql . "<br>" . $e->getMessage();
        }
        
        $db = null;
    }

    function createShortcutTable()
    {
        try 
        {
            $db = new PDO("mysql:host=$servername;dbname=$dbname", $dbusername, $dbpassword);
            // set the PDO error mode to exception
            $db->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
        
            // sql to create table
            $sql = "CREATE TABLE Shortcut IF NOT EXISTS (
            shortcutId INT(6) UNSIGNED AUTO_INCREMENT PRIMARY KEY,
            pattern VARCHAR(50) NOT NULL,
            foreign key(username) references User ON DELETE CASCADE,
            command TEXT NOT NULL
            )";
        
            // use exec() because no results are returned
            $db->exec($sql);
            echo "Table User created successfully";
        }
        catch(PDOException $e)
        {
            echo $sql . "<br>" . $e->getMessage();
        }
        
        $db = null;
    }

    function createParticipantTable()
    {
        try 
        {
            $db = new PDO("mysql:host=$servername;dbname=$dbname", $dbusername, $dbpassword);
            // set the PDO error mode to exception
            $db->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
        
            // sql to create table
            $sql = "CREATE TABLE Participant IF NOT EXISTS (
            foreign key(conversationId) references Conversation ON DELETE CASCADE,
            foreign key(username) references User ON DELETE CASCADE
            )";
        
            // use exec() because no results are returned
            $db->exec($sql);
            echo "Table User created successfully";
        }
        catch(PDOException $e)
        {
            echo $sql . "<br>" . $e->getMessage();
        }
        
        $db = null;
    }

    function addUser($username, $password, $firstName, $lastName, $email, $pictureUrl)
    {
        try 
        {
            $conn = new PDO("mysql:host=$servername;dbname=$dbname", $dbusername, $dbpassword);
            // set the PDO error mode to exception
            $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
            $sql = "INSERT INTO User (username, password, firstName, lastName, email, pictureUrl) VALUES ($username, $password, $firstName, $lastName, $email, $pictureUrl)";
            // use exec() because no results are returned
            $conn->exec($sql);
            echo "New record created successfully";
        }
        catch(PDOException $e)
        {
            echo $sql . "<br>" . $e->getMessage();
        }
        
        $conn = null;
    }

    function addConversation($name)
    {
        try 
        {
            $conn = new PDO("mysql:host=$servername;dbname=$dbname", $dbusername, $dbpassword);
            // set the PDO error mode to exception
            $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
            $sql = "INSERT INTO Conversation (name) VALUES ($name)";
            // use exec() because no results are returned
            $conn->exec($sql);
            echo "New record created successfully";
        }
        catch(PDOException $e)
        {
            echo $sql . "<br>" . $e->getMessage();
        }
        
        $conn = null;
    }

    function addPost($conversationId, $username, $content)
    {
        try 
        {
            $conn = new PDO("mysql:host=$servername;dbname=$dbname", $dbusername, $dbpassword);
            // set the PDO error mode to exception
            $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
            $sql = "INSERT INTO Post (conversationId, username, content) VALUES ($conversationId, $username, $content)";
            // use exec() because no results are returned
            $conn->exec($sql);
            echo "New record created successfully";
        }
        catch(PDOException $e)
        {
            echo $sql . "<br>" . $e->getMessage();
        }
        
        $conn = null;
    }

    function addShortcut($pattern, $username, $command)
    {
        try 
        {
            $conn = new PDO("mysql:host=$servername;dbname=$dbname", $dbusername, $dbpassword);
            // set the PDO error mode to exception
            $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
            $sql = "INSERT INTO Shortcut (pattern, username, command) VALUES ($pattern, $username, $command)";
            // use exec() because no results are returned
            $conn->exec($sql);
            echo "New record created successfully";
        }
        catch(PDOException $e)
        {
            echo $sql . "<br>" . $e->getMessage();
        }
        
        $conn = null;
    }

    function addParticipant($conversationId, $username)
    {
        try 
        {
            $conn = new PDO("mysql:host=$servername;dbname=$dbname", $dbusername, $dbpassword);
            // set the PDO error mode to exception
            $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
            $sql = "INSERT INTO Shortcut (conversationId, username) VALUES ($conversationId, $username)";
            // use exec() because no results are returned
            $conn->exec($sql);
            echo "New record created successfully";
        }
        catch(PDOException $e)
        {
            echo $sql . "<br>" . $e->getMessage();
        }
        
        $conn = null;
    }

    function removeUser($username)
    {
        try 
        {
            $conn = new PDO("mysql:host=$servername;dbname=$dbname", $dbusername, $dbpassword);
            // set the PDO error mode to exception
            $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
        
            // sql to delete a record
            $sql = "DELETE FROM User WHERE username = $username";
        
            // use exec() because no results are returned
            $conn->exec($sql);
            echo "Record deleted successfully";
        }
        catch(PDOException $e)
        {
            echo $sql . "<br>" . $e->getMessage();
        }
    }

    function removeConversation($conversationId)
    {
        try 
        {
            $conn = new PDO("mysql:host=$servername;dbname=$dbname", $dbusername, $dbpassword);
            // set the PDO error mode to exception
            $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
        
            // sql to delete a record
            $sql = "DELETE FROM Conversation WHERE conversationId = $conversationId";
        
            // use exec() because no results are returned
            $conn->exec($sql);
            echo "Record deleted successfully";
        }
        catch(PDOException $e)
        {
            echo $sql . "<br>" . $e->getMessage();
        }
    }

    function removePost($postId)
    {
        try 
        {
            $conn = new PDO("mysql:host=$servername;dbname=$dbname", $dbusername, $dbpassword);
            // set the PDO error mode to exception
            $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
        
            // sql to delete a record
            $sql = "DELETE FROM Post WHERE postId = $postId";
        
            // use exec() because no results are returned
            $conn->exec($sql);
            echo "Record deleted successfully";
        }
        catch(PDOException $e)
        {
            echo $sql . "<br>" . $e->getMessage();
        }
    }

    function removeShortcut($shortcutId)
    {
        try 
        {
            $conn = new PDO("mysql:host=$servername;dbname=$dbname", $dbusername, $dbpassword);
            // set the PDO error mode to exception
            $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
        
            // sql to delete a record
            $sql = "DELETE FROM Shortcut WHERE shortcutId = $shortcutId";
        
            // use exec() because no results are returned
            $conn->exec($sql);
            echo "Record deleted successfully";
        }
        catch(PDOException $e)
        {
            echo $sql . "<br>" . $e->getMessage();
        }
    }

    function removeParticipant($conversationId)
    {
        try 
        {
            $conn = new PDO("mysql:host=$servername;dbname=$dbname", $dbusername, $dbpassword);
            // set the PDO error mode to exception
            $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
        
            // sql to delete a record
            $sql = "DELETE FROM Participant WHERE conversationId = $conversationId";
        
            // use exec() because no results are returned
            $conn->exec($sql);
            echo "Record deleted successfully";
        }
        catch(PDOException $e)
        {
            echo $sql . "<br>" . $e->getMessage();
        }
    }

    // The section it's in depends on what table will be accessed, with exception to cases with multiple tables

    /* User methods */

    /* Returns user if password is correct */
    function validateLogin($username, $password)
    {
        try {
            $conn = new PDO("mysql:host=$servername;dbname=$dbname", $dbusername, $dbpassword);
            $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
            $stmt = $conn->prepare("SELECT * FROM User WHERE username = $username");
            $stmt->execute();
        
            // set the resulting array to associative
            $stmt->setFetchMode(PDO::FETCH_ASSOC);
            $result = $stmt->fetchAll();
            $conn = null;

            if ($result[0]['password'] === $password)
            {
                return $result[0];
            }
            return null;;
        }
        catch(PDOException $e) {
            echo "Error: " . $e->getMessage();
            $conn = null;
            return null;
        }
    }

    /* Conversation methods */

    /* Grabs all conversation details by its id */
    function getConversationById($conversationId)
    {
        try {
            $conn = new PDO("mysql:host=$servername;dbname=$dbname", $dbusername, $dbpassword);
            $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
            $stmt = $conn->prepare("SELECT * FROM Conversation WHERE conversationId = $conversationId");
            $stmt->execute();
        
            // set the resulting array to associative
            $stmt->setFetchMode(PDO::FETCH_ASSOC);
            $result = $stmt->fetchAll();
            $conn = null;

            return $result;
        }
        catch(PDOException $e) {
            echo "Error: " . $e->getMessage();
            $conn = null;
            return null;
        }
    }

    /* Post methods */

    /* Grabs all post details by its id */
    function getPostById($postId)
    {
        try {
            $conn = new PDO("mysql:host=$servername;dbname=$dbname", $dbusername, $dbpassword);
            $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
            $stmt = $conn->prepare("SELECT * FROM Post WHERE postId = $postId");
            $stmt->execute();
        
            // set the resulting array to associative
            $stmt->setFetchMode(PDO::FETCH_ASSOC);
            $result = $stmt->fetchAll();
            $conn = null;

            return $result;
        }
        catch(PDOException $e) {
            echo "Error: " . $e->getMessage();
            $conn = null;
            return null;
        }
    }

    /* Grabs all posts by a particular user in a particular conversation */
    function getAllPostsByUserInConversation($username, $conversationId)
    {
        try {
            $conn = new PDO("mysql:host=$servername;dbname=$dbname", $dbusername, $dbpassword);
            $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
            $stmt = $conn->prepare("SELECT * FROM Post WHERE username = $username AND conversationId = $conversationId");
            $stmt->execute();
        
            // set the resulting array to associative
            $stmt->setFetchMode(PDO::FETCH_ASSOC);
            $result = $stmt->fetchAll();
            $conn = null;

            return $result;
        }
        catch(PDOException $e) {
            echo "Error: " . $e->getMessage();
            $conn = null;
            return null;
        }
    }

    /* Gets all posts in a conversation */
    function getAllPostsInConversation($conversationId)
    {
        try {
            $conn = new PDO("mysql:host=$servername;dbname=$dbname", $dbusername, $dbpassword);
            $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
            $stmt = $conn->prepare("SELECT * FROM Post WHERE conversationId = $conversationId");
            $stmt->execute();
        
            // set the resulting array to associative
            $stmt->setFetchMode(PDO::FETCH_ASSOC);
            $result = $stmt->fetchAll();
            $conn = null;

            return $result;
        }
        catch(PDOException $e) {
            echo "Error: " . $e->getMessage();
            $conn = null;
            return null;
        }
    }

    /* Shortcut methods */

    /* Takes a message and changes it so that any shortcuts will be implemented and returns new message */
    function convertMessageToUseShortcutsOfUser($username, $message)
    {
        try {
            $conn = new PDO("mysql:host=$servername;dbname=$dbname", $dbusername, $dbpassword);
            $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
            $stmt = $conn->prepare("SELECT * FROM Shortcut WHERE username = $username");
            $stmt->execute();
        
            // set the resulting array to associative
            $stmt->setFetchMode(PDO::FETCH_ASSOC);
            $result = $stmt->fetchAll();
            for ($i = 0; i < count($result); $i++)
            {
                $message = str_replace($result[$i]['patttern'], $result[$i]['command'], $message);
            }
            $conn = null;

            return $message;
        }
        catch(PDOException $e) {
            echo "Error: " . $e->getMessage();
            $conn = null;
            return null;
        }
        $wordSeparatedMessage = explode(" ", $message);
        
    }

    /* Participant methods */

    /* Get all users in a conversation */
    function getAllParticipantsOfConversationWithConversationId($conversationId)
    {
        try {
            $conn = new PDO("mysql:host=$servername;dbname=$dbname", $dbusername, $dbpassword);
            $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
            $stmt = $conn->prepare("SELECT * FROM Participant WHERE conversationId = $conversationId");
            $stmt->execute();
        
            // set the resulting array to associative
            $stmt->setFetchMode(PDO::FETCH_ASSOC);
            $result = $stmt->fetchAll();
            $conn = null;

            return $result;
        }
        catch(PDOException $e) {
            echo "Error: " . $e->getMessage();
            $conn = null;
            return null;
        }
    }


}

