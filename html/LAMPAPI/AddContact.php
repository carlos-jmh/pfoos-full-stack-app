<?php
	$inData = getRequestInfo();

	$conn = new mysqli("localhost", "Carl", "APIGUY", "COP4331");
	if ($conn->connect_error) 
	{
		returnWithError( $conn->connect_error );
	} 
	else
	{
		$stmt = $conn->prepare("INSERT INTO Contacts "
            . "(FirstName,LastName,Phone,Email,UserID) VALUES(?,?,?,?,?)");
		$stmt->bind_param(
            "ssssi",
            $inData["firstName"],
            $inData["lastName"],
            $inData["phone"],
            $inData["email"],
            $inData["userId"]
        );
		$stmt->execute();
		$stmt->close();
		$conn->close();
		returnWithError("");
	}

	function getRequestInfo()
	{
		return json_decode(file_get_contents('php://input'), true);
	}

	function sendResultInfoAsJson( $obj )
	{
		header('Content-type: application/json');
		echo $obj;
	}
	
	function returnWithError( $err )
	{
		$retValue = '{"error":"' . $err . '"}';
		sendResultInfoAsJson( $retValue );
	}
	
?>