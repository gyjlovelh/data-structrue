/**
 * Created by guanyj on  12/6/18
 */
import {BinaryTree, BinaryTreeItem} from './binary-tree';

export class NormalBinaryTree<T> extends BinaryTree<T> {

    constructor(array: Array<T>, binaryKey: string = '$binaryId') {
        super(array, binaryKey);
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
        const item = new BinaryTreeItem<T>(element[this.binaryKey], element);
        if (this.root) {
            (function _insertNode(node: BinaryTreeItem<T>, newNode: BinaryTreeItem<T>) {
                if (node.value > newNode.value) {
                    if (node.left !== null) {
                        _insertNode(node.left, newNode);
                    } else {
                        node.left = newNode;
                        newNode.parent = node;
                    }
                } else {
                    if (node.right !== null) {
                        _insertNode(node.right, newNode);
                    } else {
                        node.right = newNode;
                        newNode.parent = node;
                    }
                }
            })(this.root, item);
        } else {
            this.root = item;
        }
    }
}


