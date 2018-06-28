import {SENDERS} from '../Constants';
import Humanize from 'humanize-plus';

const OperatorSelectorDialog = context => {
  const RESPONSES = {
    SELECT_OPERATOR: 'Please, write a name of an operator you would like to talk to',
    NO_SUCH_OPERATOR: 'Sorry, no such operator'
  };
  const {salemove, sendMessage, finish, finishWithResult} = context;
  let availableOperators;

  const names = items => items.map(item => item.name);
  const verb = operators => operators.length === 1 ? 'is' : 'are';

  const operatorsToText = operators => {
    return `${Humanize.oxford(names(operators))} ${verb(operators)} available`;
  };

  const findByName = (operators, name) =>
    operators.find(op => name.includes(op.name) || op.name.includes(name));

  const pickOperator = message => {
    if (availableOperators) {
      const choosenOperator = findByName(availableOperators, message.content);
      if (choosenOperator) {
        finishWithResult(choosenOperator);
      } else {
        sendMessage(RESPONSES.NO_SUCH_OPERATOR, SENDERS.BOT);
      }
    }
  };

  const availableOperator = operator => operator.state.available;

  const offerOperators = () => {
    salemove.addEventListener(salemove.EVENTS.OPERATOR_LIST_UPDATE, function onOperatorListReceived(operators) {
      if (availableOperators) return;

      salemove.removeEventListener(salemove.EVENTS.OPERATOR_LIST_UPDATE, onOperatorListReceived);

      availableOperators = operators.filter(availableOperator);
      if (availableOperators.length > 1) {
        sendMessage(operatorsToText(availableOperators), SENDERS.BOT);
        sendMessage(RESPONSES.SELECT_OPERATOR, SENDERS.BOT);
      } else if (availableOperators.length === 1) {
        finishWithResult(availableOperators[0]);
      } else {
        finish();
      }
    });
  };

  return {
    RESPONSES,
    onStart: offerOperators,
    onMessage: pickOperator
  };
};

export default OperatorSelectorDialog;
