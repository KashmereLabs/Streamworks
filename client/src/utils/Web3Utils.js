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

  makePaymentTransaction: function(transaction) {
    const web3 = window.web3;
    const amountString = web3.utils.toWei(transaction.amount.toString());

    const params = {
      from: transaction.recipient_address,
      to: transaction.sender_address,
      value: amountString,
    };

    return new Promise((resolve, reject) => {
      web3.eth.sendTransaction(params, function(err, response) {
        if (err) {
          reject(err);
        }
        resolve(response);
      })
    });

  },

  getAccountDetails: function() {
    const web3 = window.web3;

    //  let accountBalance = web3.utils.fromWei(web3.eth.getBalance(web3.eth.coinbase));
    // let balance = web3.eth.getBalance(web3.eth.coinbase);
    //console.log(balance);
    return { address: '', balance: '' };
  },
  web3Authenticate: function() {
    console.log("HERE")
  }
}
