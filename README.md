## performance 测试函数执行耗时

#### 用法
```typescript
export class Test {
    
    constructor() {
        this.run1();
    }
    
    @performance()
    run1() {
        ...
    }
    
    @performance()
    run2() {
        ...
    }
}

>>> console <<<
->【run1】函数执行完成共耗时：123ms
->【run2】函数执行完成共耗时：345ms

```
