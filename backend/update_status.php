<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");
header("Content-Type: application/json");

$conn = new mysqli("localhost", "root", "", "test");

if ($conn->connect_error) {
  echo json_encode(["success" => false, "message" => "DB connection failed"]);
  exit;
}

$data = json_decode(file_get_contents("php://input"), true);

if (!isset($data['order_id']) || !isset($data['status'])) {
  echo json_encode(["success" => false, "message" => "Missing data"]);
  exit;
}

$order_id = $data['order_id'];
$status = $data['status'];

$stmt = $conn->prepare("UPDATE orders SET status = ? WHERE id = ?");
$stmt->bind_param("si", $status, $order_id);

if ($stmt->execute()) {
  echo json_encode(["success" => true, "message" => "Order status updated"]);
} else {
  echo json_encode(["success" => false, "message" => "Failed to update status"]);
}
?>
