<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");

$conn = new mysqli("localhost", "root", "", "test");

if ($conn->connect_error) {
  echo json_encode(["success" => false, "message" => "DB Connection Failed"]);
  exit;
}

$data = json_decode(file_get_contents("php://input"), true);

$product_id = intval($data['product_id']);
$name = $conn->real_escape_string($data['name']);
$price = floatval($data['price']);
$image = $conn->real_escape_string($data['image']);

// Check if already in cart
$check = $conn->query("SELECT * FROM cart WHERE product_id = $product_id");
if ($check->num_rows > 0) {
  // update quantity
  $conn->query("UPDATE cart SET quantity = quantity + 1 WHERE product_id = $product_id");
} else {
  // insert new
  $conn->query("INSERT INTO cart (product_id, name, price, image, quantity) VALUES ($product_id, '$name', $price, '$image', 1)");
}

echo json_encode(["success" => true, "message" => "Product added to cart"]);
?>
