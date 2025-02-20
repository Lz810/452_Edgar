<?php
$servername = "sql201.infinityfree.com"; // replace with your MySQL server address
$dbname = "if0_38341090_books"; // replace with your MySQL database name
$username = "if0_38341090"; // replace with your MySQL username
$password = "Lin20041015"; // replace with your MySQL password
 
try {
  $pdo = new PDO("mysql:host=$servername;dbname=$dbname", $username, $password);
  $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
 
  $stmt = $pdo->query("SELECT * FROM customers");
  $customers = $stmt->fetchAll(PDO::FETCH_ASSOC);
?>
 
<!DOCTYPE html>
<html>
<head>
    <title>Lin's Customer Records</title>
    <style>
        table {
            border-collapse: collapse;
            width: 100%;
            margin-top: 20px;
        }
        th, td {
            border: 1px solid #ddd;
            padding: 8px;
            text-align: left;
        }
        th {
            background-color: #4CAF50;
            color: white;
        }
        tr:nth-child(even) {
            background-color: #f2f2f2;
        }
        h1 {
            color: #4CAF50;
            text-align: center;
        }
    </style>
</head>
 
<body>
    <h1>Lin's Customer Records</h1>
    <table>
        <tr>
            <th>Customer ID</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Email</th>
            <th>Phone Number</th>
            <th>Address</th>
            <th>City</th>
            <th>Country</th>
        </tr>
        <?php foreach ($customers as $customer): ?>
            <tr>
                <td><?php echo htmlspecialchars($customer['customer_id']); ?></td>
                <td><?php echo htmlspecialchars($customer['first_name']); ?></td>
                <td><?php echo htmlspecialchars($customer['last_name']); ?></td>
                <td><?php echo htmlspecialchars($customer['email']); ?></td>
                <td><?php echo htmlspecialchars($customer['phone_number']); ?></td>
                <td><?php echo htmlspecialchars($customer['address']); ?></td>
                <td><?php echo htmlspecialchars($customer['city']); ?></td>
                <td><?php echo htmlspecialchars($customer['country']); ?></td>
            </tr>
        <?php endforeach; ?>
    </table>
</body>
</html>
 
<?php
  $pdo = null;
} catch (PDOException $e) {
  echo "Error: " . $e->getMessage();
}
?>