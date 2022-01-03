import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import {
  BehaviorSubject,
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
  @Input() switchMapSubscribed$!: BehaviorSubject<boolean>;
  @Output() mergeValueEmitted = new EventEmitter<string>();

  @Input() intervalBlueChild!: number;
  @Output() intervalBlueChildChange = new EventEmitter<number>();

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
      switchMap((x) => interval(1000).pipe(map((i) => x + i))),
      takeUntil(this.destroyed$)
    );

    this.switchMapSubscribed$
      ?.pipe(takeUntil(this.destroyed$))
      .subscribe((x) => {
        if (x) {
          console.log(
            `ngOnInit: ${this.selector} Subscribed(true) Event Received`
          );
          this.switchMapSubscribe();
        } else {
          console.log(
            `ngOnInit: ${this.selector} Unsubscribed(false) Event Received`
          );
          this.switchMapUnsubscribe();
        }
      });
  }
  ngOnDestroy(): void {
    this.destroyed$.next(true);
    this.destroyed$.unsubscribe();
    console.log(`ngOnDestroy: ${this.selector}`);
  }

  intervalChanged() {
    this.intervalBlueChildChange.emit(this.intervalBlueChild);
  }

  //switchMap
  private switchMapSubscribe() {
    this.switchMapUnsubscribe();
    this.switchMapSubscription = this.switchMapResult$?.subscribe((x) => {
      this.mergeValueEmitted.emit(x);
      console.log(x);
    });
  }

  private switchMapUnsubscribe() {
    this.switchMapSubscription?.unsubscribe();
  }
}
