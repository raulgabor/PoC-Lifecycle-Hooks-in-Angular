# PoC - Lifecycle Hooks in Angular
Angular is a well-known front-end framework for developing websites and applications. It has a powerful set of tools for developing reusable and maintainable components. 
The notion of lifecycle hooks is one of these tools.

Lifecycle hooks are methods that Angular calls at specific times in a component's lifetime. 
When a component is created, changed, or removed, you may use these hooks to do particular actions.

## Lifecycle Hooks

In Angular there are 8 lifecycle hooks that are used in a component and those are:
1. `ngOnInit()` - After the first ngOnChanges.
2. `ngOnChanges()` - When an input/output binding value changes.
3. `ngDoCheck()` - Developer's custom change detection.
4. `ngAfterContentInit()` - After component content initialized.
5. `ngAfterContentChecked()` - After every check of component content.
6. `ngAfterViewInit()` - After a component's views are initialized.
7. `ngAfterViewChecked()` - After every check of a component's views.
8. `ngOnDestroy()` - Just before the component/directive is destroyed.

Each one will be presented in more detail in this PoC.

## constructor vs ngOnInit
Both the `constructor` and `ngOnInit()` lifecycle hooks are called during a component's creation, but they serve different purposes.

The constructor is called first, before any other lifecycle hooks or Angular-specific functionality is executed. Its primary role is to initialize a component's properties and to inject any necessary dependencies.

The ngOnInit() hook, on the other hand, is called after Angular has initialized a component's properties and injected its dependencies. Its primary role is to perform initialization tasks that depend on the component's input properties.

## ngOnInit
After the component has been constructed and its inputs have been initialized, the `ngOnInit()` hook is invoked. This hook is frequently used to do additional startup activities, such as retrieving data from a backend service.

```
ngOnInit() {
    console.log('Here is ngOnInit!');
    console.log(this.color);
  }
```

## ngOnChanges
When the input properties of a component change, the `ngOnChanges()` hook is called. This hook is often used to respond to changes in input values and update the state of the component as a result.

```
ngOnChanges(change: SimpleChanges) {
    console.log('Here is ngOnChanges!', change);
  }
```

ngOnChanges is the only lifecycle hook that takes an argument as an input and that parameter is of type SimpleChanges in order to see values for previous value, current value and whether it's the first change or not. The changes can be seen only if we have variables with the `@Input()` decorator declared. It is worth noted that ngOnChanges is called only when a change in the view has been made, such as the change of the color, but it is not triggered if the change has the same value as the previous one. 
 
 ```
 @Input() color = 'red';
 @Input() product: Product | undefined;
 ```

## ngDoCheck
Every change detection cycle, the `ngDoCheck()` hook is called, allowing you to implement custom change detection logic. That means that every event or change in the view can trigger this hook, no matter if the previous value or event has or hasn't changed anything in the view or in background (e.g. a call to an endpoint).

```
ngDoCheck() {
  console.log('Here is ngDoCheck!', this.product);
}
```

The difference between this and onChanges is that ngOnChanges is checking the references for arrays and objects, meaning that even if we do change a property of an object, ngOnChanges will not detect it. That's why we might want to use ngDoCheck. In such scenario where Angular fails to detect the changes to the input property, the ngDoCheck allows us to implement our custom change detection.

## ngAfterContentInit
After Angular projects external material into a component's view, the `ngAfterContentInit()` hook is called. This hook is often used to execute startup operations that are dependent on the anticipated content of the component. AfterContentInit and AfterContentChecked are hooks that deal with content.
Content refers to the external content injected into this component using the Content Projection.
Content projection is a way to pass the HTML content from the parent component to the child component. The child component will display the template in a designated spot. We use the `<ng-content></ng-content>` element to create a spot in the template of the child component.

```
ngAfterContentInit() {
  console.log('Here is ngAfterContentInit!', this.childContent);
  this.childContent?.nativeElement.setAttribute('style', 'color: red');
}
```

So, I have put a reference to the content child in the parent component `<h4 #childContent>This is a test for ngAfterContentInit!</h4>`, using #childContent, and in the child component I access it with ContentChild decorator: `@ContentChild('childContent') childContent: ElementRef | undefined;`.

## ngAfterContentChecked
The `ngAfterContentChecked()` hook is invoked when Angular checks the projected content of a component for changes. This hook is often used to implement custom change detection logic based on the projected content of the component. ngAfterContentChecked is the lifecycle hook that Angular calls during every change detection cycle after Angular completed the checking of the content for the changes, and this hook fire after ngDoCheck and ngAfterContentInit.

```
ngAfterContentChecked() {
    console.log('Here is ngAfterContentChecked!');
    this.secondChild?.nativeElement.setAttribute(
      'style',
      `color: ${this.color}`
    );
  }
```

## ngAfterViewInit
After a component's view is initialized, the `ngAfterViewInit()` hook is invoked. This hook is often used to execute component-specific startup operations. AfterViewInit and AfterViewChecked are hooks that deal with views.


## ngAfterViewChecked
After Angular examines a component's view for changes, the `ngAfterViewChecked()` hook is invoked. This hook is often used to conduct custom change detection logic that is dependent on the view of the component.

## ngOnDestroy
When a component is destroyed, the `ngOnDestroy()` hook is invoked. This hook is often used for cleaning operations like unsubscribing from observables and removing event listeners.
