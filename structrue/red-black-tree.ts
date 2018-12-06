/**
 * Created by guanyj on  12/6/18
 */
import {BinaryTree, BinaryTreeItem} from './binary-tree';

export class RedBlackTree<T> extends BinaryTree<T> {
    root: RedBlackNode<T>;

    constructor(array: Array<T>, binaryKey: string = '$binaryId') {
        super(array, binaryKey);
    }

    insert(element: T) {
        const node = new RedBlackNode<T>(element[this.binaryKey], element);
        if (this.root) {
            let temp = this.root;
            while (node.value <= temp.value ? temp.left : temp.right) {
                temp = node.value <= temp.value ? temp.left : temp.right;
            }
            temp[node.value <= temp.value ? 'left' : 'right'] = node;
            node.parent = temp;
        } else {
            this.root = node;
        }
        this.fix(node);
    }

    private fix(node: RedBlackNode<T>) {
        // 当node.parent不存在时，即为情形1，跳出循环
        // 当node.parent.color === ColorType.BLACK时，即为情形2，跳出循环
        while (node.parent && node.parent.color !== ColorType.BLACK) {
            // 情形3
            let father = node.parent;
            let grand = father.parent;
            let uncle = grand[grand.left === father ? 'right' : 'left'];
            if (!uncle || uncle.color === ColorType.BLACK) {
                // 叶结点也是黑色的
                // 情形3.1
                let directionFromFatherToNode = father.left === node ? 'left' : 'right';
                let directionFromGrandToFather = grand.left === father ? 'left' : 'right';
                if (directionFromFatherToNode === directionFromGrandToFather) {
                    // 具体情形一或二
                    // 旋转
                    this.rotate(father);
                    // 变色
                    father.color = ColorType.BLACK;
                    grand.color = ColorType.RED;
                } else {
                    // 具体情形三或四
                    // 旋转
                    this.rotate(node);
                    this.rotate(node);
                    // 变色
                    node.color = ColorType.BLACK;
                    grand.color = ColorType.RED;
                }
                break; // 完成插入，跳出循环
            } else {
                // 情形3.2
                // 变色
                grand.color = ColorType.RED;
                father.color = ColorType.BLACK;
                uncle.color = ColorType.BLACK;
                // 将grand设为新的node
                node = grand;
            }
        }
        if (!node.parent) {
            // 如果是情形1
            node.color = ColorType.BLACK;
            this.root = node;
        }
    }

    private rotate(node: RedBlackNode<T>) {
        const y = node.parent;
        if (y.right === node) {
            if (y.parent) {
                y.parent[y.parent.left === y ? 'left' : 'right'] = node;
            }
            node.parent = y.parent;
            if (node.left) {
                node.left.parent = y;
            }
            y.right = node.left;
            node.left = y;
            y.parent = node;
        } else {
            if (y.parent) {
                y.parent[y.parent.left === y ? 'left' : 'right'] = node;
            }
            node.parent = y.parent;
            if (node.right) {
                node.right.parent = y;
            }
            y.left = node.right;
            node.right = y;
            y.parent = node;
        }
    }
}

class RedBlackNode<T> extends BinaryTreeItem<T> {
    color: ColorType;
    parent: RedBlackNode<T>;
    left: RedBlackNode<T>;
    right: RedBlackNode<T>;

    constructor(value: string | number, element: T) {
        super(value, element);
        this.color = ColorType.RED;
    }
}

enum ColorType {
    RED = 'red',
    BLACK = 'black'
}
