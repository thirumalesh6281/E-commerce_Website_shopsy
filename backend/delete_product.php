<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");
header("Content-Type: application/json");

$conn = new mysqli("localhost", "root", "", "test");

if ($conn->connect_error) {
  echo json_encode(["success" => false, "message" => "Database connection failed"]);
  exit;
}

// Get raw POST data
$data = json_decode(file_get_contents("php://input"), true);

if (!isset($data['id'])) {
  echo json_encode(["success" => false, "message" => "Product ID is required"]);
  exit;
}

$id = intval($data['id']);

$sql = "DELETE FROM products WHERE id = $id";

if ($conn->query($sql)) {
  echo json_encode(["success" => true, "message" => "Product deleted"]);
} else {
  echo json_encode(["success" => false, "message" => "Failed to delete product"]);
}
?>
