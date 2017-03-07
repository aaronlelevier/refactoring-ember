import {
  moduleForModel,
  test
} from 'ember-qunit';

moduleForModel('account', 'six - introduce explaining variable', {
  needs: []
});

const SUCCESS = 0;
const ERROR = 1;

function Account(obj = {}) {
  let x = Object.assign({
    balance: obj.balance ? obj.balance : 0,
  }, obj);

  x.sendSms = function(text) {
    try {
      // send sms api call succeeds
      x._mockSendSms(text);
      return SUCCESS;
    } catch (err) {
      return ERROR;
    }
  };

  x._mockSendSms = function(text) {
    console.log(text);
  };

  return x;
}

test('Account sendSms', function(assert) {
  const account = new Account();
  assert.equal(account.sendSms('wat'), SUCCESS);
});