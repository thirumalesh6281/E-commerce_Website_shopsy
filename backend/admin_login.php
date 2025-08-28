<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Methods: POST");
header("Content-Type: application/json");

include 'db.php'; // ✅ Make sure your DB config is correct

// ✅ Get JSON input
$data = json_decode(file_get_contents("php://input"), true);

// ✅ Validate input
if (!isset($data['email']) || !isset($data['password'])) {
  echo json_encode(["status" => "error", "message" => "Email and password are required"]);
  exit;
}

$email = $data['email'];
$password = $data['password'];

// ✅ Query admin table
$stmt = $conn->prepare("SELECT * FROM admins WHERE email = ?");
$stmt->bind_param("s", $email);
$stmt->execute();
$result = $stmt->get_result();

// ✅ Validate admin credentials
if ($result->num_rows === 1) {
  $admin = $result->fetch_assoc();

  if (password_verify($password, $admin['password'])) {
    echo json_encode([
      "status" => "success",
      "message" => "Admin login successful",
      "admin_id" => $admin['id'],
      "email" => $admin['email']
    ]);
  } else {
    echo json_encode(["status" => "error", "message" => "Invalid password"]);
  }
} else {
  echo json_encode(["status" => "error", "message" => "Admin not found"]);
}

$stmt->close();
$conn->close();
?>
