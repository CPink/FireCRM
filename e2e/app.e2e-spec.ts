import { FirecrmPage } from './app.po';

describe('firecrm App', () => {
  let page: FirecrmPage;

  beforeEach(() => {
    page = new FirecrmPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!!');
  });
});
