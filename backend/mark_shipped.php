<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");

$conn = new mysqli("localhost", "root", "", "test");

if ($conn->connect_error) {
  echo json_encode(["success" => false, "message" => "Connection failed"]);
  exit;
}

$data = json_decode(file_get_contents("php://input"), true);

$orderId = $data['order_id'];
$itemName = $data['item_name'];

if (!$orderId || !$itemName) {
  echo json_encode(["success" => false, "message" => "Missing parameters"]);
  exit;
}

$sql = "UPDATE order_items SET status = 'shipped' WHERE order_id = ? AND name = ?";
$stmt = $conn->prepare($sql);
$stmt->bind_param("is", $orderId, $itemName);

if ($stmt->execute()) {
  echo json_encode(["success" => true, "message" => "Marked as shipped"]);
} else {
  echo json_encode(["success" => false, "message" => "Failed to update status"]);
}
?>
