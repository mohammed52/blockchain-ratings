const BlockchainRatings = artifacts.require("./BlockchainRatings.sol");

contract("BlockchainRatings FeedbackRequestsTests", accounts => {
	it("...should store the value 90.", async () => {
		const blockchainRatingsInstance = await BlockchainRatings.deployed();

		// Set value of 90
		await blockchainRatingsInstance.set(90, { from: accounts[0] });

		// Get stored value
		const storedData = await blockchainRatingsInstance.get.call();

		assert.equal(storedData, 90, "The value 90 was not stored.");
	});

	var testVendorAddress = accounts[0]; // asks for feedback
	var testClientAddress = accounts[1]; // gives feedback
	var testClient2Address = accounts[2]; // asks for feedback
	var testProjectName = "testProjectName";
	var testProjectDescription = "testProjectDescription";

	// it should create a new create a new request for project feed back from an address
	it("should create a new feedback request", async () => {
		const blockchainRatingsInstance = await BlockchainRatings.deployed();

		const receipt = await blockchainRatingsInstance.createFeedbackRequest(
			testClientAddress,
			testProjectName,
			testProjectDescription
		);

		assert.equal(
			receipt.logs.length,
			1,
			"one event should have been triggered"
		);
		assert.equal(
			receipt.logs[0].event,
			"LogRequestFeedback",
			"event should be LogRequestFeedback"
		);
		assert.equal(receipt.logs[0].args._id.toNumber(), 1, "id must be 1");
		assert.equal(
			receipt.logs[0].args._vendorAddress,
			testVendorAddress,
			"vendor must be " + testVendorAddress
		);
		assert.equal(
			receipt.logs[0].args._clientAddress,
			testClientAddress,
			"client must be " + testClientAddress
		);
		assert.equal(
			receipt.logs[0].args.projectName,
			testProjectName,
			"project name should be " + testProjectName
		);
		assert.equal(
			receipt.logs[0].args.projectDescription,
			testProjectDescription,
			"project description should be " + testProjectDescription
		);

		// verify feedbackRequestsCounter has correct value in the contract
		const feedbackRequestsCounter = await blockchainRatingsInstance.feedbackRequestsCounter();

		assert.equal(
			feedbackRequestsCounter,
			1,
			"feedbackRequestsCounter should be 1"
		);

		// verify the feedbackRequests mapping has the correct feedbackRequest stored
		const feedbackrequest = await blockchainRatingsInstance.feedbackRequests(
			1
		);
		assert.equal(feedbackrequest[0], 1, "feedbackRequest id should be 1");
		assert.equal(
			feedbackrequest[1],
			testVendorAddress,
			"vendorAddress should be " + testVendorAddress
		);
		assert.equal(
			feedbackrequest[2],
			testClientAddress,
			"clientAddress should be " + testClientAddress
		);
		assert.equal(
			feedbackrequest[3],
			testProjectName,
			"projectName should be " + testProjectName
		);
		assert.equal(
			feedbackrequest[4],
			testProjectDescription,
			"projectDescription should be " + testProjectDescription
		);
		assert.equal(feedbackrequest[5], true, "pending should be false");

		// new request should be in the feedbackRequests map
	});

	const testRating1 = 85;
	const testIncorrectRating1 = 110;
	const testIncorrectRating2 = -20;
	const testFeedback = "Great Job, well done !";
	const testIncorrectFeedback =
		"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat";

	// test user can give feedback
	it("should allow user to give feedback", async () => {
		const blockchainRatingsInstance = await BlockchainRatings.deployed();

		// call submitFeedback from client address
		const receipt = await blockchainRatingsInstance.submitFeedback(
			1,
			testRating1,
			testFeedback,
			{ from: testClientAddress }
		);
		// test 1 event should be triggered
		assert.equal(
			receipt.logs.length,
			1,
			"one event should have been triggered"
		);

		// test event should be LogFeedbackSubmission
		assert.equal(
			receipt.logs[0].event,
			"LogFeedbackSubmission",
			"event should be LogFeedbackSubmission"
		);

		assert.equal(
			receipt.logs[0].args.rating,
			testRating1,
			"rating should be " + testRating1
		);
		assert.equal(
			receipt.logs[0].args.feedback,
			testFeedback,
			"feedback should be " + testFeedback
		);
	});
});
