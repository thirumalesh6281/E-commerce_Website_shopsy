<?php
header("Content-Type: application/json");
$conn = new mysqli("localhost", "root", "", "test");

if ($conn->connect_error) {
  echo json_encode(["success" => false, "message" => "Database connection failed"]);
  exit();
}

$sql = "SELECT * FROM products WHERE category = 'men'";
$result = $conn->query($sql);

$products = [];

while ($row = $result->fetch_assoc()) {
  $row['image'] = "http://localhost/backend/uploads/" . $row['image'];
  $products[] = $row;
}

echo json_encode(["success" => true, "products" => $products]);
$conn->close();
?>
