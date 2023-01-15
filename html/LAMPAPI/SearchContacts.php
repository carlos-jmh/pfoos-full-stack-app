<?php

	$inData = getRequestInfo();
	
	$searchResults = "";
	$searchCount = 0;

	$conn = new mysqli("localhost", "Carl", "APIGUY", "COP4331");
	if ($conn->connect_error) 
	{
		returnWithError( $conn->connect_error );
	} 
	else
	{
		$stmt = $conn->prepare("SELECT ID,FirstName,LastName,Phone,Email " . 
            "from Contacts WHERE (FirstName LIKE ? OR LastName LIKE ? OR Phone " . 
            "LIKE ? OR Email LIKE ?) AND UserID=?");
		$search = "%" . $inData["search"] . "%";
		$stmt->bind_param(
            "ssssi",
            $search,
            $search,
            $search,
            $search,
            $inData["userId"]
        );
		$stmt->execute();
		
		$result = $stmt->get_result();
		
		while($row = $result->fetch_assoc())
		{
			if( $searchCount > 0 )
			{
				$searchResults .= ",";
			}
			$searchCount++;
            $searchResult = array(
                'id' => $row["ID"],
                'firstName' => $row["FirstName"],
                'lastName' => $row["LastName"],
                'phone' => $row["Phone"],
                'email' => $row["Email"]
            );
			$searchResults .= json_encode($searchResult);
		}
		
		if( $searchCount == 0 )
		{
			returnWithError( "No Records Found" );
		}
		else
		{
			returnWithInfo( $searchResults );
		}
		
		$stmt->close();
		$conn->close();
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
		$retValue = '{"results":[],"error":"' . $err . '"}';
		sendResultInfoAsJson( $retValue );
	}
	
	function returnWithInfo( $searchResults )
	{
		$retValue = '{"results":[' . $searchResults . '],"error":""}';
		sendResultInfoAsJson( $retValue );
	}
	
?>