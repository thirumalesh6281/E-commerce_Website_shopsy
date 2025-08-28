<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Methods: POST");

$conn = new mysqli("localhost", "root", "", "test");

if ($conn->connect_error) {
  die(json_encode(["success" => false, "message" => "DB connection failed."]));
}

$name = $_POST['name'];
$price = $_POST['price'];
$description = $_POST['description'];
$category = $_POST['category'];

if (isset($_FILES['image'])) {
  $imageName = uniqid() . '_' . basename($_FILES['image']['name']);
  $targetDir = "uploads/";
  $targetFile = $targetDir . $imageName;

  if (move_uploaded_file($_FILES['image']['tmp_name'], $targetFile)) {
    $imageURL = "http://localhost/backend/" . $targetFile;

    $stmt = $conn->prepare("INSERT INTO products (name, price, description, category, image) VALUES (?, ?, ?, ?, ?)");
    $stmt->bind_param("sssss", $name, $price, $description, $category, $imageURL);

    if ($stmt->execute()) {
      echo json_encode(["success" => true]);
    } else {
      echo json_encode(["success" => false, "message" => "Insert failed"]);
    }

    $stmt->close();
  } else {
    echo json_encode(["success" => false, "message" => "Image upload failed"]);
  }
} else {
  echo json_encode(["success" => false, "message" => "Image not received"]);
}

$conn->close();
?>
