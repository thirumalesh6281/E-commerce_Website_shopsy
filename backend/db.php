<?php
$host = 'localhost';
$username = 'root';
$password = '';
$dbname = 'test';  // ✅ your real database name

$conn = new mysqli($host, $username, $password, $dbname);
if ($conn->connect_error) {
  die(json_encode(['success' => false, 'message' => 'Database error']));
}
?>
