import {
  moduleForModel,
  test
} from 'ember-qunit';

moduleForModel('account', 'aaron move method', {
  needs: []
});

const MIN_BALANCE = 0;

function Account(obj={}) {
  const x = Object.assign({
    balance: obj.balance ? obj.balance : 0,
  }, obj);

  x.shouldRecharge = function() {
    return x.balance <= MIN_BALANCE;
  };

  return x;
}

function Billing() {
  return 5;
}

test('Account defaults', function(assert) {
  const account = Account();
  assert.equal(account.balance, 0);
  assert.ok(account.shouldRecharge());
});

test('Billing will process account', function(assert) {
  let account = Account();
  assert.equal(account.balance, 0);

  // const billing = n 
});
