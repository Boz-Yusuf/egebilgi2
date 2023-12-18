import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'label',
})
export class LabelPipe implements PipeTransform {
  transform(value: string, ...args: unknown[]): unknown {
    if (value.slice(0, 2) === 'b-') {
      return value.slice(2);
    }
    return '';
  }
}
