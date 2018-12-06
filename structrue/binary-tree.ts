
/**
 * Created by guanyj on  12/6/18
 */

export abstract class BinaryTree<T> {

    root: BinaryTreeItem<T>;

    protected binaryKey: string;

    constructor(array: Array<T>, binaryKey: string) {
        this.binaryKey = binaryKey;
        array.forEach(item => {
            this.insert(item);
        });
    }

    /**
     * 插入节点
     * param {T} element
     */
    abstract insert(element: T): void;

    /**
     * 查找指定节点
     * param {string | number} binaryId
     * returns {T}
     */
    find(binaryId: string | number): T {
        let result = null;
        if (this.root) {
            (function _find(node: BinaryTreeItem<T>, key: string | number) {
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

    /**
     * 删除节点
     * param {string | number} binaryId
     * returns {T}
     */
    remove(binaryId: string | number): T {
        const that = this;
        const result = this.find(binaryId);
        (function _removeNode(node, value) {
            if (node === null) {
                return null;
            }
            if (value < node.value) {
                node.left = _removeNode(node.left, value);
                return node;
            } else if (value > node.value) {
                node.right = _removeNode(node.right, value);
                return node;
            } else {
                if (node.left === null && node.right === null) {
                    node = null;
                    return node;
                }
                if (node.left === null) {
                    node = node.right;
                    return node;
                } else if (node.right === null) {
                    node = node.left;
                    return node;
                }
                const aux = that.findMinNode(node.right);
                node.value  = aux.value;
                node.right = _removeNode(node.right, aux.value);
                return node;

            }
        })(this.root, binaryId);
        return result;
    }

    /**
     * 找到指定节点下的最小节点
     * param {BinaryTreeItem<T>} node
     * returns {BinaryTreeItem<T>}
     */
    findMinNode(node: BinaryTreeItem<T>) {
        if (!node) {
            node = this.root;
        }
        while (node && node.left !== null) {
            node = node.left;
        }
        return node;
    }
}

export class BinaryTreeItem<T> {
    value: string | number;
    element: T;
    parent: BinaryTreeItem<T>;
    left: BinaryTreeItem<T>;
    right: BinaryTreeItem<T>;

    constructor(value, element) {
        this.value = value;
        this.element = element;
        this.parent = null;
        this.left = null;
        this.right = null;
    }
}
