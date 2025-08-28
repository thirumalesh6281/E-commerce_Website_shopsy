<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Methods: POST");
header("Content-Type: application/json");

include 'db.php';

// ✅ Receive JSON input
$data = json_decode(file_get_contents("php://input"), true);

if (!$data) {
  echo json_encode(["status" => "error", "message" => "No input received"]);
  exit;
}

$email = $data['email'] ?? '';
$password = $data['password'] ?? '';

// Check user
$stmt = $conn->prepare("SELECT * FROM users WHERE email = ?");
$stmt->bind_param("s", $email);
$stmt->execute();
$result = $stmt->get_result();

if ($result->num_rows === 1) {
  $user = $result->fetch_assoc();
  if (password_verify($password, $user['password'])) {
    echo json_encode([
      "status" => "success",
      "message" => "Login successful",
      "user_id" => $user['id'],
      "name" => $user['full_name'],
      "email" => $user['email']
    ]);
  } else {
    echo json_encode(["status" => "error", "message" => "Invalid password"]);
  }
} else {
  echo json_encode(["status" => "error", "message" => "User not found"]);
}
?>
