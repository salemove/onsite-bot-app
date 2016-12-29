import Bot from '../js/Bot';
import {SENDERS} from '../js/Constants';
import memo from 'memo-is';

describe('Bot', () => {
  let salemove;
  let bot;
  let sendMessage;
  let getMessages;

  beforeEach(() => {
    salemove = sinon.stub();
    sendMessage = sinon.stub();
    getMessages = sinon.stub();
    bot = new Bot(salemove, sendMessage, getMessages);
  });

  describe('#startDialog', () => {
    const dialog = memo().is(() => sinon.stub());

    beforeEach(() => {
      bot.startDialog(dialog());
    });

    it('creates a new dialog with a context', () => {
      expect(dialog()).to.be.calledWith({
        salemove,
        finish: sinon.match.func,
        startDialog: sinon.match.func,
        startDialogForResult: sinon.match.func,
        sendMessage: sinon.match.func,
        getMessages: sinon.match.func
      });
    });

    context('when dialog has onStart defined', () => {
      const onStart = memo().is(() => sinon.stub());
      dialog.is(() => () => ({
        onStart: onStart()
      }));

      it('triggers dialog start event', () => {
        expect(onStart()).to.be.calledOnce;
      });
    });

    context('when message received', () => {
      const sender = memo().is(() => null);
      const message = memo().is(() => ({content: 'Hello', sender: sender()}));
      const onMessage = memo().is(() => sinon.stub());
      dialog.is(() => () => ({
        onMessage: onMessage()
      }));

      beforeEach(() => {
        bot.onMessage(message());
      });

      context('from Visitor', () => {
        sender.is(() => SENDERS.VISITOR);
        it('routes message to current dialog', () => {
          expect(onMessage()).to.be.calledWith(message());
        });
      });

      context('from Bot', () => {
        sender.is(() => SENDERS.BOT);
        it('skips the message', () => {
          expect(onMessage()).to.not.be.called;
        });
      });

      context('from Operator', () => {
        sender.is(() => SENDERS.OPERATOR);
        it('skips the message', () => {
          expect(onMessage()).to.not.be.called;
        });
      });
    });
  });

  describe('#startDialogForResult', () => {
    const dialog = memo().is(() => sinon.stub());
    let resultPromise;

    beforeEach(() => {
      resultPromise = bot.startDialogForResult(dialog());
    });

    it('creates a new dialog with a context', () => {
      expect(dialog()).to.be.calledWith({
        salemove,
        finish: sinon.match.func,
        finishWithResult: sinon.match.func,
        sendMessage: sinon.match.func,
        getMessages: sinon.match.func
      });
    });

    context('when dialog finishes with a result', () => {
      const data = 'data';
      dialog.is(() => ({finishWithResult}) => {
        finishWithResult(data);
      });

      it('resolves the Promise with the result', done => {
        resultPromise.then(result => {
          expect(result).to.eql(data);
          done();
        });
      });
    });

    context('when dialog finishes without a result', () => {
      dialog.is(() => ({finish}) => {
        finish('error');
      });

      it('rejects the Promise witn an error', done => {
        resultPromise.catch(error => {
          expect(error).to.eql('error');
          done();
        });
      });
    });
  });
});
