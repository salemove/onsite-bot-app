import EchoDialog from '../../js/dialogs/EchoDialog';
import EngagementDialog from '../../js/dialogs/EngagementDialog';
import OperatorSelectorDialog from '../../js/dialogs/OperatorSelectorDialog';
import {SENDERS} from '../../js/Constants';
import memo from 'memo-is';

describe('EchoDialog', () => {
  let sendMessage;
  let startDialog;
  let startDialogForResult;
  let dialog;
  const selectedOperatorPromise = memo().is(() => Promise.reject());

  beforeEach(() => {
    sendMessage = sinon.stub();
    startDialog = sinon.stub();
    startDialogForResult = sinon.stub().returns(selectedOperatorPromise());

    dialog = new EchoDialog({startDialog, startDialogForResult, sendMessage});
  });

  describe('#onMessage', () => {
    const message = memo().is(() => ({content: 'Hello', sender: SENDERS.VISITOR}));

    beforeEach(() => {
      dialog.onMessage(message())
    });

    it ('send the same message as Bot', () => {
      expect(sendMessage).to.be.calledWith(message().content, SENDERS.BOT);
    });

    context('when message contains "engagement"', () => {
      message.is(() => ({content: 'Start engagement', sender: SENDERS.VISITOR}));

      it('starts OperatorSelectorDialog for result', () => {
        expect(startDialogForResult).to.be.calledWith(OperatorSelectorDialog);
      });

      context('when Operator selected', () => {
        const operator = {name: 'El'};
        selectedOperatorPromise.is(() => Promise.resolve(operator));

        it('starts EngagementDialog with selected Operator', () => {
          expect(startDialog).to.be.calledWith(EngagementDialog, {operator});
        });
      });
    });
  });
});
