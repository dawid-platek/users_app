<?php
header("Content-Type: application/json");
require_once("../config/db.php");

$stmt = $conn->prepare("SELECT * FROM users");
$stmt->execute();
$results = $stmt->fetchAll(PDO::FETCH_ASSOC);
echo json_encode($results);
?>