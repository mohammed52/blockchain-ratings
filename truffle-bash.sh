echo "MAP - truffle script..."
echo "deleting build directory..."
rm -r build
echo "DONE!"
echo "deleting app/contracts"
rm -r app/contracts
echo "DONE!"
echo "Compile and Migrate contracts..."
truffle migrate --compile-all --reset --network ganache
echo "DONE!"
echo "Copying contracts to app..."
cp -r -f build/contracts app
echo "DONE!"
sleep 1