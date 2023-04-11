<html>
<head>
    <title>Two Owls Cafe</title>
    <style>
        table {
            border: 1px solid black;
            border-collapse: collapse;
            width: 80%;
            margin: 0 auto;
        }

        th, td {
            border: 1px solid black;
            padding: 10px;
            text-align: center;
        }

        header {
            text-align: center; 
        }
    </style>
</head>
<body>
<header>
<h1>Two Owls Cafe</h1>
<p>Hours: 8pm - 3am daily</p>
</header>

<form>
<table>
  <thead>
    <tr>
      <th>Item Name</th>
      <th>Cost</th>
      <th>Quantity</th>
    </tr>
  </thead>


<?php
$server = "localhost";
$userid = "umpd7uxy09r60";
$pw = "x2?141Bj$54x";
$db = "db3pagxkq8lstw";

// Create connection
$conn = new mysqli($server, $userid, $pw, $db);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

//select the database
$conn->select_db($db);
$sql = "SELECT * FROM menu_items";
$result = $conn->query($sql);

// get results
while($row = $result->fetch_assoc()){
    echo "<tr>";
    echo "<td>". $row["name"]. "</td>";
    echo "<td>" . number_format($row["cost"], 2, '.', '') . "</td>";
    
    
    echo "<td>";
    echo "<select name='quantity' id='food'>";
    for($x = 0; $x <= 10; $x++){
        echo "<option value=$x>$x</option>";
    }
    echo "</select>";
    echo "</td>";   

    echo "</tr>";
}


//close the connection
$conn->close();

?>

<label for="first-name">First Name:</label>
  <input type="text" id="first-name" name="first-name" required>
  
  <label for="last-name">Last Name:</label>
  <input type="text" id="last-name" name="last-name" required>

  <label for="special-instructions">Special Instructions:</label>
  <textarea id="special-instructions" name="special-instructions"></textarea>

  <input type="submit" value="Submit">
</form>

</table>
</body>
</html>