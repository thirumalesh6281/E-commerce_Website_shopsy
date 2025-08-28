<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");

// Connect to DB
$conn = new mysqli("localhost", "root", "", "test");

if ($conn->connect_error) {
  echo json_encode(["success" => false, "message" => "Database connection failed"]);
  exit;
}

// Get raw POST body and decode JSON
$data = json_decode(file_get_contents("php://input"), true);

if (
  !isset($data['address']) || 
  !isset($data['payment']) || 
  !isset($data['total']) || 
  !isset($data['items']) || 
  !is_array($data['items'])
) {
  echo json_encode(["success" => false, "message" => "Missing data"]);
  exit;
}

$address = $conn->real_escape_string($data['address']);
$payment = $conn->real_escape_string($data['payment']);
$total = (float)$data['total'];
$time = date("Y-m-d H:i:s");

// Insert into orders table
$order_sql = "INSERT INTO orders (address, payment, total, time) VALUES ('$address', '$payment', $total, '$time')";

if ($conn->query($order_sql)) {
  $order_id = $conn->insert_id;

  // Insert each item into order_items
  $all_inserted = true;
  foreach ($data['items'] as $item) {
    if (!isset($item['name'], $item['price'], $item['image'])) {
      continue; // Skip if data is incomplete
    }
    
    $name = $conn->real_escape_string($item['name']);
    $price = (float)$item['price'];
    $image = $conn->real_escape_string($item['image']);

    $item_sql = "INSERT INTO order_items (order_id, name, price, image) 
                 VALUES ($order_id, '$name', $price, '$image')";
                 
    if (!$conn->query($item_sql)) {
      $all_inserted = false;
      break;
    }
  }

  if ($all_inserted) {
    echo json_encode(["success" => true, "message" => "Order placed successfully"]);
  } else {
    echo json_encode(["success" => false, "message" => "Failed to insert all items"]);
  }

} else {
  echo json_encode(["success" => false, "message" => "Failed to insert order"]);
}

$conn->close();
?>
