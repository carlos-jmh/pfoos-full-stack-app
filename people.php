<?php
        
    $inData = getRequestInfo();

    $servername = 'localhost';
    $user = 'Carl';
    $password = 'APIGUY';
    $database = 'COP4331';

    // Take in the address, username, password, database you wish to access. 
    // How can I change this to take in only the login information?
    $conn = new mysqli($servername, $user, $password, $database);
    if ($conn->connect_error)
    {
        returnWithError( $conn->connect_error );
    }
    else
    {
        // FIND OUT HOW TO IMPLEMENT LAZY LOADING.
        $sql = "SELECT ID,FirstName,LastName,Phone,Email FROM Contacts";
        $result = $conn->query( $sql );
        $conn->close();
    }

    function sendResultInfoAsJson( $obj )
    {
        header('Content-type: application/json');
        echo $obj;
    }

    function returnWithError( $err ) 
    {
        $retValue = '{"results":[],"error":' . $err. '"}';
        sendResultInfoAsJson( $retValue );
    }   
?>

<!doctype html>
<html>
    <head>
        <title>SOMETHING</title>
    </head>

    <body>
        <div class="View">
            <table>
                <tr>
                    <th>First Name</th>
                    <th>Last Name</th>
                    <th>Phone Number</th>
                    <th>Email</th>
                </tr>
                <!-- PHP CODE TO FETCH DATA FROM ROWS -->
                <?php
                    // LOOP UNTIL END OF DATA
                    while ($rows=$result->fetch_assoc())
                    {
                ?>
                <tr>
                    <!-- FETCHING DATA FROM EACH ROW OF EVERY COLUMN -->
                    <td><?php echo $rows['FirstName'];?></td>
                    <td><?php echo $rows['LastName'];?></td>
                    <td><?php echo $rows['Phone'];?></td>
                    <td><?php echo $rows['Email'];?></td>
                </tr>
                <?php
                    }
                ?>
            </table>
        </div>
    </body>
</html>