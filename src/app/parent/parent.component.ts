import { Component, ElementRef, OnDestroy, OnInit } from '@angular/core';

import {
  of,
  interval,
  Observable,
  Subscription,
  Subject,
  BehaviorSubject,
} from 'rxjs';
import {
  mergeMap,
  map,
  switchMap,
  takeUntil,
  withLatestFrom,
} from 'rxjs/operators';

@Component({
  selector: 'app-parent',
  templateUrl: './parent.component.html',
  styleUrls: ['./parent.component.css'],
})
export class ParentComponent implements OnInit, OnDestroy {
  intervalParent: number = 0;

  mapValue: string = '';

  switchMapBlueChildSubscribed$: BehaviorSubject<boolean> =
    new BehaviorSubject<boolean>(false);

  mergeMapBlueChildSubscribed$: BehaviorSubject<boolean> =
    new BehaviorSubject<boolean>(false);

  private destroyed$: Subject<boolean> = new Subject<boolean>();

  private selector: string;

  constructor(private elementRef: ElementRef) {
    this.selector = elementRef.nativeElement.tagName;
  }

  ngOnInit(): void {
    console.log(`ngOnInit: ${this.selector}`);
  }
  ngOnDestroy(): void {
    this.destroyed$.next(true);
    this.destroyed$.unsubscribe();
    console.log(`ngOnDestroy: ${this.selector}`);
  }

  // toggles the blue child switch map subscription
  switchMapSubscribeToggle(): void {
    let currentState = this.switchMapBlueChildSubscribed$.getValue();
    if (currentState) {
      console.log(
        `ngOnInit: ${this.selector} switchMapSubscribeToggle: true: sending false`
      );
      this.switchMapBlueChildSubscribed$.next(false);
    } else {
      console.log(
        `ngOnInit: ${this.selector} switchMapSubscribeToggle: false: sending true`
      );
      this.switchMapBlueChildSubscribed$.next(true);
    }

    // can't actually do a withLatestFrom because would need to subscribe to it and that would
    // cause infinite loop.
    // this.switchMapBlueChildSubscribed$.pipe(
    //   withLatestFrom((x) => {
    //     if (x) {
    //       this.switchMapBlueChildSubscribed$.next(false);
    //     } else {
    //       this.switchMapBlueChildSubscribed$.next(true);
    //     }
    //   })
    // );
  }

  // toggles the red child switch map subscription
  mergeMapSubscribeToggle(): void {
    let currentState = this.mergeMapBlueChildSubscribed$.getValue();
    if (currentState) {
      console.log(
        `ngOnInit: ${this.selector} mergeMapSubscribeToggle: true: sending false`
      );
      this.mergeMapBlueChildSubscribed$.next(false);
    } else {
      console.log(
        `ngOnInit: ${this.selector} mergeMapSubscribeToggle: false: sending true`
      );
      this.mergeMapBlueChildSubscribed$.next(true);
    }
  }
}
