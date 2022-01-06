import { ReturnStatement } from '@angular/compiler';
import { Component, ElementRef, OnDestroy, OnInit } from '@angular/core';
import { switchMap } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit, OnDestroy {
  private selector: string;
  unsortedData: number[] = [];
  sortedData: number[] = [];

  constructor(private elementRef: ElementRef) {
    this.selector = elementRef.nativeElement.tagName;
  }

  ngOnInit(): void {
    console.log(`ngOnInit: ${this.selector}`);
  }

  ngOnDestroy(): void {
    console.log(`ngOnDestroy: ${this.selector}`);
  }

  generateRandomArray(length: number): void {
    if (length <= 0) {
      return;
    }
    this.unsortedData = []; // is this a mem leak?  apparently not since ref is gone  can also set length to 0 to force

    for (let i = 0; i < length; i++) {
      let newRandom = Math.floor(Math.random() * 100);
      this.unsortedData.push(newRandom);
    }

    console.log(`Unsorted array = ${this.unsortedData}`);
  }

  sortArray(): void {
    // copy array
    Object.assign(this.sortedData, this.unsortedData);

    this.sortInPlace(this.sortedData, this.sortedData.length);

    console.log(`Sorted array = ${this.sortedData}`);
  }

  private sortInPlace(data: number[], length: number): void {
    // recursive swap sort(bubble sort?) bubbles highest value to top.
    if (length <= 1) {
      return;
    }

    for (let i = 0; i < length - 1; i++) {
      //don't consider last as it has no compare after it

      if (data[i] > data[i + 1]) {
        this.swap(data, i);
      }
    }

    // recursively call with smaller section until length = 1
    this.sortInPlace(data, length - 1);
  }

  private swap(data: number[], index: number) {
    let temp = data[index];
    data[index] = data[index + 1];
    data[index + 1] = temp;
  }
}
