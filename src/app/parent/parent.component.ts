import { Component, OnDestroy, OnInit } from '@angular/core';
import { of, interval, Observable, Subscription } from 'rxjs';
import { mergeMap, map, switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-parent',
  templateUrl: './parent.component.html',
  styleUrls: ['./parent.component.css'],
})
export class ParentComponent implements OnInit {
  private mergeMapSubscription: Subscription | undefined;
  private mergeMapResult$: Observable<string> | undefined;

  private switchMapSubscription: Subscription | undefined;
  private switchMapResult$: Observable<string> | undefined;

  readonly letters = of('a', 'b', 'c');

  constructor() {}

  ngOnInit(): void {
    this.mergeMapResult$ = this.letters.pipe(
      mergeMap((x) => interval(1000).pipe(map((i) => x + i)))
    );

    this.switchMapResult$ = this.letters.pipe(
      switchMap((x) => interval(1000).pipe(map((i) => x + i)))
    );
  }
  ngOnDestroy(): void {
    this.mergeMapUnsubscribe();
    this.switchMapUnsubscribe();
  }

  mergeMapSubscribe() {
    this.mergeMapUnsubscribe();
    this.mergeMapSubscription = this.mergeMapResult$?.subscribe((x) =>
      console.log(x)
    );
  }

  mergeMapUnsubscribe() {
    this.mergeMapSubscription?.unsubscribe();
  }

  //switchMap
  switchMapSubscribe() {
    this.switchMapUnsubscribe();
    this.switchMapSubscription = this.switchMapResult$?.subscribe((x) =>
      console.log(x)
    );
  }

  switchMapUnsubscribe() {
    this.switchMapSubscription?.unsubscribe();
  }
}
