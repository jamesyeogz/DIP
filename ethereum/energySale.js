import web3 from './web3';
import EnergySale from '../build/contracts/EnergySale.json';

const energySaleInstance = (address) => {
    return new web3.eth.Contract(
        JSON.parse(JSON.stringify(EnergySale.abi)),
        address
    );
};

export default energySaleInstance;
