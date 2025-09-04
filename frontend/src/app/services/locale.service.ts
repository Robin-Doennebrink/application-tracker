import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class LocaleService {
  private readonly localeSub = new BehaviorSubject<string>('de'); // default
  readonly locale$ = this.localeSub.asObservable();

  setLocale(locale: 'en' | 'de') {
    this.localeSub.next(locale);
  }

  get current() {
    return this.localeSub.value;
  }
}