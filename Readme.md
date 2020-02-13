# Streamworks

### Send and recieve ethereum invoices and reconcile payments with the blockchain.
This app is a proof of concept for a system that lets contractors send invoices to a specified approver/manager account and managers fullfill those invoices.
Furthermore it lets both parties track and audit the transactions in real-time.

### This app uses DFuse library to reconcile invoice payment with blockchain data.
Dfuse is a set of APIs, Socket and GraphQL endpoints that lets you perform deep introspection of the blockchain and query transactions and accounts in real-time.

DFuse is used in the following specific scenarios on this app.

1. Reconcile the app state and invoice data with the Ethereum blockchain data in real-time thus providing a user with a unified view of the app-state and the blockchain state.
This is achieved through DFuse search GraphQL endpoints which is used to query "to: {address}" and "from: {address}" to track transactions originating from and to a given wallet address.

2. Allow user to track invoice payments made and recieved in real-time through a progress-bar style transaction life-cycle view. This is done through a custom component that 
 wraps over the transaction lifecycle subsription.


### Demo website can be found [here](http://streamworks-ethereum.s3-website-us-west-2.amazonaws.com/)

You need to have Metamask installed on your browser in order to run the demo. Metamask can be obtained [here](https://metamask.io/)

Switch metamask to Ropsten testnet from Ethereum mainnet.

Now open two different browser windows to simulate the contractor/manager interaction and login via different metamask accounts.

One window will simulate a contractor user which will be used to create invoices.

The other will simulate a manager user which will fullfill the invoices. Note that you need some testnet ether to fullfill the invoices. You can obtain some [here](https://faucet.ropsten.be/).

Once the contractor user creates an invoice it will appear on the manager users 'manager' tab. They can pay the invoice by clicking on the pay button which will open a Metamask popup. 

Once the invoice has been paid both the contractor and the manager can track the transaction in real-time using the transaction progress-bar that will appear on the top of both users' windows.

Both types of users can audit the invoices sent and payments made in real time by navigating to the tabs belonging to the respective roles.


## Screenshots

![Create and list invoices](https://github.com/KashmereLabs/Streamworks/blob/master/screenshots/create_list_sent_invoices.png "Create and list invoices")

![Create and list invoices](https://github.com/KashmereLabs/Streamworks/blob/master/screenshots/pending_txn_lifecycle.png "Create and list invoices")

![Create and list invoices](https://github.com/KashmereLabs/Streamworks/blob/master/screenshots/manager_view_pay_invoice.png "Create and list invoices")

![Create and list invoices](https://github.com/KashmereLabs/Streamworks/blob/master/screenshots/create_new_invoice.png "Create and list invoices")


## Running the demo
The uses Metamask web3 authentication.

It should technically work with any web3 provider but has only been tested with Metamask.

You need to have some Ropsten Ether to test the app. You can obtain some for your app [here](https://faucet.ropsten.be/).
One of them will act as a Manager and the other Contractor.

## Installation
This repo consists of two projects

The client app is a React app.
You need a DFuse API Key

Set the environment varaibles
```
REACT_APP_API_SERVER= // Gateway server API
REACT_APP_ETHQ_ENDPOINT= // https://ropsten.ethq.app or https://ethq.app depending on your environment
REACT_APP_DFUSE_API_KEY= // Dfuse API key
REACT_APP_DFUSE_NETWORK= // ropsten.eth.dfuse.io or mainnet.eth.dfuse.io depending on your environment
```



```
sudo npm install
npm start
```


To gateway is an Express/NodeJS app.
```
sudo npm install
npm start
```

The gateway requires MongoDB installed.
To install MongoDB on Ubuntu follow the steps [here](https://docs.mongodb.com/manual/tutorial/install-mongodb-on-ubuntu/)


