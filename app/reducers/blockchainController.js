let initialState = {
  web3: null,
  contracts: null,
  accounts: null
};

const blockchainController = (state = initialState, action) => {
  switch (action.type) {
    case "SET_WEB3": {
      let returnObj = {
        ...state,
        web3: action.payload
      };
      return returnObj;
    }
    case "SET_CONTRACTS": {
      return {
        ...state,
        contracts: action.payload
      };
    }
    case "SET_ACCOUNTS": {
      return {
        ...state,
        REPEAT_APPLY: action.payload
      };
    }
    case "SET_BLOCKCHAIN_CONTROLLER": {
      return action.payload;
    }

    default: {
      return state;
    }
  }
};

export default blockchainController;
