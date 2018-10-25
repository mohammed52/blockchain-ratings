pragma solidity ^0.4.24;

contract SimpleStorage {
	uint storedData;

	// FeedbackRequest data types ...
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
	// -----------------------------------------------------------------------

	// FeedbackSubmission data types
	struct FeedbackSubmission {
		uint id;
		uint requestId;
		uint rating;
		string feedback;
	}

	mapping (uint => FeedbackSubmission) public feedbackSubmissions;

	uint public feedbackSubmissionCounter;
	// -----------------------------------------------------------------------

	// events
	event LogRequestFeedback(
		uint indexed _id,
		address indexed _vendorAddress,
		address indexed _clientAddress,
		string projectName,
		string projectDescription
		);

	event LogFeedbackSubmission(
		uint indexed _id,
		uint indexed _feedbackRequestId,
		uint rating, // out of 100
		string feedback
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
	function submitFeedback(uint _feedbackRequestId, uint _rating, string _feedback) public {

		// verify _feedbackRequestId should exist
		require(_feedbackRequestId <= feedbackRequestsCounter);

		// verify rating between 0 and 100 inclusive
		require(_rating >=0 && _rating <=100);

		// verify feedback is 1 sms length or less i.e 160 characters
		bytes memory strBytes = bytes(_feedback);
		require(strBytes.length <= 160);


		// verify you are authorised to give feedback for this specific requestId
		require(msg.sender == feedbackRequests[_feedbackRequestId].clientAddress);

		// verify feedback not already given
		// require (feedbackRequests[_feedbackRequestId].pending == true);

		// update request feedbackRequestsCounter
		// feedbackSubmissionCounter++;


		emit LogFeedbackSubmission(feedbackSubmissionCounter, _feedbackRequestId, _rating, _feedback);

		// give feeedback
		// emit log event

	}
}