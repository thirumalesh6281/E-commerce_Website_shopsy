<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");

// DB Connection
$conn = new mysqli("localhost", "root", "", "test");
if ($conn->connect_error) {
  echo json_encode(["success" => false, "message" => "Connection failed"]);
  exit;
}

// Fetch all cart items
$sql = "SELECT product_id, name, price, image, quantity FROM cart";
$result = $conn->query($sql);

$items = [];
$total = 0;

if ($result && $result->num_rows > 0) {
  while ($row = $result->fetch_assoc()) {
    $subtotal = $row['price'] * $row['quantity'] + (30 * $row['quantity']); // price + ₹30 per item
    $row['subtotal'] = $subtotal;
    $items[] = $row;
    $total += $subtotal;
  }

  echo json_encode([
    "success" => true,
    "cart" => $items,
    "total" => $total
  ]);
} else {
  echo json_encode(["success" => false, "message" => "No items in cart"]);
}
?>
