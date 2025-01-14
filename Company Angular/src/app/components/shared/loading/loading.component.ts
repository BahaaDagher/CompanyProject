import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-loading',
  templateUrl: './loading.component.html',
  styleUrls: ['./loading.component.css']
})
export class LoadingComponent implements OnInit {
  @Input() isLoading: boolean = false; // To control visibility
  @Input() message: string = 'Loading...'; // Optional loading message

  constructor() {}

  ngOnInit(): void {}
}
