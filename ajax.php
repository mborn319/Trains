<?php

if (isset($_GET["action"])) { $action = $_GET["action"]; }
if (isset($_POST["action"])) { $action = $_POST["action"]; }

switch ($action) {
    case "sayHi":
        //do stuff here!
        echo '{"message":"Hi! Date/time is: '.date('m/d/Y h:i a').'"}';
    break;
    case "speed-control":
        //get amount, direction, other data
        if (isset($_POST["speed"])) { $speed = $_POST["speed"]; }

        //for security, it's best to validate as much as possible.
        //In this example, $speed should be validated as an integer.

        echo '{"message":"Speed is now: '.$speed.'"}';

    break;
}


?>
