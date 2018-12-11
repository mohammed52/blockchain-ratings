import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import classNames from "classnames/bind";
import { browserHistory } from "react-router";
import styles from "../css/components/homeStyles";
// import ymtm from "../images/ymtm.png";
// import { DEFAULT_SETTINGS } from "./helpers/defaultSettings";
// import {
//   setAmount,
//   setSourceOfIncome,
//   setPurpose,
//   setRepeatApply
// } from "../actions/selectedOptionsActions";
// import OptionsFormComponent from '../components/OptionsFormComponent'

var ReactBootstrap = require("react-bootstrap");
var Button = ReactBootstrap.Button;
var Modal = ReactBootstrap.Modal;
var FormGroup = ReactBootstrap.FormGroup;
var ControlLabel = ReactBootstrap.ControlLabel;
var FormControl = ReactBootstrap.FormControl;
var Radio = ReactBootstrap.Radio;
var Table = ReactBootstrap.Table;
var FieldGroup = ReactBootstrap.FieldGroup;
var Input = ReactBootstrap.Input;
var Checkbox = ReactBootstrap.Checkbox;

class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      defaultClientAddress: "",
      defaultProjectTitle: "",
      defaultProjectDetails: ""
    };

    this.handlePurposeOptionChange = this.handlePurposeOptionChange.bind(this);
    this.handleincomeSourceOptionChange = this.handleincomeSourceOptionChange.bind(
      this
    );
    this.handlerepeatApplyOptionsChange = this.handlerepeatApplyOptionsChange.bind(
      this
    );
    this.btnClickGetDocList = this.btnClickGetDocList.bind(this);
    this.onAmountChange = this.onAmountChange.bind(this);
    // console.log("this.props.location.state.applicationDetails", this.props.location.state.applicationDetails);

    // this.state = {
    //   PURPOSE: DEFAULT_SETTINGS.PURPOSE.TAG_EXISTING_BUSINESS,
    //   SOURCE_OF_INCOME: DEFAULT_SETTINGS.SOURCE_OF_INCOME.TAG_BUSINESS_SOLE_PROP,
    //   AMOUNT: DEFAULT_SETTINGS.AMOUNT,
    //   REPEAT_APPLY: DEFAULT_SETTINGS.REPEAT_APPLY.TAG_FIRST_TIME_APPLY
    // }
  }

  componentDidMount() {
    console.log("HomeContainer componentDidMount");
  }

  componentDidUpdate() {
    console.log("HomeContainer componentDidUpdate");
  }

  handlePurposeOptionChange(changeEvent) {
    const { setPurpose } = this.props;
    setPurpose(changeEvent.target.value);
    // this.setState({
    //   PURPOSE: changeEvent.target.value
    // });
  }

  handleincomeSourceOptionChange(changeEvent) {
    const { setSourceOfIncome } = this.props;
    setSourceOfIncome(changeEvent.target.value);

    // this.setState({
    //   SOURCE_OF_INCOME: changeEvent.target.value
    // })
  }
  handlerepeatApplyOptionsChange(changeEvent) {
    const { setRepeatApply } = this.props;
    setRepeatApply(changeEvent.target.value);

    // this.setState({
    //   REPEAT_APPLY: changeEvent.target.value
    // })
  }

  btnClickGetDocList() {
    // console.log("btnClickGetDocList");
    // const applicationDetails = {
    //   PURPOSE: this.state.PURPOSE,
    //   AMOUNT: this.state.AMOUNT,
    //   SOURCE_OF_INCOME: this.state.SOURCE_OF_INCOME,
    //   REPEAT_APPLY: this.state.REPEAT_APPLY
    // }
    // console.log("applicationDetails", applicationDetails);
    browserHistory.push({
      pathname: "/showdocs"
    });
  }

  onAmountChange(event) {
    const { setAmount } = this.props;
    setAmount(event.target.value);
  }

  render() {
    return (
      <div className={[styles.homeWrapper].join(" ")}>
        Home Page
        <div className="well">
          <strong>Enter Client Address:</strong>
          <br />
          <input
            onChange={this.onChangeClientAddress}
            defaultValue={this.state.defaultClientAddress}
            required
            ref={""}
          />
          <br />
          <strong>Enter Project Title:</strong>
          <br />
          <input
            onChange={this.onChangeProjectTitle}
            defaultValue={this.state.defaultProjectTitle}
            required
            ref={""}
          />
          <br />
          <strong>Enter Project Details:</strong>
          <br />
          <input
            onChange={this.onChangeProjectDetails}
            defaultValue={this.state.defaultProjectDetails}
            required
            ref={""}
          />
          <br />
        </div>
      </div>
    );
  }
}

Home.propTypes = {
  // selectedOptions: PropTypes.object.isRequired
  // topics: PropTypes.array.isRequired,
  // typing: PropTypes.func.isRequired,
  // createTopic: PropTypes.func.isRequired,
  // destroyTopic: PropTypes.func.isRequired,
  // incrementCount: PropTypes.func.isRequired,
  // decrementCount: PropTypes.func.isRequired,
  // newTopic: PropTypes.string
};

function mapStateToProps(state) {
  return {
    // selectedOptions: state.selectedOptions
    // newTopic: state.topic.newTopic
  };
}

// Read more about where to place `connect` here:
// https://github.com/rackt/react-redux/issues/75#issuecomment-135436563
export default connect(
  mapStateToProps,
  {
    // setPurpose,
    // setSourceOfIncome,
    // setAmount,
    // setRepeatApply
  }
)(Home);
