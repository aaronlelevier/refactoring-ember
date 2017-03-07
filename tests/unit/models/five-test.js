import {
  moduleForModel,
  test
} from 'ember-qunit';

moduleForModel('account', 'aaron five - introduce explaining variable', {
  needs: []
});

function Account(obj = {}) {
  const x = Object.assign({
    balance: obj.balance ? obj.balance : 0,
  }, obj);

  x.sendSms = function(text) {
    try {
      // send sms api call succeeds
      return 1;
    } catch (err) {
      return 0;
    }
  };

  return x;
}

test('Account sendSms', function(assert) {
  const account = new Account();
  assert.equal(account.sendSms('wat'), 1);
});