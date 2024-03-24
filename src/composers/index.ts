import commandAdd from './command:add';
import commandHelp from './command:help';
import commandMultiply from './command:multiply';
import onPhoto from './on:photo';
import use from './use';

const composers = [onPhoto, commandAdd, commandHelp, commandMultiply, use];

export default composers;
