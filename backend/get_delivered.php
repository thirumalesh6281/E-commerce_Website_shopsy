<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");

// Connect to DB
$conn = new mysqli("localhost", "root", "", "test");

if ($conn->connect_error) {
    echo json_encode(["success" => false, "message" => "Database connection failed"]);
    exit;
}

// Fetch delivered items
$sql = "SELECT * FROM delivered_items_v2 ORDER BY time DESC";
$result = $conn->query($sql);

$delivered = [];

if ($result && $result->num_rows > 0) {
    while ($row = $result->fetch_assoc()) {
        // ✅ Explicit mapping ensures JSON keys are always consistent
        $delivered[] = [
            "id" => $row["id"],
            "order_id" => $row["order_id"],
            "user_name" => $row["user_name"],
            "name" => $row["name"],
            "price" => (float)$row["price"],
            "image" => $row["image"],
            "quantity" => (int)$row["quantity"],
            "address" => $row["address"],
            "payment_method" => $row["payment_method"],
            "total" => (float)$row["total"],
            "time" => $row["time"]
        ];
    }
}

// ✅ Always return success with array (empty or filled)
echo json_encode([
    "success" => true,
    "delivered" => $delivered
]);

$conn->close();
?>
