import {renderPaymentSummary} from '../../scripts/checkout/paymentSummary.js'
describe('test suite: render paymentSummary',() => {
  beforeEach(() => {document.querySelector('.js-test-contatiner').innerHTML = `
     <div class="js-payment-summary"></div>
  `;
  renderPaymentSummary();
  });
  afterEach(() => {
    document.querySelector('.js-test-contatiner').innerHTML = ``
  });
  it('displays the prices', () => {
    expect(document.querySelector('.js-payment-total-no-shipping')
    .innerText).toContain('$');
    expect(document.querySelector('.js-payment-summary-shipping')
    .innerText).toContain('$');
    expect(document.querySelector('.js-payment-before-tax')
    .innerText).toContain('$');
    expect(document.querySelector('.js-estimated-tax')
    .innerText).toContain('$');
    expect(document.querySelector('.js-payment-summary-total')
    .innerText).toContain('$');
  }); 
});