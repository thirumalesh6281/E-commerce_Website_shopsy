<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");

// Connect to database
$conn = new mysqli("localhost", "root", "", "test");

if ($conn->connect_error) {
    echo json_encode(["success" => false, "message" => "Database connection failed"]);
    exit;
}

// Get category from query param
$category = isset($_GET['category']) ? strtolower($_GET['category']) : '';

if ($category) {
    // Make category case-insensitive
    $sql = "SELECT * FROM products WHERE LOWER(category) = '$category' ORDER BY id DESC";
} else {
    $sql = "SELECT * FROM products ORDER BY id DESC";
}

$result = $conn->query($sql);

$products = [];

if ($result && $result->num_rows > 0) {
    while ($row = $result->fetch_assoc()) {
        $products[] = $row;
    }
}

echo json_encode(["success" => true, "products" => $products]);
?>
