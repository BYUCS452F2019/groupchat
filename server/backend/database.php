<?php

class Database
{
    // This needs to be filled out still
    // public $servername = "remotemysql.com";
    // public $dbusername = "kpwBSZVzSb";
    // public $dbpassword = "jGNwCE2tmT";
    // public $dbname = "kpwBSZVzSb";
    // public $port = "3306";
    public $servername = "127.0.0.1"; //getenv('IP');
    public $dbusername = "root"; //getenv('C9_USER');
    public $dbpassword = "";
    public $dbname = "c9";
    public $dbport = 3306;

    // Creates any tables that don't exist
    function createTables()
    {
        $this->createUserTable();
        $this->createConversationTable();
        $this->createPostTable();
        $this->createShortcutTable();
        $this->createParticipantTable();
    }

    function createUserTable()
    {
        try 
        {
            $db = new PDO("mysql:host=$this->servername;port=$this->port;dbname=$this->dbname", $this->dbusername, $this->dbpassword);
            // set the PDO error mode to exception
            $db->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
        
            // sql to create table
            $sql = "CREATE TABLE IF NOT EXISTS Users (
                username VARCHAR(30) NOT NULL PRIMARY KEY UNIQUE,
                password VARCHAR(30) NOT NULL,
                firstName VARCHAR(30) NOT NULL,
                lastName VARCHAR(30) NOT NULL,
                email VARCHAR(50) NOT NULL,
                pictureUrl VARCHAR(50) NOT NULL,
                join_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
                )";
        
            // use exec() because no results are returned
            $db->exec($sql);
            echo "Table Users created successfully\r\n";
        }
        catch(PDOException $e)
        {
            $error = $sql . "<br>" . $e->getMessage();
            echo json_encode(array ( "error" => $error ));
        }
        
        $db = null;
    }

    function createConversationTable()
    {
        try 
        {
            $db = new PDO("mysql:host=$this->servername;port=$this->port;dbname=$this->dbname", $this->dbusername, $this->dbpassword);
            // set the PDO error mode to exception
            $db->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
        
            // sql to create table
            $sql = "CREATE TABLE IF NOT EXISTS Conversations (
            conversationId INT(6) UNSIGNED AUTO_INCREMENT PRIMARY KEY,
            name VARCHAR(30) NOT NULL
            )";
        
            // use exec() because no results are returned
            $db->exec($sql);
            echo "Table Conversations created successfully\r\n";
        }
        catch(PDOException $e)
        {
            $error = $sql . "<br>" . $e->getMessage();
            echo json_encode(array ( "error" => $error ));
        }
        
        $db = null;
    }

    function createPostTable()
    {
        try 
        {
            $db = new PDO("mysql:host=$this->servername;port=$this->port;dbname=$this->dbname", $this->dbusername, $this->dbpassword);
            // set the PDO error mode to exception
            $db->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
        
            // sql to create table
            $sql = "CREATE TABLE IF NOT EXISTS Posts(
                conversationId INT(6) UNSIGNED NOT NULL,
                username VARCHAR(30) NOT NULL,
                postId INT(6) UNSIGNED AUTO_INCREMENT PRIMARY KEY,
                foreign key(conversationId) references Conversations(conversationId) ON DELETE CASCADE,
                foreign key(username) references Users(username) ON DELETE CASCADE,
                content TEXT NOT NULL,
                timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
                )";
        
            // use exec() because no results are returned
            $db->exec($sql);
            echo "Table Posts created successfully\r\n";
        }
        catch(PDOException $e)
        {
            $error = $sql . "<br>" . $e->getMessage();
            echo json_encode(array ( "error" => $error ));
        }
        
        $db = null;
    }

    function createShortcutTable()
    {
        try 
        {
            $db = new PDO("mysql:host=$this->servername;port=$this->port;dbname=$this->dbname", $this->dbusername, $this->dbpassword);
            // set the PDO error mode to exception
            $db->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
        
            // sql to create table
            $sql = "CREATE TABLE IF NOT EXISTS Shortcuts (
            username VARCHAR(30) NOT NULL,
            shortcutId INT(6) UNSIGNED AUTO_INCREMENT PRIMARY KEY,
            pattern VARCHAR(50) NOT NULL,
            foreign key(username) references Users(username) ON DELETE CASCADE,
            command TEXT NOT NULL
            )";
        
            // use exec() because no results are returned
            $db->exec($sql);
            echo "Table Shortcuts created successfully\r\n";
        }
        catch(PDOException $e)
        {
            $error = $sql . "<br>" . $e->getMessage();
            echo json_encode(array ( "error" => $error ));
        }
        
        $db = null;
    }

    function createParticipantTable()
    {
        try 
        {
            $db = new PDO("mysql:host=$this->servername;port=$this->port;dbname=$this->dbname", $this->dbusername, $this->dbpassword);
            // set the PDO error mode to exception
            $db->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
        
            // sql to create table
            $sql = "CREATE TABLE IF NOT EXISTS Participants(
            conversationId INT(6) UNSIGNED NOT NULL,
            username VARCHAR(30) NOT NULL,
            foreign key(conversationId) references Conversations(conversationId) ON DELETE CASCADE,
            foreign key(username) references Users(username) ON DELETE CASCADE
            )";
        
            // use exec() because no results are returned
            $db->exec($sql);
            echo "Table Participants created successfully";
        }
        catch(PDOException $e)
        {
            $error = $sql . "<br>" . $e->getMessage();
            echo json_encode(array ( "error" => $error ));
        }
        
        $db = null;
    }

    function addUser($username, $password, $firstName, $lastName, $email, $pictureUrl)
    {
        try 
        {
            $conn = new PDO("mysql:host=$this->servername;port=$this->port;dbname=$this->dbname", $this->dbusername, $this->dbpassword);
            // set the PDO error mode to exception
            $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
            $sql = "INSERT INTO Users (username, password, firstName, lastName, email, pictureUrl) VALUES ('$username', '$password', '$firstName', '$lastName', '$email', '$pictureUrl')";
            // use exec() because no results are returned
            $conn->exec($sql);
            //echo "New record created successfully";
            $result = $conn->lastInsertId();
            echo json_encode(array ( "success" => $result ));
        }
        catch(PDOException $e)
        {
            $error = $sql . "<br>" . $e->getMessage();
            echo json_encode(array ( "error" => $error ));
        }
        
        $conn = null;
    }

    function addConversation($name)
    {
        try 
        {
            $conn = new PDO("mysql:host=$this->servername;port=$this->port;dbname=$this->dbname", $this->dbusername, $this->dbpassword);
            // set the PDO error mode to exception
            $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
            $sql = "INSERT INTO Conversations (name) VALUES ('$name')";
            // use exec() because no results are returned
            $conn->exec($sql);
            // echo "New record created successfully";
            $result = $conn->lastInsertId();
            echo json_encode(array ( "conversationId" => $result ));
        }
        catch(PDOException $e)
        {
            $error = $sql . "<br>" . $e->getMessage();
            echo json_encode(array ( "error" => $error ));
        }
        
        $conn = null;
    }

    function addPost($conversationId, $username, $content)
    {
        try 
        {
            $conn = new PDO("mysql:host=$this->servername;port=$this->port;dbname=$this->dbname", $this->dbusername, $this->dbpassword);
            // set the PDO error mode to exception
            $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
            $sql = "INSERT INTO Posts (conversationId, username, content) VALUES ('$conversationId', '$username', '$content')";
            // use exec() because no results are returned
            $conn->exec($sql);
            // echo "New record created successfully";
            $result = $conn->lastInsertId();
            echo json_encode(array ( "postId" => $result ));
        }
        catch(PDOException $e)
        {
            $error = $sql . "<br>" . $e->getMessage();
            echo json_encode(array ( "error" => $error ));
        }
        
        $conn = null;
    }

    function addShortcut($pattern, $username, $command)
    {
        try 
        {
            $conn = new PDO("mysql:host=$this->servername;port=$this->port;dbname=$this->dbname", $this->dbusername, $this->dbpassword);
            // set the PDO error mode to exception
            $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
            $sql = "INSERT INTO Shortcuts (pattern, username, command) VALUES ('$pattern', '$username', '$command')";
            // use exec() because no results are returned
            $conn->exec($sql);
            // echo "New record created successfully";
            $result = $conn->lastInsertId();
            echo json_encode(array ( "shortcutId" => $result ));
        }
        catch(PDOException $e)
        {
            $error = $sql . "<br>" . $e->getMessage();
            echo json_encode(array ( "error" => $error ));
        }
        
        $conn = null;
    }

    function addParticipant($conversationId, $username)
    {
        try 
        {
            $conn = new PDO("mysql:host=$this->servername;port=$this->port;dbname=$this->dbname", $this->dbusername, $this->dbpassword);
            // set the PDO error mode to exception
            $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
            $sql = "INSERT INTO Participants (conversationId, username) VALUES ('$conversationId', '$username')";
            // use exec() because no results are returned
            $conn->exec($sql);
            // echo "New record created successfully";
            $result = $conn->lastInsertId();
            echo json_encode(array ( "participantId" => $result ));
        }
        catch(PDOException $e)
        {
            $error = $sql . "<br>" . $e->getMessage();
            echo json_encode(array ( "error" => $error ));
        }
        
        $conn = null;
    }

    function removeUser($username)
    {
        try 
        {
            $conn = new PDO("mysql:host=$this->servername;port=$this->port;dbname=$this->dbname", $this->dbusername, $this->dbpassword);
            // set the PDO error mode to exception
            $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
        
            // sql to delete a record
            $sql = "DELETE FROM Users WHERE username = '$username'";
        
            // use exec() because no results are returned
            $conn->exec($sql);
            // echo "Record deleted successfully";
            echo json_encode(array ( "success" => "removeUser" ));
        }
        catch(PDOException $e)
        {
            $error = $sql . "<br>" . $e->getMessage();
            echo json_encode(array ( "error" => $error ));
        }
    }

    function removeConversation($conversationId)
    {
        try 
        {
            $conn = new PDO("mysql:host=$this->servername;port=$this->port;dbname=$this->dbname", $this->dbusername, $this->dbpassword);
            // set the PDO error mode to exception
            $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
        
            // sql to delete a record
            $sql = "DELETE FROM Conversations WHERE conversationId = '$conversationId'";
        
            // use exec() because no results are returned
            $conn->exec($sql);
            // echo "Record deleted successfully";
            echo json_encode(array ( "success" => "removeConversation" ));
        }
        catch(PDOException $e)
        {
            $error = $sql . "<br>" . $e->getMessage();
            echo json_encode(array ( "error" => $error ));
        }
    }

    function removePost($postId)
    {
        try 
        {
            $conn = new PDO("mysql:host=$this->servername;port=$this->port;dbname=$this->dbname", $this->dbusername, $this->dbpassword);
            // set the PDO error mode to exception
            $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
        
            // sql to delete a record
            $sql = "DELETE FROM Posts WHERE postId = '$postId'";
        
            // use exec() because no results are returned
            $conn->exec($sql);
            // echo "Record deleted successfully";
            echo json_encode(array ( "success" => "removePost" ));
        }
        catch(PDOException $e)
        {
            $error = $sql . "<br>" . $e->getMessage();
            echo json_encode(array ( "error" => $error ));
        }
    }

    function removeShortcut($shortcutId)
    {
        try 
        {
            $conn = new PDO("mysql:host=$this->servername;port=$this->port;dbname=$this->dbname", $this->dbusername, $this->dbpassword);
            // set the PDO error mode to exception
            $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
        
            // sql to delete a record
            $sql = "DELETE FROM Shortcuts WHERE shortcutId = '$shortcutId'";
        
            // use exec() because no results are returned
            $conn->exec($sql);
            // echo "Record deleted successfully";
            echo json_encode(array ( "success" => "removeShortcut" ));
        }
        catch(PDOException $e)
        {
            $error = $sql . "<br>" . $e->getMessage();
            echo json_encode(array ( "error" => $error ));
        }
    }

    function removeParticipant($conversationId)
    {
        try 
        {
            $conn = new PDO("mysql:host=$this->servername;port=$this->port;dbname=$this->dbname", $this->dbusername, $this->dbpassword);
            // set the PDO error mode to exception
            $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
        
            // sql to delete a record
            $sql = "DELETE FROM Participants WHERE conversationId = '$conversationId'";
        
            // use exec() because no results are returned
            $conn->exec($sql);
            // echo "Record deleted successfully";
            echo json_encode(array ( "success" => "removeParticipant" ));
        }
        catch(PDOException $e)
        {
            $error = $sql . "<br>" . $e->getMessage();
            echo json_encode(array ( "error" => $error ));
        }
    }

    // The section it's in depends on what table will be accessed, with exception to cases with multiple tables

    /* User methods */

    /* Returns user if password is correct */
    function validateLogin($username, $password)
    {
        try {
            $conn = new PDO("mysql:host=$this->servername;port=$this->port;dbname=$this->dbname", $this->dbusername, $this->dbpassword);
            $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
            $stmt = $conn->prepare("SELECT * FROM Users WHERE username = '$username'");
            $stmt->execute();
        
            // set the resulting array to associative
            $stmt->setFetchMode(PDO::FETCH_ASSOC);
            $result = $stmt->fetchAll();
            $conn = null;

            if ($result[0]['password'] === $password)
            {
                error_log( print_r($result, TRUE) );
                echo json_encode($result[0]); //return object not array with one object
                return;
            }
            echo "not valid";
        }
        catch(PDOException $e) {
            echo "Error: " . $e->getMessage();
            $conn = null;
        }
    }

    /* Conversation methods */

    /* Grabs all conversation details by its id */
    function getConversationById($conversationId)
    {
        try {
            $conn = new PDO("mysql:host=$this->servername;port=$this->port;dbname=$this->dbname", $this->dbusername, $this->dbpassword);
            $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
            $stmt = $conn->prepare("SELECT * FROM Conversations WHERE conversationId = '$conversationId'");
            $stmt->execute();
        
            // set the resulting array to associative
            $stmt->setFetchMode(PDO::FETCH_ASSOC);
            $result = $stmt->fetchAll();
            $conn = null;

            if (count($result) == 0)
            {
                echo json_encode(array ( "error" => "empty" ));
                return;
            }

            echo json_encode($result[0]);
            return;
        }
        catch(PDOException $e) {
            echo "Error: " . $e->getMessage();
            $conn = null;
            return null;
        }
    }

    /* Grabs all conversation details by username */
    function getConversationsByUsername($username)
    {
        try {
            $conn = new PDO("mysql:host=$this->servername;port=$this->port;dbname=$this->dbname", $this->dbusername, $this->dbpassword);
            $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
            $stmt = $conn->prepare("SELECT * FROM Conversations C INNER JOIN Participants P ON C.conversationId = P.conversationId  WHERE username = '$username'");
            $stmt->execute();
        
            // set the resulting array to associative
            $stmt->setFetchMode(PDO::FETCH_ASSOC);
            $result = $stmt->fetchAll();
            $conn = null;

            // if (count($result) == 0)
            // {
            //     echo json_encode(array ());
            //     return;
            // }

            echo json_encode($result);
            return;
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
            $conn = new PDO("mysql:host=$this->servername;port=$this->port;dbname=$this->dbname", $this->dbusername, $this->dbpassword);
            $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
            $stmt = $conn->prepare("SELECT * FROM Posts WHERE postId = '$postId'");
            $stmt->execute();
        
            // set the resulting array to associative
            $stmt->setFetchMode(PDO::FETCH_ASSOC);
            $result = $stmt->fetchAll();
            $conn = null;
            if (count($result) == 0)
            {
                echo "empty";
                return;
            }

            echo json_encode($result[0]);
            return;
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
            $conn = new PDO("mysql:host=$this->servername;port=$this->port;dbname=$this->dbname", $this->dbusername, $this->dbpassword);
            $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
            $stmt = $conn->prepare("SELECT * FROM Posts WHERE username = '$username' AND conversationId = '$conversationId'");
            $stmt->execute();
        
            // set the resulting array to associative
            $stmt->setFetchMode(PDO::FETCH_ASSOC);
            $result = $stmt->fetchAll();
            $conn = null;
            // if (count($result) == 0)
            // {
            //     echo "empty";
            //     return;
            // }

            echo json_encode($result);
            return;
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
            $conn = new PDO("mysql:host=$this->servername;port=$this->port;dbname=$this->dbname", $this->dbusername, $this->dbpassword);
            $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
            $stmt = $conn->prepare("SELECT * FROM Posts WHERE conversationId = '$conversationId'");
            $stmt->execute();
        
            // set the resulting array to associative
            $stmt->setFetchMode(PDO::FETCH_ASSOC);
            $result = $stmt->fetchAll();
            $conn = null;
            // if (count($result) == 0)
            // {
            //     echo "empty";
            //     return;
            // }
            echo json_encode($result);
            return;
        }
        catch(PDOException $e) {
            echo "Error: " . $e->getMessage();
            $conn = null;
            return null;
        }
    }

    /* Shortcut methods */

    /* Takes a message and changes it so that any shortcuts will be implemented and returns new message */
    function convertMessage($username, $message)
    {
        try {
            $conn = new PDO("mysql:host=$this->servername;port=$this->port;dbname=$this->dbname", $this->dbusername, $this->dbpassword);
            $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
            $stmt = $conn->prepare("SELECT * FROM Shortcuts WHERE username = '$username'");
            $stmt->execute();
        
            // set the resulting array to associative
            $stmt->setFetchMode(PDO::FETCH_ASSOC);
            $result = $stmt->fetchAll();

            error_log( print_r($result, TRUE) );

            for ($i = 0; $i < count($result); $i++)
            {
                $message = str_replace($result[$i]['pattern'], $result[$i]['command'], $message);
            }
            $conn = null;

            echo $message;
            return;
        }
        catch(PDOException $e) {
            echo "Error: " . $e->getMessage();
            $conn = null;
            return null;
        }
        
    }
    
    function getShortcutById($shortcutId)
    {
        try {
            $conn = new PDO("mysql:host=$this->servername;port=$this->port;dbname=$this->dbname", $this->dbusername, $this->dbpassword);
            $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
            $stmt = $conn->prepare("SELECT * FROM Shortcuts WHERE shortcutId = '$shortcutId'");
            $stmt->execute();
        
            // set the resulting array to associative
            $stmt->setFetchMode(PDO::FETCH_ASSOC);
            $result = $stmt->fetchAll();
            $conn = null;
            if (count($result) == 0)
            {
                echo "empty";
                return;
            }

            echo json_encode($result[0]);
            return;
        }
        catch(PDOException $e) {
            echo "Error: " . $e->getMessage();
            $conn = null;
            return null;
        }
    }

    /* Takes a message and changes it so that any shortcuts will be implemented and returns new message */
    function getUserShortcuts($username)
    {
        try {
            $conn = new PDO("mysql:host=$this->servername;port=$this->port;dbname=$this->dbname", $this->dbusername, $this->dbpassword);
            $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
            $stmt = $conn->prepare("SELECT * FROM Shortcuts WHERE username = '$username'");
            $stmt->execute();
        
            // set the resulting array to associative
            $stmt->setFetchMode(PDO::FETCH_ASSOC);
            $result = $stmt->fetchAll();

            error_log( print_r($result, TRUE) );

            $conn = null;

            echo json_encode($result);
            return;
        }
        catch(PDOException $e) {
            echo "Error: " . $e->getMessage();
            $conn = null;
            return null;
        }
        
    }

    /* Participant methods */

    /* Get all users in a conversation */
    function getAllParticipantsOfConversationWithConversationId($conversationId)
    {
        try {
            $conn = new PDO("mysql:host=$this->servername;port=$this->port;dbname=$this->dbname", $this->dbusername, $this->dbpassword);
            $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
            $stmt = $conn->prepare("SELECT * FROM Participants WHERE conversationId = '$conversationId'");
            $stmt->execute();
        
            // set the resulting array to associative
            $stmt->setFetchMode(PDO::FETCH_ASSOC);
            $result = $stmt->fetchAll();
            $conn = null;
            // if (count($result) == 0)
            // {
            //     echo "empty";
            //     return;
            // }
            echo json_encode($result);
            return;
        }
        catch(PDOException $e) {
            echo "Error: " . $e->getMessage();
            $conn = null;
            return null;
        }
    }


}

