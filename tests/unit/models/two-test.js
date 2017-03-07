import {
  moduleForModel,
  test
} from 'ember-qunit';

moduleForModel('account', 'two - move method', {
  needs: []
});

const MIN_BALANCE = 0;

function Account(obj = {}) {
  let x = Object.assign({
    balance: obj.balance ? obj.balance : 0,
  }, obj);

  x.shouldRecharge = function() {
    return x.balance <= MIN_BALANCE;
  };

  return x;
}

function Billing() {
  this.rechargeAccount = function(account) {
    if (account.shouldRecharge()) {
      // process payment
      account.balance += 10;
    }
  };
}

test('Billing shouldRecharge', function(assert) {
  let account = new Account();
  assert.equal(account.balance, 0);
  assert.ok(account.shouldRecharge());

  const billing = new Billing();
  billing.rechargeAccount(account);
  assert.equal(account.balance, 10);
});
