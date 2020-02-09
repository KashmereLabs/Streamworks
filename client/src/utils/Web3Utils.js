const Web3 = require('web3');

module.exports = {
  getWeb3Authentication: function() {
    const web3 = window.web3;
    window.addEventListener('load', async() => {
      // Modern dapp browsers...
      if (window.ethereum) {
        window.web3 = new Web3(window.ethereum);
        try {
          // Request account access if needed
          await window.ethereum.enable();

        }
        catch (error) {
          // User denied account access...
        }
      }
      // Legacy dapp browsers...
      else if (window.web3) {
        window.web3 = new Web3(web3.currentProvider);
      }

      else {


      }
    });
  },

  web3Authenticate: function() {
    console.log("HERE")
  }
}
