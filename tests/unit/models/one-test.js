import {
  moduleForModel,
  test
} from 'ember-qunit';

moduleForModel('account', 'one', {
  needs: []
});

function minBalance() {
  return 0;
}

const MIN_BALANCE = 0;

test('convert method to constant', function(assert) {
  assert.equal(minBalance(), 0);
  assert.equal(MIN_BALANCE, 0);
});