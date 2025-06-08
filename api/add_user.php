<?php
// Ustaw nagłówki
header("Content-Type: application/json");
header("Access-Control-Allow-Origin: *"); // opcjonalnie, dla testów lokalnych

require_once("../config/db.php");

// Pobierz dane JSON z zapytania
$data = json_decode(file_get_contents("php://input"));

if (!isset($data->name) || !isset($data->surname) || !isset($data->email) || !isset($data->age) || !isset($data->date_birth) ) {
    http_response_code(400);
    echo json_encode(["error" => "Brak wymaganych danych"]);
    exit();
}

$name = trim($data->name);
$surname = trim($data->surname);
$email = trim($data->email);
$age = trim($data->age);
$date_birth = trim($data->date_birth);

// Przygotuj zapytanie SQL
$stmt = $conn->prepare("INSERT INTO users (name, surname, email, age, date_birth) VALUES (:name, :surname, :email, :age, :date_birth)");
$stmt->bindParam(':name', $name);
$stmt->bindParam(':surname', $surname);
$stmt->bindParam(':email', $email);
$stmt->bindParam(':age', $age);
$stmt->bindParam(':date_birth', $date_birth);

if ($stmt->execute()) {
    echo json_encode(["message" => "Użytkownik dodany pomyślnie"]);
} else {
    http_response_code(500);
    echo json_encode(["error" => "Nie udało się dodać użytkownika"]);
}
?>
