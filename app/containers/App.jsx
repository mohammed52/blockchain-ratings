import React, { Component } from "react";
import PropTypes from "prop-types";
import classNames from "classnames/bind";
import truffleContract from "truffle-contract";
// import Navigation from '../containers/Navigation';
// import Message from '../containers/Message';
import styles from "../css/main";
import bratingsLogo from "../images/bratingsLogo.jpg";
import favicon from "../images/favicon.png";
// import MEK from '../images/MEK.png';
import SimpleStorageContract from "../contracts/SimpleStorage.json";
import getWeb3 from "../utils/getWeb3";

var ReactBootstrap = require("react-bootstrap");
var Navbar = ReactBootstrap.Navbar;
var NavItem = ReactBootstrap.NavItem;
var NavDropdown = ReactBootstrap.NavDropdown;
var Nav = ReactBootstrap.Nav;
var MenuItem = ReactBootstrap.MenuItem;

// using SendGrid's v3 Node.js Library

// const cx = classNames.bind(styles);

/*
 * React-router's <Router> component renders <Route>'s
 * and replaces `this.props.children` with the proper React Component.
 *
 * Please refer to `routes.jsx` for the route config.
 *
 * A better explanation of react-router is available here:
 * https://github.com/rackt/react-router/blob/latest/docs/Introduction.md
 */
// const App = ({children}) => {
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cssHasLoaded: false,
      storageValue: 0,
      web3: null,
      accounts: null,
      contract: null
    };
    this.handleLoad = this.handleLoad.bind(this);
    this.runExample = this.runExample.bind(this);
    this.btnFetchValue = this.btnFetchValue.bind(this);
  }

  componentDidMount = async () => {
    console.log("AppContainer componentDidMount");

    window.addEventListener("load", this.handleLoad);
    try {
      // Get network provider and web3 instance.
      const web3 = await getWeb3();

      // Use web3 to get the user's accounts.
      const accounts = await web3.eth.getAccounts();

      // Get the contract instance.
      const Contract = truffleContract(SimpleStorageContract);
      Contract.setProvider(web3.currentProvider);
      const instance = await Contract.deployed();

      // Set web3, accounts, and contract to the state, and then proceed with an
      // example of interacting with the contract's methods.
      this.setState({ web3, accounts, contract: instance }, this.runExample);
    } catch (error) {
      // Catch any errors for any of the above operations.
      alert(
        "Failed to load web3, accounts, or contract. Check console for details."
      );
      console.log(error);
    }
  };

  runExample = async () => {
    const { accounts, contract } = this.state;

    // Stores a given value, 5 by default.
    await contract.set(5, { from: accounts[0] });

    // Get the value from the contract to prove it worked.
    const response = await contract.get();

    // Update state with the result.
    this.setState({ storageValue: response.toNumber() });
  };

  async btnFetchValue() {
    console.log("fetchValue");
    const { accounts, contract } = this.state;
    const response = await contract.get();
    // Update state with the result.
    this.setState({ storageValue: response.toNumber() });
  }

  handleLoad() {
    console.log("handleLoad"); //  $ is available here
    this.setState({
      cssHasLoaded: true
    });
  }

  componentDidUpdate() {
    console.log("AppContainer componentDidUpdate");
    const ss = document.styleSheets;
    console.log("ss.length", ss.length);
  }

  render() {
    if (!this.state.web3) {
      return <div>Loading Web3, accounts, and contract...</div>;
    }
    return (
      <div>
        {!this.state.cssHasLoaded ? (
          <div />
        ) : (
          <div className={styles.mainWrapper}>
            <div className={styles.headerWrapper2}>
              <div className={styles.headerWrapper}>
                <img
                  src={bratingsLogo}
                  width="90"
                  height="90"
                  className="img-fluid"
                />
                <strong>Helpline: 0313-7590210</strong>
              </div>
            </div>
            {this.props.children}
          </div>
        )}

        <div className="App">
          <h1>Good to Go!</h1>
          <p>Your Truffle Box is installed and ready.</p>
          <h2>Smart Contract Example</h2>
          <p>
            If your contracts compiled and migrated successfully, below will
            show a stored value of 5 (by default).
          </p>
          <p>
            Try changing the value stored on <strong>line 37</strong> of App.js.
          </p>
          <div>The stored value is: {this.state.storageValue}</div>

          <button
            className="btn btn-primary"
            type="button"
            onClick={this.btnFetchValue}
          >
            Fetch Value
          </button>
        </div>
      </div>
    );
  }
}

App.propTypes = {
  children: PropTypes.object
};

export default App;
