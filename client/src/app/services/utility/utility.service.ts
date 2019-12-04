import { Injectable } from '@angular/core';

interface timestampObject {
  timestamp: string | Date;
}

@Injectable({
  providedIn: 'root'
})
export class UtilityService {

  constructor() { }

  unique<T>(arr: T[], prop: string, comparer: string) {
    let hasSeen: any = {};

    return arr.filter((value) => {
      if (!hasSeen[value[prop]]) {
        return true;
      } else {
        hasSeen[value[prop]] = true;
      }
    }).sort((a, b) => {
      return a[comparer] - b[comparer];
    });
  }

  augmentTimestamp(obj: timestampObject) {
    obj.timestamp = new Date(obj.timestamp);
  }
}
