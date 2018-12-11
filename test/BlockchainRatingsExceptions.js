const BlockchainRatings = artifacts.require("./BlockchainRatings.sol");

contract("BlockchainRatings FeedbackSubmissionExceptions", accounts => {
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

	it("error on incorrect feedback submission", async () => {
		const blockchainRatingsInstance = await BlockchainRatings.deployed();

		// create second feedbackRequest
		const receipt1 = await blockchainRatingsInstance.createFeedbackRequest(
			testClientAddress,
			testProjectName,
			testProjectDescription,
			{ from: testVendorAddress }
		);

		// test caller address matches client address in the request
		try {
			await blockchainRatingsInstance.submitFeedback(
				1,
				testRating1,
				testFeedback,
				{ from: testClient2Address }
			);
			assert(
				false,
				"error - should have thrown error when in correct client"
			);
		} catch (error) {
			assert(
				error.message.indexOf("revert") >= 10,
				"error - revert should be part of error when incorrect client"
			);
		}

		// test incorrect request id
		try {
			await blockchainRatingsInstance.submitFeedback(
				2,
				testRating1,
				testFeedback,
				{ from: testClientAddress }
			);
			assert(
				false,
				"error - should have thrown error on incorrect requestId"
			);
		} catch (error) {
			assert(
				error.message.indexOf("revert") >= 0,
				"error - revert should be part of error when incorrect requestId"
			);
		}

		try {
			await blockchainRatingsInstance.submitFeedback(
				1,
				testIncorrectRating1,
				testFeedback,
				{ from: testClientAddress }
			);
			assert(
				false,
				"should have thrown error when ratings > 100 or rating < 0"
			);
		} catch (error) {
			assert(
				error.message.indexOf("revert") >= 0,
				"error -  should have thrown revert on incorrect ratings > 100"
			);
		}

		try {
			await blockchainRatingsInstance.submitFeedback(
				1,
				testIncorrectRating1,
				testFeedback,
				{ from: testClientAddress }
			);
			assert(
				false,
				"error - should have thrown error when ratings > 100 or rating < 0"
			);
		} catch (error) {
			assert(
				error.message.indexOf("revert") >= 0,
				"error - should have thrown revert on incorrect ratings < 0"
			);
		}

		try {
			await blockchainRatingsInstance.submitFeedback(
				1,
				testRating1,
				testIncorrectFeedback,
				{ from: testClientAddress }
			);
			assert(
				false,
				"error - should have thrown error when feedback length > 160"
			);
		} catch (error) {
			assert(
				error.message.indexOf("revert") >= 0,
				"error - should have thrown revert on incorrect feedback length > 160"
			);
		}

		// 1st feedback feedback for repeat test, should prevent next feedback
		await blockchainRatingsInstance.submitFeedback(
			1,
			testRating1,
			testFeedback,
			{ from: testClientAddress }
		);

		try {
			await blockchainRatingsInstance.submitFeedback(
				1,
				testRating1,
				testFeedback,
				{ from: testClientAddress }
			);
			console.log(
				"error - should have thrown error on submitting feedback previously submitted"
			);
		} catch (error) {
			assert(
				error.message.indexOf("revert") >= 0,
				"error - should have thrown revert on previously submitted feedbackRequest"
			);
		}
	});
});
