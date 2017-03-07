import {
  moduleForModel,
  test
} from 'ember-qunit';

moduleForModel('account', 'aaron seven - replace temp with query', {
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

function getAccount() {
  return new Account();
}

test('Account sendSms', function(assert) {
  const account = getAccount();
  assert.equal(account.sendSms('wat'), SUCCESS_CODE);
});

test('Account sendSms', function(assert) {
  assert.equal(getAccount().sendSms('wat'), SUCCESS_CODE);
});