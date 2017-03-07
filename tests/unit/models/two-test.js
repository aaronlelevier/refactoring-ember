import {
  moduleForModel,
  test
} from 'ember-qunit';

moduleForModel('account', 'two - move method', {
  needs: []
});

const MIN_BALANCE = 0;

function Account(obj = {}) {
  const x = Object.assign({
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

test('Account defaults', function(assert) {
  const account = new Account();
  assert.equal(account.balance, 0);
  assert.ok(account.shouldRecharge());
});

test('Billing will process account', function(assert) {
  let account = new Account();
  assert.equal(account.balance, 0);

  const billing = new Billing();
  billing.rechargeAccount(account);
  assert.equal(account.balance, 10);
});
