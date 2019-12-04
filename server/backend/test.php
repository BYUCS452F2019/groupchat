<?php 
ini_set("log_errors", 1);
ini_set("error_log", "errors.log");

?>

<head>
    <script src="https://ajax.aspnetcdn.com/ajax/jQuery/jquery-3.4.1.min.js"></script>
</head>

<html>
    <button id = "createTablesButton">Create Tables</button>
    <br><br>

    <button id = "addUserButton">Add User</button>
    <button id = "addConversationButton">Add Conversation</button>
    <button id = "addPostButton">Add Post</button>
    <button id = "addShortcutButton">Add Shortcut</button>
    <button id = "addParticipantButton">Add Participant</button>
    <br><br>

    <button id = "removeUserButton">Remove User</button>
    <button id = "removeConversationButton">Remove Conversation</button>
    <button id = "removePostButton">Remove Post</button>
    <button id = "removeShortcutButton">Remove Shortcut</button>
    <button id = "removeParticipantButton">Remove Participant</button>
    <br><br>


    <button id = "validateLoginButton">Validate Login</button>
    <button id = "getConversationByIdButton">Get Conversation By Id</button>
    <button id = "getPostByIdButton">Get Post By Id</button>
    <button id = "getAllPostsByUserInConversation">Get All Posts By User In Conversation</button>
    <button id = "getAllPostsInConversation">Get All Posts In Conversation</button>
    <button id = "convertMessage">Convert Message</button>
    <br><br>

</html>

<script type = "text/javascript">
$(document).ready(function()
{
    $('#createTablesButton').click(function(){
    var data = {'method': 'createTables'};
    $.ajax({
      type: "post",
      url: "databaseScript.php",
      data: data,
      dataType: "text",
      success: function(data) {
        alert("tables created!");
      },
      error: function(data) {
        alert("error");
        alert(JSON.stringify(data));
       }
    });
    });

    $('#addUserButton').click(function(){
    $.ajax({
      type: "post",
      url: "databaseScript.php",
      data: {
        method: 'addUser',
        username: 'joe',
        password: 'password',
        firstName: 'travis',
        lastName: 'hodges',
        email: 'trhodges93@gmail.com',
        pictureUrl: 'pictureUrl'
      },
      dataType: "text",
      success: function(data) {
        alert("user added!");
      },
      error: function(data) {
        alert("error");
        alert(JSON.stringify(data));
       }
    });
    });

    $('#addConversationButton').click(function(){
    $.ajax({
      type: "post",
      url: "databaseScript.php",
      data: {
        method: 'addConversation',
        name: 'myChat'
      },
      dataType: "text",
      success: function(data) {
        alert("conversation added!");
      },
      error: function(data) {
        alert("error");
        alert(JSON.stringify(data));
       }
    });
    });

    $('#addPostButton').click(function(){
    $.ajax({
      type: "post",
      url: "databaseScript.php",
      data: {
        method: 'addPost',
        conversationId: 1,
        username: 'joe',
        content: 'posttttt \{shortcut}'
      },
      dataType: "text",
      success: function(data) {
        alert("post added!");
      },
      error: function(data) {
        alert("error");
        alert(JSON.stringify(data));
       }
    });
    });

    $('#addShortcutButton').click(function(){
    $.ajax({
      type: "post",
      url: "databaseScript.php",
      data: {
        method: 'addShortcut',
        pattern: '\{shortcut}',
        username: 'trhodges',
        command: 'i was a shortcut'
      },
      dataType: "text",
      success: function(data) {
        alert("shortcut added!");
      },
      error: function(data) {
        alert("error");
        alert(JSON.stringify(data));
       }
    });
    });

    $('#addParticipantButton').click(function(){
    $.ajax({
      type: "post",
      url: "databaseScript.php",
      data: {
        method: 'addParticipant',
        conversationId: 1,
        username: 'joe'
      },
      dataType: "text",
      success: function(data) {
        alert("participant added!");
      },
      error: function(data) {
        alert("error");
        alert(JSON.stringify(data));
       }
    });
    });

    $('#removeUserButton').click(function(){
    $.ajax({
      type: "post",
      url: "databaseScript.php",
      data: {
        method: 'removeUser',
        username: 'trhodges'
      },
      dataType: "text",
      success: function(data) {
        alert("user removed!");
      },
      error: function(data) {
        alert("error");
        alert(JSON.stringify(data));
       }
    });
    });

    $('#removeConversationButton').click(function(){
    $.ajax({
      type: "post",
      url: "databaseScript.php",
      data: {
        method: 'removeConversation',
        conversationId: 1
      },
      dataType: "text",
      success: function(data) {
        alert("conversation removed!");
      },
      error: function(data) {
        alert("error");
        alert(JSON.stringify(data));
       }
    });
    });

    $('#removePostButton').click(function(){
    $.ajax({
      type: "post",
      url: "databaseScript.php",
      data: {
        method: 'removePost',
        postId: 1
      },
      dataType: "text",
      success: function(data) {
        alert("conversation removed!");
      },
      error: function(data) {
        alert("error");
        alert(JSON.stringify(data));
       }
    });
    });

    $('#removeShortcutButton').click(function(){
    $.ajax({
      type: "post",
      url: "databaseScript.php",
      data: {
        method: 'removeShortcut',
        shortcutId: 1
      },
      dataType: "text",
      success: function(data) {
        alert("conversation removed!");
      },
      error: function(data) {
        alert("error");
        alert(JSON.stringify(data));
       }
    });
    });

    $('#removeParticipantButton').click(function(){
    $.ajax({
      type: "post",
      url: "databaseScript.php",
      data: {
        method: 'removeParticipant',
        conversationId: 1
      },
      dataType: "text",
      success: function(data) {
        alert("conversation removed!");
      },
      error: function(data) {
        alert("error");
        alert(JSON.stringify(data));
       }
    });
    });

    $('#validateLoginButton').click(function(){
    $.ajax({
      type: "post",
      url: "databaseScript.php",
      data: {
        method: 'validateLogin',
        username: 'trhodges',
        password: 'password'
      },
      dataType: "text",
      success: function(data) {
        if (data == "not valid")
        {
            alert("The credentials are invalid");
        }
        else
        {
            var json = JSON.parse(data);
            alert(json[0]['username'] + "'s credentials are correct");
        }
      },
      error: function(data) {
        alert("error");
        alert(JSON.stringify(data));
       }
    });
    });

    $('#getConversationByIdButton').click(function(){
    $.ajax({
      type: "post",
      url: "databaseScript.php",
      data: {
        method: 'getConversationById',
        conversationId: 1
      },
      dataType: "text",
      success: function(data) {
        if (data == "empty")
        {
            alert("There is no conversation with this id");
        }
        else
        {
            var json = JSON.parse(data);
            alert(json[0]['name'] + "': is the name of the chat");
        }
      },
      error: function(data) {
        alert("error");
        alert(JSON.stringify(data));
       }
    });
    });

    $('#getPostByIdButton').click(function(){
    $.ajax({
      type: "post",
      url: "databaseScript.php",
      data: {
        method: 'getPostById',
        postId: 1
      },
      dataType: "text",
      success: function(data) {
        if (data == "empty")
        {
            alert("There is no conversation with this id");
        }
        else
        {
            var json = JSON.parse(data);
            alert("post: " + json[0]['content']);
        }
      },
      error: function(data) {
        alert("error");
        alert(JSON.stringify(data));
       }
    });
    });

    $('#getAllPostsByUserInConversation').click(function(){
    $.ajax({
      type: "post",
      url: "databaseScript.php",
      data: {
        method: 'getAllPostsByUserInConversation',
        username: 'trhodges',
        conversationId: 1
      },
      dataType: "text",
      success: function(data) {
        if (data == "empty")
        {
            alert("There is no posts by this user in this conversation");
        }
        else
        {
            var json = JSON.parse(data);
            alert("post: " + json[0]['content']);
            alert("post: " + json[1]['content']);
        }
      },
      error: function(data) {
        alert("error");
        alert(JSON.stringify(data));
       }
    });
    });

    $('#getAllPostsInConversation').click(function(){
    $.ajax({
      type: "post",
      url: "databaseScript.php",
      data: {
        method: 'getAllPostsInConversation',
        conversationId: 1
      },
      dataType: "text",
      success: function(data) {
        if (data == "empty")
        {
            alert("There is no posts by this user in this conversation");
        }
        else
        {
            var json = JSON.parse(data);
            alert("post: " + json[0]['content']);
            alert("post: " + json[1]['content']);
            alert("post: " + json[2]['content']);
        }
      },
      error: function(data) {
        alert("error");
        alert(JSON.stringify(data));
       }
    });
    });

    $('#convertMessage').click(function(){
    $.ajax({
      type: "post",
      url: "databaseScript.php",
      data: {
        method: 'convertMessage',
        username: 'trhodges',
        message: "Hey so btw {shortcut}"
      },
      dataType: "text",
      success: function(data) {
          alert(data);
      },
      error: function(data) {
        alert("error");
        alert(JSON.stringify(data));
       }
    });
    });
});

</script>

