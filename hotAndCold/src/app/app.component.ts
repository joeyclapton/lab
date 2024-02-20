import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';

export interface Product {
  title: string;
}

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.sass',
})
export class AppComponent {
  http = inject(HttpClient);

  title = 'hotAndCold';

  cold$ = new Observable<number>((subscribe) => {
    const random = this.getRandomNumber();
    subscribe.next(random);
  });

  hot$ = new BehaviorSubject<number>(0);

  product$ = this.http.get<Product>('https://dummyjson.com/products/1');

  constructor() {
    this.cold$.subscribe(this.printRandomValue);
    this.cold$.subscribe(this.printRandomValue);

    this.hot$.subscribe(this.printRandomValue);
    this.hot$.subscribe(this.printRandomValue);

    setTimeout(() => {
      this.hot$.next(this.getRandomNumber());
      this.hot$.subscribe(this.printRandomValue);
    }, 2000);
  }

  printRandomValue(value: number) {
    console.log('Number generated on subscribe: ', value);
  }

  getRandomNumber(): number {
    return Math.round(Math.random() * 1_000);
  }
}
