<?php
//подключение к бд
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "bigdata";
// Create connection
$conn = mysqli_connect($servername, $username, $password, $dbname);
// Check connection
if (!$conn) {
    die("Connection failed: " . mysqli_connect_error());
}

//запись данных
if (!error_get_last()) {
    //получаю данные
    $json = file_get_contents("php://input");
    $data = json_decode($json);
    //меняю формат
    $array_data = (array) $data;
    //отделяем ключ/знчение
    $columns = implode(", ",array_keys($array_data));
    $escaped_values = array_map(array($conn, 'real_escape_string'), array_values($array_data));
    $values  = implode("', '", $escaped_values);

    //запись в бд
    $sql = "INSERT INTO `entrances`($columns) VALUES ('$values')";
    mysqli_query($conn, $sql);
}