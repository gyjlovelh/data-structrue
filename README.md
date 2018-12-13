## data-structure 提供树、链表、集合、字典等数据结构。

### 树：
```
BinaryTree: 二叉树顶层抽象类。 
NormalBinaryTree: 普通二叉树。
RedBlackTree：红黑树【自平衡树】。

```
#### 用法
```typescript

const array: Array<{
    bId: string, 
    name: string,
    title: string,
    ...
}>;

const nBinaryTree = new NormalBinaryTree(array, 'bId');
nBinaryTree.find('xxx');
nBinaryTree.remove('xxx')

const rbTree = new RedBlackTree(array, 'bId');
rbTree.find('xxx');
rbTree.remove('xxx')

```
