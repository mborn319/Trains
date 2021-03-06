<?php

if (isset($_GET["action"])) { $action = $_GET["action"]; }
if (isset($_POST["action"])) { $action = $_POST["action"]; }

switch ($action) {
    case "sayHi":
        //do stuff here!
        echo '{"message":"Hi! Date/time is: '.date('m/d/Y h:i a').'"}';
    break;
    case "speed-control":
        //get speed from a generic variable called "param", short for parameter.
        if (isset($_POST["param"])) { $speed = $_POST["param"]; }

        switch($speed) {
            case "1":
                $speed = "FAST";//for return message
                require ("driver/EngineFAST.php");
            break;
            //Update: decided to remove "SLOW" speed. We can add this with the driver stuff later.
            //case "1":
            //    $speed = "SLOW";//for return message
            //    require ("driver/EngineSLOW.php");
            //break;
            case "0":
                $speed = "OFF";//for return message
                require ("driver/EngineOFF.php");
            break;
        }

        echo '{"message":"Speed is now: '.$speed.'"}';

    break;
    case "volume-control":
        //get speed from a generic variable called "param", short for parameter.
        if (isset($_POST["param"])) { $volume = $_POST["param"]; }

        //for security, it's best to validate as much as possible.
        //In this example, $speed should be validated as an integer.

        echo '{"message":"Volume is now: '.$volume.'"}';

    break;
}


?>
