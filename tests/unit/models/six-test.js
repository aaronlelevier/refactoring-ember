import {
  moduleForModel,
  test
} from 'ember-qunit';

moduleForModel('account', 'six - introduce explaining variable', {
  needs: []
});

const SUCCESS_CODE = 0;
const ERROR_CODE = 1;

function Account(obj = {}) {
  const x = Object.assign({
    balance: obj.balance ? obj.balance : 0,
  }, obj);

  x.sendSms = function(text) {
    try {
      // send sms api call succeeds
      x._mockSendSms(text);
      return SUCCESS_CODE;
    } catch (err) {
      return ERROR_CODE;
    }
  };

  x._mockSendSms = function(text) {
    console.log(text);
  };

  return x;
}

test('Account sendSms', function(assert) {
  const account = new Account();
  assert.equal(account.sendSms('wat'), SUCCESS_CODE);
});