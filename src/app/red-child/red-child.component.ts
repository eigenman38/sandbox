import {
  Component,
  ElementRef,
  Input,
  Output,
  OnDestroy,
  OnInit,
  EventEmitter,
} from '@angular/core';
import {
  BehaviorSubject,
  interval,
  map,
  mergeMap,
  Observable,
  of,
  Subject,
  Subscription,
  takeUntil,
} from 'rxjs';

@Component({
  selector: 'app-red-child',
  templateUrl: './red-child.component.html',
  styleUrls: ['./red-child.component.css'],
})
export class RedChildComponent implements OnInit, OnDestroy {
  @Input() mergeMapSubscribed$!: BehaviorSubject<boolean>;
  @Output() mergeValueEmitted = new EventEmitter<string>();

  private selector: string;
  private destroyed$: Subject<boolean> = new Subject<boolean>();

  readonly letters = of('a', 'b', 'c');
  private mergeMapSubscription: Subscription | undefined;
  private mergeMapResult$: Observable<string> | undefined;

  constructor(private elementRef: ElementRef) {
    this.selector = elementRef.nativeElement.tagName;
  }

  ngOnInit(): void {
    console.log(`ngOnInit: ${this.selector}`);

    this.mergeMapResult$ = this.letters.pipe(
      mergeMap((x) => interval(1000).pipe(map((i) => x + i))),
      takeUntil(this.destroyed$)
    );

    this.mergeMapSubscribed$.pipe(takeUntil(this.destroyed$)).subscribe((x) => {
      if (x) {
        console.log(
          `ngOnInit: ${this.selector} Subscribed(true) Event Received`
        );
        this.mergeMapSubscribe();
      } else {
        console.log(
          `ngOnInit: ${this.selector} Unsubscribed(false) Event Received`
        );
        this.mergeMapUnsubscribe();
      }
    });
  }

  ngOnDestroy(): void {
    this.destroyed$.next(true);
    this.destroyed$.unsubscribe();
    console.log(`ngOnDestroy: ${this.selector}`);
  }

  private mergeMapSubscribe() {
    this.mergeMapUnsubscribe();
    this.mergeMapSubscription = this.mergeMapResult$?.subscribe((x) => {
      this.mergeValueEmitted.emit(x);
      console.log(x);
    });
  }

  private mergeMapUnsubscribe() {
    this.mergeMapSubscription?.unsubscribe();
  }
}
