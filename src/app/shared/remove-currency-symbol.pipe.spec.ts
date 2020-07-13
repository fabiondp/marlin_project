import { RemoveCurrencySymbolPipe } from './remove-currency-symbol.pipe';

describe('RemoveCurrencySymbolPipe', () => {
  it('create an instance', () => {
    const pipe = new RemoveCurrencySymbolPipe();
    expect(pipe).toBeTruthy();
  });
});
