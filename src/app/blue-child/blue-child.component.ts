import { Component, ElementRef, OnDestroy, OnInit } from '@angular/core';
import {
  interval,
  map,
  Observable,
  of,
  Subject,
  Subscription,
  switchMap,
  takeUntil,
} from 'rxjs';

@Component({
  selector: 'app-blue-child',
  templateUrl: './blue-child.component.html',
  styleUrls: ['./blue-child.component.css'],
})
export class BlueChildComponent implements OnInit, OnDestroy {
  private selector: string;
  private destroyed$: Subject<boolean> = new Subject<boolean>();

  readonly letters = of('a', 'b', 'c');
  private switchMapSubscription: Subscription | undefined;
  private switchMapResult$: Observable<string> | undefined;

  constructor(private elementRef: ElementRef) {
    this.selector = elementRef.nativeElement.tagName;
  }

  ngOnInit(): void {
    console.log(`ngOnInit: ${this.selector}`);

    this.switchMapResult$ = this.letters.pipe(
      switchMap((x) => interval(1000).pipe(map((i) => x + i)))
    );
  }
  ngOnDestroy(): void {
    this.destroyed$.next(true);
    this.destroyed$.unsubscribe();
    console.log(`ngOnDestroy: ${this.selector}`);
  }

  //switchMap
  switchMapSubscribe() {
    this.switchMapUnsubscribe();
    this.switchMapSubscription = this.switchMapResult$
      ?.pipe(takeUntil(this.destroyed$))
      .subscribe((x) => console.log(x));
  }

  switchMapUnsubscribe() {
    this.switchMapSubscription?.unsubscribe();
  }
}
