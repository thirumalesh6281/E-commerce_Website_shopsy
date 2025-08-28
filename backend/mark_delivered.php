<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");

$conn = new mysqli("localhost", "root", "", "test");
if ($conn->connect_error) {
  echo json_encode(["success" => false, "message" => "Database connection failed"]);
  exit;
}

$data = json_decode(file_get_contents("php://input"), true);

if (!$data || !isset($data['order_id']) || !isset($data['item_name'])) {
  echo json_encode(["success" => false, "message" => "Missing order_id or item_name"]);
  exit;
}

$order_id = $data['order_id'];
$item_name = $data['item_name'];

// 1️⃣ Update order_items to delivered
$update = $conn->prepare("UPDATE order_items SET status='delivered' WHERE order_id=? AND name=?");
$update->bind_param("is", $order_id, $item_name);
$update->execute();

// 2️⃣ Fetch full item & order details
$sql = "SELECT oi.name, oi.price, oi.image, oi.quantity,
               o.address, o.payment, o.total, o.time
        FROM order_items oi
        JOIN orders o ON oi.order_id = o.id
        WHERE oi.order_id=? AND oi.name=?";
$stmt = $conn->prepare($sql);
$stmt->bind_param("is", $order_id, $item_name);
$stmt->execute();
$result = $stmt->get_result()->fetch_assoc();

if ($result) {
    // 3️⃣ Insert into delivered_items_v2
    $insert = $conn->prepare("
      INSERT INTO delivered_items_v2 
      (order_id, user_name, name, price, image, quantity, address, payment_method, total, time)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    ");
    
    $user_name = "Guest"; // If you have user name, replace here

    $insert->bind_param(
      "issisissis",
      $order_id,              // int
      $user_name,             // string
      $result['name'],        // string
      $result['price'],       // int
      $result['image'],       // string
      $result['quantity'],    // int
      $result['address'],     // string
      $result['payment'],     // string
      $result['total'],       // int
      $result['time']         // string (datetime)
    );
    
    if ($insert->execute()) {
        echo json_encode(["success" => true, "message" => "Item marked as delivered and saved"]);
    } else {
        echo json_encode(["success" => false, "message" => "Marked delivered but insert failed"]);
    }

} else {
    echo json_encode(["success" => false, "message" => "Item not found"]);
}
?>
