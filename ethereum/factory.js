import web3 from './web3';
import Factory from '../build/contracts/Factory.json';

const factoryInstance = new web3.eth.Contract(
    JSON.parse(JSON.stringify(Factory.abi)),
    '0xe959685A828A71865ed535a639EdA129F34eB1A5'
);

export default factoryInstance;