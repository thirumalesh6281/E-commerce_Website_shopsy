<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");

$conn = new mysqli("localhost", "root", "", "test");
if ($conn->connect_error) {
  echo json_encode(["success" => false, "message" => "Database connection failed"]);
  exit;
}

// Get the raw POST data
$data = json_decode(file_get_contents("php://input"), true);

if (!$data) {
  echo json_encode(["success" => false, "message" => "No input data"]);
  exit;
}

// Loop through each item and insert into the delivered_items_v2 table
foreach ($data['items'] as $item) {
  $stmt = $conn->prepare("INSERT INTO delivered_items_v2 (order_id, user_name, name, price, image, quantity, address, payment_method, total, time) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)");
  $stmt->bind_param(
    "ississssds",
    $data['order_id'],
    $data['user_name'],
    $item['name'],
    $item['price'],
    $item['image'],
    $item['quantity'],
    $data['address'],
    $data['payment_method'],
    $data['total'],
    $data['time']
  );

  if (!$stmt->execute()) {
    echo json_encode(["success" => false, "message" => "Insert failed for item: " . $item['name']]);
    exit;
  }
}

echo json_encode(["success" => true, "message" => "Order marked as delivered"]);
?>
