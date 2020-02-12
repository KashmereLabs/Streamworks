# Streamworks

## Send and recieve ethereum invoices and reconcile payments with the blockchain.

## This app uses DFuse library to reconcile invoice payment with blockchain data.

### Demo website can be found [here](http://streamworks-ethereum.s3-website-us-west-2.amazonaws.com/)


## Screenshots

![Create and list invoices](https://github.com/KashmereLabs/Streamworks/blob/master/screenshots/create_list_sent_invoices.png "Create and list invoices")

## Running the demo
The uses Metamask web3 authentication.

It should technically work with any web3 provider but has only been tested with Metamask.

Open the app in two different browser windows both of which need to have Metamask installed.

Login to the app via Metamask using two different wallet addresses.

You need to have some Ropsten Ether to test the app. You can obtain some for your app [here](https://faucet.ropsten.be/).
One of them will act as a Manager and the other Contractor.




## Installation
This repo consists of two projects

The client app is a React app.

Set the environment varaibles

You need a DFuse API Key


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


