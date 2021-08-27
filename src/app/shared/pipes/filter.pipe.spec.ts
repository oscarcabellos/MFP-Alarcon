import { FilterPipe } from './filter.pipe';

describe('FilterPipe', () => {
  it('create an instance', () => {
    const pipe = new FilterPipe();
    expect(pipe).toBeTruthy();
  });

  it('filter the word true', () => {
    const pipe = new FilterPipe();
    expect(
      pipe.transform(
        [{ nombre: 'Eduardo' }, { nombre: 'Edudo2' }],
        { nombre: 'Eduardo' },
        true
      )
    ).toEqual([{ nombre: 'Eduardo' }]);
  });

  it('filter the word false', () => {
    const pipe = new FilterPipe();
    expect(
      pipe.transform(
        [{ nombre: 'Eduardo' }, { nombre: 'Edrdo2' }],
        { edad: 'Eduardo', nombre: 'Eduardo' },
        false
      )
    ).toEqual([{ nombre: 'Eduardo' }]);
  });

  it('filter the word false and else statement', () => {
    const pipe = new FilterPipe();
    expect(
      pipe.transform(
        [{ nombre: 'Eduardo' }, { nombre: 'Eduardo2' }],
        { edad: 'Eduardo' },
        false
      )
    ).toEqual([]);
  });
});
