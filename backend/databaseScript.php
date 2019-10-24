<?php
require_once "database.php"

$method = $_POST['method'];
unset($_POST['method']);

echo call_user_func_array($method, array(&$_POST));
