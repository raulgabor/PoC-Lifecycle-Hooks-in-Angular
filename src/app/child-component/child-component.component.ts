import {
  AfterContentChecked,
  AfterContentInit,
  AfterViewChecked,
  AfterViewInit,
  Component,
  ContentChild,
  DoCheck,
  ElementRef,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import { Product } from './product';

@Component({
  selector: 'app-child-component',
  templateUrl: './child-component.component.html',
  styleUrls: ['./child-component.component.css'],
})
export class ChildComponentComponent
  implements
    OnInit,
    OnChanges,
    DoCheck,
    AfterContentInit,
    AfterContentChecked,
    AfterViewInit,
    AfterViewChecked,
    OnDestroy
{
  @Input() color = 'red';
  @Input() product: Product | undefined;
  @ContentChild('childContent') childContent: ElementRef | undefined;
  @ContentChild('secondChild') secondChild: ElementRef | undefined;
  @ViewChild('afterView') afterView: ElementRef | undefined;
  @ViewChild('afterViewChecked') afterViewChecked: ElementRef | undefined;

  constructor() {
    console.log('Here is the constructor!');
    console.log(this.color);
  }

  ngOnChanges(change: SimpleChanges) {
    console.log('Here is ngOnChanges!', change);
  }

  ngOnInit() {
    console.log('Here is ngOnInit!');
    console.log(this.color);
  }

  ngDoCheck() {
    console.log('Here is ngDoCheck!', this.product);
  }

  ngAfterContentInit() {
    console.log('Here is ngAfterContentInit!', this.childContent);
    this.childContent?.nativeElement.setAttribute('style', 'color: red');
  }

  ngAfterContentChecked() {
    console.log('Here is ngAfterContentChecked!');
    this.secondChild?.nativeElement.setAttribute(
      'style',
      `color: ${this.color}`
    );
  }

  ngAfterViewInit() {
    console.log('Here is ngAfterViewInit!', this.afterView);
    this.afterView?.nativeElement.setAttribute(
      'style',
      'background-color: red'
    );
  }

  ngAfterViewChecked() {
    console.log('Here is ngAfterViewChecked!');
    this.afterViewChecked?.nativeElement.setAttribute(
      'style',
      `background-color: ${this.color}`
    );
  }

  ngOnDestroy() {
    console.log('Here is ngOnDestroy!');
  }
}
