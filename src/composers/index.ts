import commandAdd from './command:add';
import commandDecor from './command:decor';
import commandHelp from './command:help';
import commandMultiply from './command:multiply';
import commandSettings from './command:settings';
import commandStart from './command:start';
import use from './use';
import {help as helpAdd} from './command:add';
import {help as helpDecor} from './command:decor';
import {help as helpMultiply} from './command:multiply';

const composers = [commandAdd, commandDecor, commandHelp, commandMultiply, commandSettings, commandStart, use];

const helps = [helpAdd, helpDecor, helpMultiply];

export default composers;
export {helps};
