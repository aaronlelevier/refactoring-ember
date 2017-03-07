import {
  moduleForModel,
  test
} from 'ember-qunit';

moduleForModel('account', 'move method', {
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

  x.sendSms = function(text) {
    try {
      // send sms api call succeeds
      return 1;
    } catch(err) {
      return 0;
    }
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

test('Account sendSms', function(assert) {
  const account = new Account();
  assert.equal(account.sendSms('wat'), 1);
});

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

// better

function BillingTwo() {
  this.rechargeAccount = function(account) {
    if (account.shouldRecharge(account)) {
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

  const billing = new BillingTwo();
  assert.equal(billing.shouldRecharge(account), true);

  billing.rechargeAccount(account);
  assert.equal(account.balance, 10);
});

test('Billing shouldRecharge', function(assert) {
  const billing = new BillingTwo();

  let account = new Account();
  assert.equal(account.balance <= MIN_BALANCE, true);
  assert.equal(billing.shouldRecharge(account), true);

  account = new Account({balance: 1});
  assert.equal(account.balance <= MIN_BALANCE, false);
  assert.equal(billing.shouldRecharge(account), false);
});

// split temp variable

test('Billing shouldRecharge', function(assert) {
  const billing = new BillingTwo();

  const accountOne = new Account();
  assert.equal(accountOne.balance <= MIN_BALANCE, true);
  assert.equal(billing.shouldRecharge(accountOne), true);

  const accountTwo = new Account({balance: 1});
  assert.equal(accountTwo.balance <= MIN_BALANCE, false);
  assert.equal(billing.shouldRecharge(accountTwo), false);
});
