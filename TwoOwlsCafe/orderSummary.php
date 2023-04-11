<html>
<head>
    <title>Two Owls Cafe</title>
    <style>
        * {
            background-color: #edf7f6;
        }

        header {
            text-align: center; 
        }

        ul,li {
            list-style: none;
            margin:0;
            padding:0;
            background-color: #b8f2e6;
        }

        #order {
            text-align: center;
            padding: 20px;
            background-color: #b8f2e6;
        }

        #summary {
            margin: 0 auto;
            width: 50%;
            display: flex;
            justify-content: center;
            align-items: center;
        }

        .color, p {
            background-color: #b8f2e6;
        }
    </style>

</head>

<body>
<header>
<h1>Two Owls Cafe</h1>
<h4>Hours: 8pm - 3am daily</h4>
</header>


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


$subtotal = 0;
echo "<div id='summary'>";
echo "<div id='order'>"; 
echo "<h1 class='color'>Order Summary</h1>";
echo "<h2 class='color'>For ".$_POST['first-name']." ".$_POST['last-name']. "</h2>";
echo "<ul>";
foreach($_POST as $key => $value){
    if($value > 0){
        $sql = "SELECT * FROM menu_items WHERE id = " . $key;
        $result = $conn->query($sql);
        $row = $result->fetch_assoc();
        echo "<li>".$value." ".$row["name"]." ($".number_format($row["cost"], 2, '.','')." each)</li>";
        $subtotal += ($row["cost"]*$value);
    }
}
echo "</ul>";
echo "<br><br><br>";
echo "<p>Special intructions: ".$_POST['special-instructions']."</p>";
echo "<p>Subtotal: $".number_format($subtotal, 2, '.','')."</p>";
$tax = number_format(0.0625*$subtotal, 2, '.','');
echo "<p>Tax (6.25%): $".number_format($tax, 2, '.', '')."</p>";
echo "<p>Total: $".($subtotal+$tax)."</p>";




//close the connection
$conn->close();
?>

<script>
    var current_time = new Date();
    current_time.setMinutes(current_time.getMinutes() + 15);
    var hours = current_time.getHours();
    var minutes = current_time.getMinutes();
    if(minutes.toString().length === 1) {
        minutes = '0' + minutes;
    }
    document.write ("<p>Pickup time: " + hours + ":" + minutes + "</p>");
</script>

</div>
</div>

</body>
</html>