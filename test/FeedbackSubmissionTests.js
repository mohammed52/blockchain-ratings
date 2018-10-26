const SimpleStorage = artifacts.require("./SimpleStorage.sol");

contract("FeedbackSubmissionTests", accounts => {
	var testVendorAddress = accounts[0]; // asks for feedback
	var testClientAddress = accounts[1]; // gives feedback
	var testClient2Address = accounts[2]; // asks for feedback
	var testProjectName = "testProjectName";
	var testProjectDescription = "testProjectDescription";

	const testRating1 = 85;
	const testIncorrectRating1 = 110;
	const testIncorrectRating2 = -20;
	const testFeedback = "Great Job, well done !";
	const testIncorrectFeedback =
		"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat";

	it("should submit feedback", async () => {
		const simpleStorageInstance = await SimpleStorage.deployed();

		// create first feedbackRequest
		await simpleStorageInstance.createFeedbackRequest(
			testClientAddress,
			testProjectName,
			testProjectDescription,
			{ from: testVendorAddress }
		);

		// give feedback
		const receipt = await simpleStorageInstance.submitFeedback(
			1,
			testRating1,
			testFeedback,
			{ from: testClientAddress }
		);
		assert.equal(
			receipt.logs.length,
			1,
			"one event should have been triggered"
		);
		assert.equal(
			receipt.logs[0].event,
			"LogFeedbackSubmission",
			"event should be LogFeedbackSubmission"
		);
		assert.equal(receipt.logs[0].args._id.toNumber(), 1, "id must be 1");
		assert.equal(
			receipt.logs[0].args._feedbackRequestId,
			1,
			"feedbackRequestId must be 1"
		);
		assert.equal(
			receipt.logs[0].args.rating.toNumber(),
			testRating1,
			"_rating must be " + testRating1
		);
		assert.equal(
			receipt.logs[0].args.feedback,
			testFeedback,
			"_feedback must be " + testFeedback
		);

		// verify feedbackRequestsCounter has correct value in the contract
		const feedbackSubmissionsCounter = await simpleStorageInstance.feedbackSubmissionsCounter();

		assert.equal(
			feedbackSubmissionsCounter.toNumber(),
			1,
			"feedbackSubmissionsCounter must be 1"
		);
		const feedbackSubmission = await simpleStorageInstance.feedbackSubmissions(
			1
		);
		assert.equal(
			feedbackSubmission[0],
			1,
			"feedbackSubmission id should be 1"
		);
		assert.equal(
			feedbackSubmission[1],
			1,
			"feedbackSubmission _feedbackRequestId should be 1"
		);
		assert.equal(
			feedbackSubmission[2].toNumber(),
			testRating1,
			"feedbackSubmission ratings should be +" + testRating1
		);

		assert.equal(
			feedbackSubmission[3],
			testFeedback,
			"feedbackSubmission ratings should be " + testFeedback
		);
	});
});
