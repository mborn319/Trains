<?php

if (isset($_GET["action"])) { $action = $_GET["action"]; }
if (isset($_POST["action"])) { $action = $_POST["action"]; }

switch ($action) {
    case "sayHi":
        //do stuff here!
        echo '{"message":"Hi! Date/time is: '.date().'"}';
    break;
    case "speed-control":
        //get amount, direction, other data
        if (isset($_POST["amount"])) { $amt = $_POST["amount"]; }
        if (isset($_POST["direction"])) { $amt = $_POST["direction"]; }

        //for security, it's best to validate as much as possible.
        //In this example, $amount should be validated as an integer.

        //direction can be forward or backward!
        switch ($direction) {
            case "forward":
                //run command to computer to set the speed to POSTIVE $amount
                //PS. this is extremely poor security!
                //system("./trainController --speed $amount --direction forward");
            break;
            default:
                //run command to computer to set the speed to NEGATIVE $amount
                //PS. this is extremely poor security!
                //system("./trainController --speed $amount --direction backward");
            break;
        }

    break;
}


?>
