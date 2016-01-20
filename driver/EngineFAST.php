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
// RL2 is bit 3 Engine fast
$serial->sendMessage(sprintf("#051000\r\n"),0);// turn slow off
usleep(25000);
$serial->sendMessage(sprintf("#051100\r\n"),0);// turn medium off
usleep(25000);
$serial->sendMessage(sprintf("#051201\r\n"),0);// turn fast on
usleep(25000);
//
// If you want to change the configuration, the device must be closed
//
$serial->deviceClose();
//
?>
