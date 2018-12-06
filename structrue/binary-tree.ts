/**
 * Created by guanyj on  12/6/18
 */

export class BinaryTree<T> {

    /**
     * 二叉树根元素
     */
    private root: BinaryTreeItem;

    constructor(
        public array: Array<T>,
        public binaryKey: string = '$binaryId'
    ) {
        array.forEach(item => {
            this.insert(item);
        });
    }

    /**
     * insert into binaryTree normally
     *
     * i:Having all the properties of a two - fork sort tree;
     * ii:the absolute value of the depth difference between the left subtree and the right subtree is not more than 1.
     * iii:the left and right subtrees are both the two fork balance trees.
     *
     * param element
     */
    insert(element: T): void {
        const item = new BinaryTreeItem(element[this.binaryKey], element);
        if (this.root) {
            (function _insertNode(node: BinaryTreeItem, newNode: BinaryTreeItem) {
                if (node.value > newNode.value) {
                    if (node.left !== null) {
                        _insertNode(node.left, newNode);
                    } else {
                        node.left = newNode;
                    }
                } else {
                    if (node.right !== null) {
                        _insertNode(node.right, newNode);
                    } else {
                        node.right = newNode;
                    }
                }
            })(this.root, item);
        } else {
            this.root = item;
        }
    }

    /**
     * 查找指定节点
     * param {string | number} binaryId
     * returns {T}
     */
    find(binaryId: string | number): T {
        let result = null;
        if (this.root) {
            (function _find(node: BinaryTreeItem, key: string | number) {
                if (node.value === key) {
                    result = node.element;
                } else if (node.value > key) {
                    if (node.left !== null) {
                        _find(node.left, key);
                    }
                } else if (node.value < key) {
                    if (node.right !== null) {
                        _find(node.right, key);
                    }
                } else {
                    result = null;
                }
            })(this.root, binaryId);
        }
        return result;
    }
}

export class BinaryTreeItem {
    value: string;
    element: any;
    left: BinaryTreeItem;
    right: BinaryTreeItem;

    constructor(value, element) {
        this.value = value;
        this.element = element;
        this.left = null;
        this.right = null;
    }
}

