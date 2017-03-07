import {
  moduleForModel,
  test
} from 'ember-qunit';

moduleForModel('account', 'five - introduce explaining variable', {
  needs: []
});

function Account(obj = {}) {
  let x = Object.assign({
    balance: obj.balance ? obj.balance : 0,
  }, obj);

  x.sendSms = function(text) {
    try {
      // send sms api call succeeds
      x._mockSendSms(text);
      return 1;
    } catch (err) {
      return 0;
    }
  };

  x._mockSendSms = function(text) {
    console.log(text);
  };

  return x;
}

test('Account sendSms', function(assert) {
  const account = new Account();
  assert.equal(account.sendSms('wat'), 1);
});