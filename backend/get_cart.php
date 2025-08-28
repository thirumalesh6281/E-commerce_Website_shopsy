<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");

// DB connection
$conn = new mysqli("localhost", "root", "", "test");

if ($conn->connect_error) {
  echo json_encode(["success" => false, "message" => "Database connection failed"]);
  exit;
}

// Use correct column names
$sql = "SELECT product_id, name, price, image, quantity FROM cart";
$result = $conn->query($sql);

if (!$result) {
  echo json_encode(["success" => false, "message" => "SQL Error: " . $conn->error]);
  exit;
}

$cart = [];
while ($row = $result->fetch_assoc()) {
  $cart[] = $row;
}

echo json_encode(["success" => true, "cart" => $cart]);
$conn->close();
