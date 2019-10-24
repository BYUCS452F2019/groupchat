<head>
    <script src="https://ajax.aspnetcdn.com/ajax/jQuery/jquery-3.4.1.min.js"></script>
</head>

<script>
    function createDB()
    {
        $.ajax({ url: 'databaseScript.php',
             data: {
                 method: 'createDB'
             },
             type: 'post',
             success: function(output) {
                alert(output);
             }
        });
    }

    function createTables()
    {
        $.ajax({ url: 'databaseScript.php',
             data: {
                 method: 'createTables'
             },
             type: 'post',
             success: function(output) {
                alert(output);
             }
        });
    }

    function addUser()
    {
        $.ajax({ url: 'databaseScript.php',
             data: {
                 method: 'addUser',
                 username: 'trhodges',
                 password: 'password',
                 firstName: 'travis',
                 lastName: 'hodges',
                 email: 'trhodges93@gmail.com',
                 pictureUrl: 'pictureUrl'
             },
             type: 'post',
             success: function(output) {
                alert(output);
             }
        });
    }

    function removeUser()
    {
        $.ajax({ url: 'databaseScript.php',
             data: {
                 method: 'removeUser',
                 username: 'trhodges'
             },
             type: 'post',
             success: function(output) {
                alert(output);
             }
        });
    }

    function validateLogin()
    {
        $.ajax({ url: 'databaseScript.php',
             data: {
                 method: 'validateLogin',
                 username: 'trhodges',
                 password: 'password'
             },
             type: 'post',
             success: function(output) {
                alert(output);
             }
        });
    }
</script>

<html>
    <button onclick = "createDB();">Create DB</button>
    <button onclick = "createTables();">Create Tables</button>
    <button onclick = "addUser();">Add User</button>
    <button onclick = "removeUser();">Remove User</button>
    <button onclick = "validateLogin();">Validate Login</button>
</html>
