import OperatorSelectorDialog from '../../js/dialogs/OperatorSelectorDialog';
import {SENDERS} from '../../js/Constants';
import memo from 'memo-is';

describe('OperatorSelectorDialog', () => {
  const EVENTS = {
    OPERATOR_LIST_UPDATE: 'operator list update'
  };
  const sendMessage = memo().is(() => sinon.stub());
  const startDialog = memo().is(() => sinon.stub());
  const finishWithResult = memo().is(() => sinon.stub());
  const finish = memo().is(() => sinon.stub());
  const salemove = memo().is(() => sinon.stub());
  const dialogContext = memo().is(() => ({
    sendMessage: sendMessage(),
    startDialog: startDialog(),
    finishWithResult: finishWithResult(),
    finish: finish(),
    salemove: salemove()
  }));
  let dialog;

  beforeEach(() => {
    dialog = new OperatorSelectorDialog(dialogContext());
    dialog.onStart();
  });

  const mockAvailableOperators = operators => {
    salemove.is(() => {
      const addEventListener = sinon.stub();
      const removeEventListener = sinon.stub();
      addEventListener.withArgs(EVENTS.OPERATOR_LIST_UPDATE).callsArgWith(1, operators);
      return {
        EVENTS,
        addEventListener,
        removeEventListener
      };
    });
  };

  context('when more than one Operator are available', () => {
    const operators = [{name: 'El', state: {available: true}}, {name: 'Mike', state: {available: true}}];
    mockAvailableOperators(operators);

    it('offers Operators to Visitor', () => {
      expect(sendMessage()).to.be.calledWith('El and Mike are available', SENDERS.BOT);
      expect(sendMessage()).to.be.calledWith(dialog.RESPONSES.SELECT_OPERATOR);
    });

    it('removes listener after operator list received', () => {
      expect(salemove().removeEventListener).to.be.calledWith(EVENTS.OPERATOR_LIST_UPDATE, sinon.match.func);
    });

    context('when Visitor response contains Operator name', () => {
      beforeEach(() => {
        dialog.onMessage({content: 'Talk to El'});
      });

      it('finishes with corresponding Operator as result', () => {
        expect(finishWithResult()).to.be.calledWith(operators[0]);
      });
    });

    context('when Operator name contains Visitor response', () => {
      beforeEach(() => {
        dialog.onMessage({content: 'El'});
      });

      it('finishes with corresponding Operator as result', () => {
        expect(finishWithResult()).to.be.calledWith(operators[0]);
      });
    });

    context('when Visitor response does not match any operator', () => {
      beforeEach(() => {
        dialog.onMessage({content: 'Dustin'});
      });

      it('send NO_SUCH_OPERATOR message', () => {
        expect(sendMessage()).to.be.calledWith(dialog.RESPONSES.NO_SUCH_OPERATOR);
      });
    });
  });

  context('when one Operator is available', () => {
    const operators = [{name: 'El', state: {available: true}}, {name: 'Mike', state: {available: false}}];
    mockAvailableOperators(operators);

    it('finishes with Operator as result', () => {
      expect(finishWithResult()).to.be.calledWith(operators[0]);
    });
  });

  context('when Operators are not available', () => {
    const operators = [{name: 'Mike', state: {available: false}}];
    mockAvailableOperators(operators);

    it('finishes without result', () => {
      expect(finish()).to.be.called;
    });
  });

  context('when Operators are not online', () => {
    const operators = [];
    mockAvailableOperators(operators);

    it('finishes without result', () => {
      expect(finish()).to.be.called;
    });
  });
});
