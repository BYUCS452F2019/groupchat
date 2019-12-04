<?php
ini_set("log_errors", 1);
ini_set("error_log", "errors.log");
require_once "database.php";
$db = new Database();

echo('Hi there');
echo($_POST['method']);

if (!isset($_SERVER["HTTP_HOST"])) {
  parse_str($argv[1], $_GET);
  parse_str($argv[1], $_POST);
}

error_log($_POST['method']);

if ($_POST['method'] == "createTables")
{
    $db->createTables();
}

else if ($_POST['method'] == "addUser")
{
    $db->addUser($_POST['username'], $_POST['password'], $_POST['firstName'], $_POST['lastName'], $_POST['email'], $_POST['pictureUrl']);
}

else if ($_POST['method'] == "addConversation")
{
    $db->addConversation($_POST['name']);
}

else if ($_POST['method'] == "addPost")
{
    $db->addPost($_POST['conversationId'], $_POST['username'], $_POST['content']);
}

else if ($_POST['method'] == "addShortcut")
{
    $db->addShortcut($_POST['pattern'], $_POST['username'], $_POST['command']);
}

else if ($_POST['method'] == "addParticipant")
{
    $db->addParticipant($_POST['conversationId'], $_POST['username']);
}

else if ($_POST['method'] == "removeUser")
{
    $db->removeUser($_POST['username']);
}

else if ($_POST['method'] == "removeConversation")
{
    $db->removeConversation($_POST['conversationId']);
}

else if ($_POST['method'] == "removePost")
{
    $db->removePost($_POST['postId']);
}

else if ($_POST['method'] == "removeShortcut")
{
    $db->removeShortcut($_POST['shortcutId']);
}

else if ($_POST['method'] == "removeParticipant")
{
    $db->removeParticipant($_POST['conversationId']);
}

else if ($_POST['method'] == "validateLogin")
{
    $db->validateLogin($_POST['username'], $_POST['password']);
}

else if ($_POST['method'] == "getConversationById")
{
    $db->getConversationById($_POST['conversationId']);
}

else if ($_POST['method'] == "getConversationsByUsername")
{
    $db->getConversationsByUsername($_POST['username']);
}

else if ($_POST['method'] == "getPostById")
{
    $db->getPostById($_POST['postId']);
}

else if ($_POST['method'] == "getAllPostsByUserInConversation")
{
    $db->getAllPostsByUserInConversation($_POST['username'], $_POST['conversationId']);
}

else if ($_POST['method'] == "getAllPostsInConversation")
{
    $db->getAllPostsInConversation($_POST['conversationId']);
}

else if ($_POST['method'] == "convertMessage")
{
    error_log("test");
    $db->convertMessage($_POST['username'], $_POST['message']);
}

else if ($_POST['method'] == "getAllParticipantsOfConversationWithConversationId")
{
    $db->getAllParticipantsOfConversationWithConversationId($_POST['conversationId']);
}

else if ($_POST['method'] == "getUserShortcuts")
{
    $db->getUserShortcuts($_POST['username']);
}

?>
