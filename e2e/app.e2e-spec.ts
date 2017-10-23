import { FinalProjectPage } from './app.po';

describe('final-project App', () => {
  let page: FinalProjectPage;

  beforeEach(() => {
    page = new FinalProjectPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
