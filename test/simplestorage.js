const SimpleStorage = artifacts.require("./SimpleStorage.sol");

contract("SimpleStorage", accounts => {
	it("...should store the value 90.", async () => {
		const simpleStorageInstance = await SimpleStorage.deployed();

		// Set value of 90
		await simpleStorageInstance.set(90, { from: accounts[0] });

		// Get stored value
		const storedData = await simpleStorageInstance.get.call();

		assert.equal(storedData, 90, "The value 90 was not stored.");
	});

	var testVendorAddress = accounts[0];
	var testClientAddress = accounts[1];
	var testProjectName = "testProjectName";
	var testProjectDescription = "testProjectDescription";

	// it should create a new create a new request for project feed back from an address
	it("should create a new feedback request", async () => {
		const simpleStorageInstance = await SimpleStorage.deployed();

		const receipt = await simpleStorageInstance.createFeedbackRequest(
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
		const feedbackRequestsCounter = await simpleStorageInstance.feedbackRequestsCounter();

		assert.equal(
			feedbackRequestsCounter,
			1,
			"feedbackRequestsCounter should be 1"
		);

		// verify the feedbackRequests mapping has the correct feedbackRequest stored
		const feedbackrequest = await simpleStorageInstance.feedbackRequests(1);
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
});
