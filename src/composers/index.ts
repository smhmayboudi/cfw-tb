import commandAdd from './command:add';
import {help as helpAdd} from './command:add';
import commandDecor from './command:decor';
import {help as helpDecor} from './command:decor';
import commandHelp from './command:help';
import commandMultiply from './command:multiply';
import {help as helpMultiply} from './command:multiply';
import onPhoto from './on:photo';
import use from './use';

const composers = [onPhoto, commandAdd, commandDecor, commandHelp, commandMultiply, use];

const helps = [helpAdd, helpDecor, helpMultiply];

export default composers;
export {helps};
