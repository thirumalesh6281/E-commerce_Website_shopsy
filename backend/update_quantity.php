<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");

$data = json_decode(file_get_contents("php://input"), true);

$conn = new mysqli("localhost", "root", "", "test");
if ($conn->connect_error) {
  echo json_encode(["success" => false]);
  exit;
}

$product_id = intval($data["product_id"]);
$quantity = intval($data["quantity"]);

$sql = "UPDATE cart SET quantity = $quantity WHERE product_id = $product_id";
$conn->query($sql);

echo json_encode(["success" => true]);
?>
