<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");

// DB connection
$conn = new mysqli("localhost", "root", "", "test");
if ($conn->connect_error) {
  echo json_encode(["error" => "Database connection failed"]);
  exit;
}

// Fetch users
$sql = "SELECT id, full_name, email FROM users";
$result = $conn->query($sql);

$users = [];

if ($result && $result->num_rows > 0) {
  while ($row = $result->fetch_assoc()) {
    $users[] = $row;
  }
  echo json_encode($users);
} else {
  echo json_encode([]);
}

$conn->close();
?>
