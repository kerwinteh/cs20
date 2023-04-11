<html>
<head>
    <title>Two Owls Cafe</title>
    <style>
        * {
            background-color: #edf7f6;
        }
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

        .inputArea {
            text-align: center;   
        }

        .inputBox {
            padding: 5px;
            padding-right: 15px;
        }

        #submit {
            border-radius: 5px;
            padding: 5px;
            width: 100px;
        }
    </style>

</head>

<body>
<header>
<h1>Two Owls Cafe</h1>
<h4>Hours: 8pm - 3am daily</h4>
</header>

<form method="post" action="orderSummary.php" onsubmit="return validate()">
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
    echo "<td>$" . number_format($row["cost"], 2, '.', '') . "</td>";
    
    
    echo "<td>";
    echo "<select name='". $row['id'] ."' id='food'>";
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

</table>
<br><br><br>

<div class="inputArea">
<label class="inputBox" for="first-name">First Name:</label>
<input class="inputBox" type="text" id="first-name" name="first-name"><br><br>

<label class="inputBox" for="last-name">Last Name:</label>
<input class="inputBox" type="text" id="last-name" name="last-name"><br><br>

<label class="inputBox" for="special-instructions">Special Instructions:</label>
<textarea class="inputBox" id="special-instructions" name="special-instructions"></textarea><br><br>

<input id="submit" type="submit" value="Submit">
</div>
</form>


<script> 
    function validate() {
        let valid = true; 
        if(validate_item_quantity() == false) {
            alert("Buy something!");
            valid = false;
        }
        
        if (validate_names() == false){
            valid = false; 
        }

        if(validate_time() == false){
            valid = false;
            alert("Please order during open hours");
        }
        return valid;
    }

    function validate_item_quantity(){
        let toReturn = false;
        let numItem = document.querySelectorAll("#food");
        for(let i = 0; i < numItem.length; i++){
            if(numItem[i].value > 0){
                return true; 
            }
        }
        return false; 
    }

    function validate_names(){
        let valid = true;
        let firstName = document.getElementById("first-name");
        let lastName = document.getElementById("last-name");
        if (firstName.value.length == 0){
            alert("please enter your first name");
            valid = false;
        } 
        if (lastName.value.length == 0){
            alert("please enter your last name");
            valid = false;
        }
        return valid; 
    }

    function validate_time(){
        let valid = false;
        var current_time = new Date();
        var hours = current_time.getHours();
        var minutes = current_time.getMinutes();
        if ((hours >= 20 || hours < 2) || (hours == 2 && minutes <= 30) ) {
            valid = true;
        } else {
            valid = false;
        }
        return valid;
    }

</script>
</body>
</html>