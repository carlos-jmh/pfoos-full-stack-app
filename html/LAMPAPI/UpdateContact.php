<?php
	$inData = getRequestInfo();

	$conn = new mysqli("localhost", "Test", "123", "COP4331");
	if ($conn->connect_error) 
	{
		returnWithError( $conn->connect_error );
	} 
	else
	{
		$stmt = $conn->prepare("UPDATE Contacts SET FirstName=?, LastName=?, "
            . "Phone=?, Email=?, UserID=? WHERE ID=?;");
		$stmt->bind_param(
            "ssssii",
            $inData["firstName"],
            $inData["lastName"], 
            $inData["phone"],
            $inData["email"],
            $inData["userId"],
            $inData["id"]
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