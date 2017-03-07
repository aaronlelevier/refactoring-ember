import {
  moduleForModel,
  test
} from 'ember-qunit';

moduleForModel('account', 'three - move method', {
  needs: []
});

const MIN_BALANCE = 0;

function Account(obj = {}) {
  const x = Object.assign({
    balance: obj.balance ? obj.balance : 0,
  }, obj);

  return x;
}

function Billing() {
  this.rechargeAccount = function(account) {
    if (this.shouldRecharge(account)) {
      // process payment
      account.balance += 10;
    }
  };
  this.shouldRecharge = function(account) {
    return account.balance <= MIN_BALANCE;
  };
}

test('Billing will process account', function(assert) {
  let account = new Account();
  assert.equal(account.balance, 0);

  const billing = new Billing();
  assert.equal(billing.shouldRecharge(account), true);

  billing.rechargeAccount(account);
  assert.equal(account.balance, 10);
});

test('Billing shouldRecharge', function(assert) {
  const billing = new Billing();

  let account = new Account();
  assert.equal(account.balance <= MIN_BALANCE, true);
  assert.equal(billing.shouldRecharge(account), true);

  account = new Account({balance: 1});
  assert.equal(account.balance <= MIN_BALANCE, false);
  assert.equal(billing.shouldRecharge(account), false);
});
