import web3 from './web3';
import Factory from '../build/contracts/Factory.json';

const factoryInstance = new web3.eth.Contract(
    JSON.parse(JSON.stringify(Factory.abi)),
    '0x29284eDf9C791E20f62Bb2685eD0be782c9a9c64'
);

export default factoryInstance;