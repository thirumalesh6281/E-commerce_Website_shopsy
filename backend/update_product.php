<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");
header("Content-Type: application/json");

$conn = new mysqli("localhost", "root", "", "test");

if ($conn->connect_error) {
    echo json_encode(["success" => false, "message" => "Database connection failed"]);
    exit;
}

// Read raw POST data
$data = json_decode(file_get_contents("php://input"), true);

// Validate
if (!isset($data['id'])) {
    echo json_encode(["success" => false, "message" => "Product ID is required"]);
    exit;
}

$id = intval($data['id']);
$name = $conn->real_escape_string($data['name']);
$price = floatval($data['price']);
$description = $conn->real_escape_string($data['description']);
$category = $conn->real_escape_string($data['category']);
$image = $conn->real_escape_string($data['image']);

$sql = "UPDATE products SET 
        name = '$name',
        price = '$price',
        description = '$description',
        category = '$category',
        image = '$image'
        WHERE id = $id";

if ($conn->query($sql)) {
    echo json_encode(["success" => true, "message" => "Product updated successfully"]);
} else {
    echo json_encode(["success" => false, "message" => "Failed to update product"]);
}
?>
