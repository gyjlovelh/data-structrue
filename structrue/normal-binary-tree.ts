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
            let temp = this.root;
            while (temp[this.insertPosition(temp, item)] !== null) {
                temp = temp[this.insertPosition(temp, item)];
            }
            temp[this.insertPosition(temp, item)] = item;
            item.parent = temp;
        } else {
            this.root = item;
        }
    }

    private insertPosition(target: any, source: any) {
        return target.value > source.value ? 'left' : 'right';
    }
}


