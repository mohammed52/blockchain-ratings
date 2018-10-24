pragma solidity ^0.4.24;

contract SimpleStorage {
	uint storedData;

	struct FeedbackRequest {
		uint id;
		address vendorAddress;
		address clientAddress;
		string projectName;
		string projectDescription;
		bool pending;
	}

	mapping (uint => FeedbackRequest) public feedbackRequests;

	uint public feedbackRequestsCounter;

	event LogRequestFeedback(
		uint indexed _id,
		address indexed _vendorAddress,
		address indexed _clientAddress,
		string projectName,
		string projectDescription
		);

	function set(uint x) public {
		storedData = x;
	}

	function get() public view returns (uint) {
		return storedData;
		
	}

	function createFeedbackRequest(address _clientAddress, string _projectName, string _projectDescription) public {

		feedbackRequestsCounter++;

		feedbackRequests[feedbackRequestsCounter] = FeedbackRequest(
			feedbackRequestsCounter,
			msg.sender,
			_clientAddress,
			_projectName,
			_projectDescription,
			true
			);

		emit LogRequestFeedback(feedbackRequestsCounter, msg.sender, _clientAddress, _projectName, _projectDescription);
	}
}