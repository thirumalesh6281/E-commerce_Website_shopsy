<!-- <?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");
header("Access-Control-Allow-Headers: *");

// DB connection
$conn = new mysqli("localhost", "root", "", "test");
if ($conn->connect_error) {
    echo json_encode(["success" => false, "message" => "Database connection failed"]);
    exit;
}

// Get input
$data = json_decode(file_get_contents("php://input"), true);
if (!$data) {
    echo json_encode(["success" => false, "message" => "Invalid input"]);
    exit;
}

$product_id = $data['product_id'] ?? '';
$name = $data['name'] ?? '';
$price = $data['price'] ?? 0;
$image = $data['image'] ?? '';
$quantity = $data['quantity'] ?? 1;
$address = $data['address'] ?? 'Default Address';
$payment = $data['payment'] ?? 'Cash on Delivery';

$delivery_charge = 30;
$total = ($price * $quantity) + ($delivery_charge * $quantity);
$time = date("Y-m-d H:i:s");

// Insert into orders table
$order_sql = "INSERT INTO orders (address, payment, total, time) VALUES ('$address', '$payment', '$total', '$time')";
if ($conn->query($order_sql)) {
    $order_id = $conn->insert_id;

    // Insert into order_items table
    $item_sql = "INSERT INTO order_items (order_id, product_id, name, price, image, quantity) 
                 VALUES ('$order_id', '$product_id', '$name', '$price', '$image', '$quantity')";
    $conn->query($item_sql);

    // (Optional) Remove product from cart after buy now
    $conn->query("DELETE FROM cart WHERE product_id = '$product_id'");

    echo json_encode(["success" => true, "message" => "✅ Product ordered successfully"]);
} else {
    echo json_encode(["success" => false, "message" => "❌ Failed to place order"]);
}
?> -->



<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");
header("Access-Control-Allow-Headers: *");

// DB connection
$conn = new mysqli("localhost", "root", "", "test");
if ($conn->connect_error) {
    echo json_encode(["success" => false, "message" => "Database connection failed"]);
    exit;
}

// Get input
$data = json_decode(file_get_contents("php://input"), true);
if (!$data) {
    echo json_encode(["success" => false, "message" => "Invalid input"]);
    exit;
}

$product_id = $conn->real_escape_string($data['product_id'] ?? '');
$name       = $conn->real_escape_string($data['name'] ?? '');
$price      = (float)($data['price'] ?? 0);
$image      = $conn->real_escape_string($data['image'] ?? '');
$quantity   = (int)($data['quantity'] ?? 1);
$address    = $conn->real_escape_string($data['address'] ?? '');
$payment    = $conn->real_escape_string($data['payment'] ?? '');

if (!$product_id || !$name || !$price || !$image || !$address || !$payment) {
    echo json_encode(["success" => false, "message" => "Missing fields in input"]);
    exit;
}

// Order calculations
$delivery_charge = 30;
$total = ($price * $quantity) + ($delivery_charge * $quantity);
$time = date("Y-m-d H:i:s");

// Insert into orders
$order_sql = "INSERT INTO orders (address, payment, total, time) VALUES ('$address', '$payment', '$total', '$time')";
if ($conn->query($order_sql)) {
    $order_id = $conn->insert_id;

    // Insert into order_items
    $item_sql = "INSERT INTO order_items (order_id, product_id, name, price, image, quantity) 
                 VALUES ('$order_id', '$product_id', '$name', '$price', '$image', '$quantity')";
    $item_result = $conn->query($item_sql);

    // Optional: remove from cart
    $conn->query("DELETE FROM cart WHERE product_id = '$product_id'");

    echo json_encode(["success" => true, "message" => "✅ Product ordered successfully"]);
} else {
    echo json_encode([
        "success" => false,
        "message" => "❌ Failed to place order",
        "error" => $conn->error
    ]);
}
?>
