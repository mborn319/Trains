<?php
include "php_serial.class.php";
//
// Let's start the class
//
$serial = new phpSerial;
//
// First we must specify the device.
// Comm settings assumed correct or use Mode to correct
//
$serial->deviceSet("COM1");
//
// Then we need to open it
//
$serial->deviceOpen("w+");
// All relays off
//$serial->sendMessage(sprintf("#050000%c",13),0);
$serial->sendMessage(sprintf("#050000\r\n"),0);
usleep(200000);
//
// If you want to change the configuration, the device must be closed
//
$serial->deviceClose();
//

?>
