import EchoDialog from '../../js/dialogs/EchoDialog';
import EngagementDialog from '../../js/dialogs/EngagementDialog';
import {SENDERS} from '../../js/Constants';
import memo from 'memo-is';

describe('EchoDialog', () => {
  let sendMessage;
  let startDialog;
  let dialog;

  beforeEach(() => {
    sendMessage = sinon.stub();
    startDialog = sinon.stub();
    dialog = new EchoDialog({startDialog, sendMessage});
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

      it('starts EngagementDialog', () => {
        expect(startDialog).to.be.calledWith(EngagementDialog);
      });
    });
  });
});
