import {
  moduleForModel,
  test
} from 'ember-qunit';

moduleForModel('user', 'Unit | Model | user', {
  // Specify the other units that are required for this test.
  needs: []
});

function Pandora() {
  let p = Object.assign({});
  p.chargeAccount = function(account){
    account.balance -= 5;

    // TODO: based on signup date, charge them
    /*

** inline method
    // if this were a top level function
    // it could be a constant instead, 
    // or nested with Pandora if it belonged
    // there
    function monthlyCost() {
      return 5;
    };

    if today < account.exipiration:
      if account.hasAutopay:
        chargeAccount {
          try
            to charge account
            account.suspended = false
          catch (fail)
            suspendAccount
            sendEmail("autopay failed")
        }
      else:
        suspendAccount
        sendEmail("autopay off")

** extract method
  suspend(account)
  activate(account)

** introduce explaining variable:
  // AUTOPAY_OFF / AUTOPAY_FAILED

      suspendAccount(reasonCode)
        account.suspended = true
        switch(reasonCode) {
          case AUTOPAY_OFF:
            sendEmail("autopay off")
            break;
          case AUTOPAY_FAILD:
            sendEmail("autopay failed")
            break;
        }

      rechargeAccount
        account.expirationDate = today + 30 days
        account.suspended = false

** replace temp with query

      let balance = account.getBalance();
      let finalBalance = balance - monthlyCost();
      return finalBalance;

      // could be
      return account.getBalance() - monthlyCost();

** split temp variable
  // used to add credis
  addCredits(10)
    if today < account.exipiration:
      charge account... etc...
    calculate new balance
    return balance

  // is modifying account, and returning
  // balance, from method name, this isn't
  // obvious
  
  // more explicity
  addCredis(10) // doesn't return anything
                // only credits balance
  let balance = account.getBalance();


** replace method with method object
  // if these will all first level fields,
  // they could be used internally to determine
  // reward points fox ex as an inner class
  {
    yearJoined: 2015,
    statusLevel: silver, // bronze, silver, gold
    spend: 1000
  }

  freeCreditFromFriend({
    yearJoined: 2015,
    statusLevel: silver, // bronze, silver, gold
    spend: 1000
  })

    */

  };

  return p;
}

function Person(obj) {
  let x = Object.assign({rechargeAmount: 10}, obj);

  x.shouldRecharge = function() {
    return x.balance < 0;
  };

  return x;
}

test('person.age', function(assert) {
  var person = new Person({
    age: 1
  });
  assert.equal(person.age, 1);
});

test('when to recharge', function(assert) {
  var person = new Person({balance: 100});
  assert.equal(person.rechargeAmount, 10);
  assert.equal(person.shouldRecharge(), false);
});

test('chargeAccount', function(assert) {
  var person = new Person({balance: 100});
  var pandora = new Pandora();
  assert.equal(person.balance, 100);

  pandora.chargeAccount(person);

  assert.equal(person.balance, 95);
});


