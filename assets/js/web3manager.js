const web3 = new Web3(Web3.givenProvider);

function cazzo() {
    const ethEnabled = () => {
        if (window.web3) {
            window.web3 = new Web3(window.web3.currentProvider);
            window.ethereum.enable();
            return true;
        }
        return false;
        }
}