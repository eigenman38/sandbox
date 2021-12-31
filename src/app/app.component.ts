import { Component, OnDestroy, OnInit } from '@angular/core';
import { of, interval, Observable, Subscription } from 'rxjs';
import { mergeMap, map, switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'The Sandbox';

  ngOnInit(): void {
    let testArrary: string[] = ['one', 'two'];
    let resultOfMapArray = testArrary.map((x) => {
      return x + '!';
    });

    resultOfMapArray.forEach((x) => {
      console.log(`resultOfMapArray: ${x}`);
    });
  }

  ngOnDestroy(): void {}
}
