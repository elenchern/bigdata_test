<?php
require('config/db.php');

// header('Content-Type: application/json');s
header('Access-Control-Allow-Origin: *');
$sql = "SELECT * FROM entrances LIMIT 3"; // Запрашиваем данные из таблицы entrances
$result = $conn->query($sql);

$entrances = [];
if ($result->num_rows > 0) {
    // Выбираем данные в массив
    while ($row = $result->fetch_assoc()) {
        $entrances[] = $row;
    }
}

echo json_encode($entrances); // Возвращаем данные в формате JSON

$conn->close();

?>