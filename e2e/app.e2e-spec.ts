import { NuevoProyectoPage } from './app.po';

describe('nuevo-proyecto App', () => {
  let page: NuevoProyectoPage;

  beforeEach(() => {
    page = new NuevoProyectoPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
