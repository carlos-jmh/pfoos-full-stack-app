<?php
	$inData = getRequestInfo();

	$conn = new mysqli("localhost", "Carl", "APIGUY", "COP4331");
	if ($conn->connect_error) 
	{
		returnWithError( $conn->connect_error );
	} 
	else
	{
		$stmt = $conn->prepare("UPDATE Contacts SET FirstName=?, LastName=?, "
            . "Phone=?, Email=? WHERE ID=?;");
		$stmt->bind_param(
            "ssssi",
            $inData["firstName"],
            $inData["lastName"], 
            $inData["phone"],
            $inData["email"],
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