<?php
header("Access-Control-Allow-Origin: *"); // Allow access from frontend
header("Content-Type: application/json");

// Connect to DB
$conn = new mysqli("localhost", "root", "", "test");

if ($conn->connect_error) {
    die(json_encode(["error" => "Database connection failed"]));
}

if (!isset($_GET['id'])) {
    echo json_encode(["error" => "User ID missing"]);
    exit;
}

$id = intval($_GET['id']);
$sql = "SELECT id, name, email FROM users WHERE id = $id"; // Adjust table/columns

$result = $conn->query($sql);

if ($result->num_rows > 0) {
    $user = $result->fetch_assoc();
    echo json_encode($user);
} else {
    echo json_encode(["error" => "User not found"]);
}

$conn->close();
?>
