# GoGoPool Call Examples

This repo is for some examples on how to interface with the GoGoPool smart contracts.

## Adding to a Project

The heart of this project is the [ `hooks` ](https://github.com/chand1012/gogopool-call-examples/tree/main/hooks) directory. This directory contains all the functional code needed to call the smart contracts using EthersJS.

To use these contracts on your local project, you'll want to copy the `hooks` , `contracts` , and `constants` directories to the base source directory of your project.

## Calling 

Call examples can also be found at the top of [ `index.tsx` ](https://github.com/chand1012/gogopool-call-examples/blob/main/pages/index.tsx).

### useWallet

This hook gives access to the local browser wallet (for now only MetaMask is supported). There are seven returned objects that can be accessed like so:

```javascript
// calling at the start of a component or page
const {
    account,
    activate,
    deactivate,
    provider,
    chainId,
    chainName,
    error
} = useWallet();
```

* `account` - string of the user's address.
* `activate` - async void function with no parameters that attempts to activate the browser wallet. Check `error` for errors on activation.
* `deactivate` - async void function with no parameters that deactivates the browser wallet if active. Otherwise does nothing.
* `provider` - if `activate` is successful, the EthersJS provider.
* `chainId` - chain ID of the currently selected network. Should be `43113` for Avalanche fuji testnet and `43114` for Avalanche mainnet.
* `chainName` - chain name of the currently selected network. Does not work on Avalanche network.
* `error` - the returned error as a string.

### useBalance(address: string)

Gives the balance of the specified account as an EthersJS `BigNumber` . You can use the EthersJS util `formatEther` to properly display the number.

```javascript
const account = '0xACe0C428377F7C501f0D752F112C848E469ce847';
const balance = useBalance(account)
```

### useExchangeRate(provider)

This hook gives the exchange rate of AVAX to ggAVAX as an EthersJS `BigNumber` . You can use the EthersJS util `formatEther` to properly display the number.

```javascript
const exchangeRate = useExchangeRate(provider)
```

### useDeposit(provider)

Allows access to the `send` function, used for depositing AVAX to the GGP network for liquid staking, as well as its returned response, error, and if it was a successful deposit or not.

[ `useWallet` ](#useWallet) should be called before this, and the returned provider should be passed into `useDeposit` .

```javascript
// calling at the start of a component or page
const {
    send,
    // renamed for clarity.
    error: depositError,
    response: depositResponse,
    success: depositSuccess,
} = useDeposit(provider);
```

* `send` - async void function. Takes the amount of AVAX to send as a `number` in AVAX units.
* `error` - if the deposit fails, the error as a string.
* `response` - the returned response of the function call.
* `success` - boolean. If the call was successful, returns `true`.

### useCreateMinipool(provider)

This hook gives access to the `approve` and `createMinipool` functions. The `approve` function approves the GGP Bond token for withdrawal from the user's account when calling `createMinipool` . The `createMinipool` function begins minipool creation process on the backend for node operators.

[ `useWallet` ](#useWallet) should be called before this, and the returned provider should be passed into `useCreateMinipool` .

```javascript
// calling at the start of a component or page
const {
    createMinipool,
    approve,
    // renamed for Clarity
    error: minipoolError,
    response: minipoolResponse,
    success: minipoolSuccess,
    approveResponse: minipoolApproveResponse,
} = useCreateMinipool(provider);
```

* `createMinipool` - async void function. Takes the nodeID as a string, and the duration, delegation fee, the node operator GGP Bond amount, and the AVAX node operator deposit amount as EtherJS [`BigNumber`](https://docs.ethers.io/v5/api/utils/bignumber/) as parameters. Starts the process of creating a GGP Node.
* `approve` - async void function. Takes the node operator GGP Bond amount as an EthersJS BigNumber as a parameter. Approves the `createMinipool` function to withdraw the specified number of GGP Bond tokens from the user's account.
* `error` - if the minipool creation call fails, the error as a string.
* `response` - the returned response of the function call.
* `success` - If the call was successful, returns `true`. Boolean. 
* `approveResponse` - the response of the `approve` function call. String.
