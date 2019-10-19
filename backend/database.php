<?php

class Database
{
    // This needs to be filled out still
    $servername = "localhost";
    $username = "gcdbadmin";
    $password = "gcdbadmin";
    $dbname = "groupchat";

    // Creates database
    function createDB()
    {
        try 
        {
            $db = new PDO("mysql:host=$servername", $username, $password);
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
            $db = new PDO("mysql:host=$servername;dbname=$dbname", $username, $password);
            // set the PDO error mode to exception
            $db->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
        
            // sql to create table
            $sql = "CREATE TABLE User IF NOT EXISTS (
            username VARCHAR(30) NOT NULL PRIMARY KEY,
            password VARCHAR(30) NOT NULL,
            firstName VARCHAR(30) NOT NULL,
            lastName VARCHAR(30) NOT NULL,
            join_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
            email VARCHAR(50) NOT NULL,
            pictureURL VARCHAR(50) NOT NULL
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
            $db = new PDO("mysql:host=$servername;dbname=$dbname", $username, $password);
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
            $db = new PDO("mysql:host=$servername;dbname=$dbname", $username, $password);
            // set the PDO error mode to exception
            $db->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
        
            // sql to create table
            $sql = "CREATE TABLE Post IF NOT EXISTS (
            postId INT(6) UNSIGNED AUTO_INCREMENT PRIMARY KEY,
            foreign key(conversationId) references Conversation,
            foreign key(username) references User,
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
            $db = new PDO("mysql:host=$servername;dbname=$dbname", $username, $password);
            // set the PDO error mode to exception
            $db->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
        
            // sql to create table
            $sql = "CREATE TABLE Shortcut IF NOT EXISTS (
            shortcutId INT(6) UNSIGNED AUTO_INCREMENT PRIMARY KEY,
            pattern VARCHAR(50) NOT NULL,
            foreign key(username) references User,
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
            $db = new PDO("mysql:host=$servername;dbname=$dbname", $username, $password);
            // set the PDO error mode to exception
            $db->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
        
            // sql to create table
            $sql = "CREATE TABLE Participant IF NOT EXISTS (
            foreign key(conversationId) references Conversation,
            foreign key(username) references User
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


}

