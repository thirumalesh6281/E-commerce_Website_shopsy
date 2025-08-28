<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");

// Connect DB
$conn = new mysqli("localhost", "root", "", "test");

if ($conn->connect_error) {
  echo json_encode(["success" => false, "message" => "DB connection failed"]);
  exit;
}

// Read raw POST JSON body
$data = json_decode(file_get_contents("php://input"), true);

// Validate input
if (!isset($data['order_id'])) {
  echo json_encode(["success" => false, "message" => "Missing order_id"]);
  exit;
}

$order_id = intval($data['order_id']);

// Delete from order_items first
$conn->query("DELETE FROM order_items WHERE order_id = $order_id");

// Then delete from orders table
$result = $conn->query("DELETE FROM orders WHERE order_id = $order_id");

if ($result) {
  echo json_encode(["success" => true]);
} else {
  echo json_encode(["success" => false, "message" => "Failed to delete order"]);
}
?>
