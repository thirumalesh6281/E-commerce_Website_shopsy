<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");

$conn = new mysqli("localhost", "root", "", "test");

if ($conn->connect_error) {
    echo json_encode(["success" => false, "message" => "Database connection failed"]);
    exit;
}

// ✅ Join orders with order_items (flat structure)
$sql = "
    SELECT 
        o.id,
        o.address,
        o.payment,
        o.total,
        o.time,
        i.name,
        i.price,
        i.image,
        i.status
    FROM orders o
    JOIN order_items i ON o.id = i.order_id
    ORDER BY o.id DESC
";

$result = $conn->query($sql);

$ordersData = [];
if ($result && $result->num_rows > 0) {
    while ($row = $result->fetch_assoc()) {
        $ordersData[] = $row;
    }
}

echo json_encode(["success" => true, "orders" => $ordersData]);

$conn->close();
?>
