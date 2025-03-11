<?php
$servername = "sql201.infinityfree.com";
$username = "if0_38341090";
$password = "Lin20041015";
$dbname = "if0_38341090_441week4";

$conn = new mysqli($servername, $username, $password, $dbname);

if ($conn->connect_error) {
    die("Connection failed: ". $conn->connect_error);
}

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $classes = json_decode($_POST['classes'], true);
    foreach ($classes as $class) {
        $subject = $conn->real_escape_string($class['subject']);
        $day = $conn->real_escape_string($class['day']);
        $time = $conn->real_escape_string($class['time']);
        $teacher = $conn->real_escape_string($class['teacher']);

        $sql = "INSERT INTO timetables (subject, day, time, teacher) 
                VALUES ('$subject', '$day', '$time', '$teacher')";

        if ($conn->query($sql) === TRUE) {
            continue;
        } else {
            echo "Error: ". $sql. "<br>". $conn->error;
        }
    }
    echo "Data exported to MySQL successfully";
}

$conn->close();
?>