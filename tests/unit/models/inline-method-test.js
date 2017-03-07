import { moduleForModel, test } from 'ember-qunit';

moduleForModel('account', 'inline method', {
  needs: []
});

function monthlyCost() {
  return 5;
}

test('as a function', function(assert) {
  assert.equal(monthlyCost(), 5);
});

const MONTHLY_COST = 5;

test('could be a constant', function(assert) {
  assert.equal(MONTHLY_COST, 5);
});
