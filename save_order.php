<?php
header('Content-Type: application/json');
include 'db.php';

$data = json_decode(file_get_contents('php://input'), true);

if ($data) {
    $name = $conn->real_escape_string($data['name']);
    $items = $conn->real_escape_string($data['items']);
    $total = $conn->real_escape_string($data['total']);
    $card = $conn->real_escape_string($data['card_number']);
    $exp = $conn->real_escape_string($data['expiry_date']);
    $cvv = $conn->real_escape_string($data['cvv']);

    $sql = "INSERT INTO orders (customer_name, items, card_number, expiry_date, cvv, total_price) 
            VALUES ('$name', '$items', '$card', '$exp', '$cvv', '$total')";

    if ($conn->query($sql) === TRUE) {
        echo json_encode(["status" => "success"]);
    } else {
        echo json_encode(["status" => "error", "message" => $conn->error]);
    }
}
$conn->close();
?>