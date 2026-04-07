<?php
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "rubik_shop";

$conn = new mysqli($servername, $username, $password, $dbname);

if ($conn->connect_error) {
    die("Bağlantı xətası: " . $conn->connect_error);
}
?>
