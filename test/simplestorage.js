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
});
