<?php

if (isset($_GET["action"])) { $action = $_GET["action"]; }
if (isset($_POST["action"])) { $action = $_POST["action"]; }

switch ($action) {
    case "sayHi":
        //do stuff here!
        echo '{"message":"Hi!!!"}';
    break;
}


?>
