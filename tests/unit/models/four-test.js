import {
  moduleForModel,
  test
} from 'ember-qunit';

moduleForModel('account', 'four - split temp variable', {
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
    if (this.shouldRecharge(account)) {
      // process payment
      account.balance += 10;
    }
  };
  this.shouldRecharge = function(account) {
    return account.balance <= MIN_BALANCE;
  };
}

test('Billing shouldRecharge share temp', function(assert) {
  const billing = new Billing();

  let account = new Account();
  assert.equal(account.balance <= MIN_BALANCE, true);
  assert.equal(billing.shouldRecharge(account), true);

  account = new Account({balance: 1});
  assert.equal(account.balance <= MIN_BALANCE, false);
  assert.equal(billing.shouldRecharge(account), false);
});

test('Billing shouldRecharge split temp', function(assert) {
  const billing = new Billing();

  const accountOne = new Account();
  assert.equal(accountOne.balance <= MIN_BALANCE, true);
  assert.equal(billing.shouldRecharge(accountOne), true);

  const accountTwo = new Account({balance: 1});
  assert.equal(accountTwo.balance <= MIN_BALANCE, false);
  assert.equal(billing.shouldRecharge(accountTwo), false);
});
