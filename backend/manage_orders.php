<!-- <?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: text/html");

$conn = new mysqli("localhost", "root", "", "test");
if ($conn->connect_error) {
  die("Connection failed: " . $conn->connect_error);
}

// Fetch all orders
$orderSql = "SELECT * FROM orders ORDER BY id DESC";
$orderResult = $conn->query($orderSql);

echo "<h2>🧾 Manage Orders</h2>";

if ($orderResult->num_rows > 0) {
  while ($order = $orderResult->fetch_assoc()) {
    echo "<div style='border:1px solid #ccc; padding:10px; margin:10px 0;'>";
    echo "<h3>Order ID: " . $order['id'] . "</h3>";
    echo "<p><strong>Address:</strong> " . htmlspecialchars($order['address']) . "</p>";
    echo "<p><strong>Payment:</strong> " . (isset($order['payment']) ? htmlspecialchars($order['payment']) : 'N/A') . "</p>";
    echo "<p><strong>Total:</strong> ₹" . (isset($order['total']) ? htmlspecialchars($order['total']) : '0.00') . "</p>";
    echo "<p><strong>Time:</strong> " . (isset($order['time']) ? htmlspecialchars($order['time']) : 'N/A') . "</p>";

    // Fetch items for this order
    $orderId = $order['id'];
    $itemSql = "SELECT * FROM order_items WHERE order_id = $orderId";
    $itemResult = $conn->query($itemSql);

    if ($itemResult->num_rows > 0) {
      while ($item = $itemResult->fetch_assoc()) {
        echo "<div style='margin-left:20px; padding:5px 0;'>";
        echo "<img src='" . htmlspecialchars($item['image']) . "' alt='Product Image' style='width:80px; height:auto;' /><br>";
        echo "<p><strong>Name:</strong> " . (isset($item['name']) ? htmlspecialchars($item['name']) : 'N/A') . "</p>";
        echo "<p><strong>Price:</strong> ₹" . (isset($item['price']) ? htmlspecialchars($item['price']) : '0.00') . "</p>";
        echo "<p><strong>Quantity:</strong> " . (isset($item['quantity']) ? htmlspecialchars($item['quantity']) : 'N/A') . "</p>";
        echo "</div>";
      }
    } else {
      echo "<p>No items found for this order.</p>";
    }

    echo "</div>";
  }
} else {
  echo "<p>No orders found.</p>";
}

$conn->close();
?> -->



<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");

$conn = new mysqli("localhost", "root", "", "test");
if ($conn->connect_error) {
    echo json_encode(["success" => false, "message" => "Database connection failed"]);
    exit;
}

$orders = [];

$orderSql = "SELECT * FROM orders ORDER BY id DESC";
$orderResult = $conn->query($orderSql);

if ($orderResult && $orderResult->num_rows > 0) {
    while ($order = $orderResult->fetch_assoc()) {
        $orderId = $order['id'];

        // Fetch items for this order
        $items = [];
        $itemSql = "SELECT * FROM order_items WHERE order_id = $orderId";
        $itemResult = $conn->query($itemSql);

        if ($itemResult && $itemResult->num_rows > 0) {
            while ($item = $itemResult->fetch_assoc()) {
                $items[] = [
                    "id" => $item['id'],
                    "name" => $item['name'] ?? 'N/A',
                    "price" => (float)($item['price'] ?? 0),
                    "image" => $item['image'] ?? '',
                    "quantity" => (int)($item['quantity'] ?? 1)
                ];
            }
        }

        // Add items to order
        $orders[] = [
            "id" => $order['id'],
            "address" => $order['address'],
            "payment" => $order['payment'],
            "total" => (float)$order['total'],
            "time" => $order['time'],
            "items" => $items
        ];
    }

    echo json_encode(["success" => true, "orders" => $orders], JSON_PRETTY_PRINT);
} else {
    echo json_encode(["success" => true, "orders" => []]);
}

$conn->close();
?>
