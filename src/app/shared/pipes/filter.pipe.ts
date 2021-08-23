import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter',
})
export class FilterPipe implements PipeTransform {
  transform(items: any, filter: any, isAnd: boolean): any {
    const filterKeys = Object.keys(filter);
    if (isAnd) {
      return items.filter((item) =>
        filterKeys.reduce(
          (memo, keyName) =>
            (memo && new RegExp(filter[keyName], 'gi').test(item[keyName])) ||
            filter[keyName] === '',
          true
        )
      );
    } else {
      return items.filter((item) => {
        return filterKeys.some((keyName) => {
          if (filter[keyName]) {
            const fil = filter[keyName].split(' ');
            let check = false;
            for (const f of fil) {
              new RegExp(f, 'gi').test(item[keyName]) || f === ''
                ? (check = true)
                : (check = false);
            }
            return check;
          } else {
            return true;
          }
        });
      });
    }
  }
}
