<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");

$conn = new mysqli("localhost", "root", "", "test");
if ($conn->connect_error) {
  echo json_encode(["success" => false, "message" => "Connection failed"]);
  exit;
}

$sql = "SELECT * FROM delivered_items_v2 ORDER BY id DESC";
$result = $conn->query($sql);

$orders = [];

while ($row = $result->fetch_assoc()) {
  $orders[] = $row;
}

echo json_encode(["success" => true, "orders" => $orders]);
?>
