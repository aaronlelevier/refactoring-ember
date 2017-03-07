import {
  moduleForModel,
  test
} from 'ember-qunit';

moduleForModel('account', 'one2 - extract method', {
  needs: []
});

const MIN_BALANCE = 0;

function Account(obj = {}) {
  let x = Object.assign({
    balance: obj.balance ? obj.balance : 0,
  }, obj);

  return x;
}

function Billing() {
  this.rechargeAccount = function(account) {
    if (account.balance <= MIN_BALANCE) {
      // process payment
      account.balance += 10;
    }
  };
}

test('Billing will process account', function(assert) {
  let account = new Account();
  assert.equal(account.balance <= MIN_BALANCE, true);
  const billing = new Billing();

  billing.rechargeAccount(account);

  assert.equal(account.balance, 10);
});
