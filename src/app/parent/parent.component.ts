import { Component, ElementRef, OnDestroy, OnInit } from '@angular/core';
import { of, interval, Observable, Subscription, Subject } from 'rxjs';
import { mergeMap, map, switchMap, takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-parent',
  templateUrl: './parent.component.html',
  styleUrls: ['./parent.component.css'],
})
export class ParentComponent implements OnInit, OnDestroy {
  private mergeMapSubscription: Subscription | undefined;
  private mergeMapResult$: Observable<string> | undefined;

  private switchMapSubscription: Subscription | undefined;
  private switchMapResult$: Observable<string> | undefined;

  private destroyed$: Subject<boolean> = new Subject<boolean>();

  private selector: string;

  readonly letters = of('a', 'b', 'c');

  constructor(private elementRef: ElementRef) {
    this.selector = elementRef.nativeElement.tagName;
  }

  ngOnInit(): void {
    console.log(`ngOnInit: ${this.selector}`);
    this.mergeMapResult$ = this.letters.pipe(
      mergeMap((x) => interval(1000).pipe(map((i) => x + i)))
    );

    this.switchMapResult$ = this.letters.pipe(
      switchMap((x) => interval(1000).pipe(map((i) => x + i)))
    );
  }
  ngOnDestroy(): void {
    this.destroyed$.next(true);
    this.destroyed$.unsubscribe();
    console.log(`ngOnDestroy: ${this.selector}`);
  }

  mergeMapSubscribe() {
    this.mergeMapUnsubscribe();
    this.mergeMapResult$
      ?.pipe(takeUntil(this.destroyed$))
      .subscribe((x) => console.log(x));
  }

  mergeMapUnsubscribe() {
    this.mergeMapSubscription?.unsubscribe();
  }

  //switchMap
  switchMapSubscribe() {
    this.switchMapUnsubscribe();
    this.switchMapResult$
      ?.pipe(takeUntil(this.destroyed$))
      .subscribe((x) => console.log(x));
  }

  switchMapUnsubscribe() {
    this.switchMapSubscription?.unsubscribe();
  }
}
