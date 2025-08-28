<!-- <?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Methods: POST");

include 'db.php';

$data = json_decode(file_get_contents("php://input"), true);
$full_name = $data['name'];  // ✅ Match this with React
$email = $data['email'];
$password = $data['password'];

$hashedPassword = password_hash($password, PASSWORD_DEFAULT);

// Check if email already exists
$check = $conn->prepare("SELECT * FROM users WHERE email = ?");
$check->bind_param("s", $email);
$check->execute();
$result = $check->get_result();

if ($result->num_rows > 0) {
  echo json_encode(["status" => "error", "message" => "Email already exists"]);
} else {
  $stmt = $conn->prepare("INSERT INTO users (full_name, email, password) VALUES (?, ?, ?)");
  $stmt->bind_param("sss", $full_name, $email, $hashedPassword);

  if ($stmt->execute()) {
    echo json_encode(["status" => "success", "message" => "Registered successfully"]);
  } else {
    echo json_encode(["status" => "error", "message" => "Registration failed"]);
  }
}
?> -->


<?php
// Allow requests from frontend
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Methods: POST");
header("Content-Type: application/json");

include 'db.php';

// Get JSON input
$data = json_decode(file_get_contents("php://input"), true);

// Get form fields
$full_name = $data['name'];  // Match with React field: name
$email = $data['email'];
$password = $data['password'];

// 🔐 Hash the password securely
$hashedPassword = password_hash($password, PASSWORD_DEFAULT);

// ✅ Check if email already registered
$check = $conn->prepare("SELECT * FROM users WHERE email = ?");
$check->bind_param("s", $email);
$check->execute();
$result = $check->get_result();

if ($result->num_rows > 0) {
    echo json_encode(["status" => "error", "message" => "Email already exists"]);
} else {
    // ✅ Insert user into database
    $stmt = $conn->prepare("INSERT INTO users (full_name, email, password) VALUES (?, ?, ?)");
    $stmt->bind_param("sss", $full_name, $email, $hashedPassword);

    if ($stmt->execute()) {
        echo json_encode(["status" => "success", "message" => "Registered successfully"]);
    } else {
        echo json_encode(["status" => "error", "message" => "Registration failed"]);
    }
}
?>
