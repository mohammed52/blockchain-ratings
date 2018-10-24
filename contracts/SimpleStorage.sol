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

	// create a new request for feedback
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

	// submit a feedback for a specific request
	function submitFeedback(uint _feedbackRequestId, string _rating, string _feedback){
		// verify you are authorised to give feedback for this specific requestId
		
		// verify feedback not already given
		// give feeedback
		// emit log event
	}
}