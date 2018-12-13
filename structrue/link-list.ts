/**
 * Created by guanyj on  12/7/18
 */

export class LinkList<T> {
    private length: number;
    private head: LinkNode<T>;

    constructor() {
        this.length = 0;
        this.head = null;
    }

    /**
     * 追加元素
     * param {T} element
     */
    append(element: T): void {
        let el = new LinkNode(element), current;
        if (!this.head) {
            this.head = el;
        } else {
            current = this.head;
            while (current.next) {
                current = current.next;
            }
            current.next = el;
        }
        this.length++;
    }

    /**
     * 在指定位置插入元素
     * param {number} position
     * param {T} element
     * returns {boolean}
     */
    insert(position: number, element: T): boolean {
        if (position > -1 && position <= this.length) {
            let el = new LinkNode(element),
                current = this.head,
                previous,
                index = 0;
            if (position === 0) {
                el.next = current;
                this.head = el;
            } else {
                while (index++ < position) {
                    previous = current;
                    current = current.next;
                }
                el.next = current;
                previous.next = el;
            }
            this.length++;
            return true;
        } else {
            return false;
        }
    }

    /**
     * 删除指定位置的元素
     * param {number} position
     * returns {T}
     */
    removeAt(position: number): T {
        if (position > -1 && position < this.length) {
            let current = this.head, previous, index = 0;
            if (position === 0) {
                this.head = current.next;
            } else {
                while (index++ < position) {
                    previous = current;
                    current = current.next;
                }
                previous.next = current.next;
            }
            this.length--;
            return current.element;
        } else {
            return null;
        }
    }

    /**
     * 删除指定元素
     * param {T} element
     * returns {T}
     */
    remove(element: T) {
        return this.removeAt(this.indexOf(element));
    }

    /**
     * 获取元素的位置
     * param {T} element
     * returns {number}
     */
    indexOf(element: T): number {
        let current = this.head, index = 0;
        while (current) {
            if (element === current.element) {
                return index;
            }
            index++;
            current = current.next;
        }
        return -1;
    }

    /**
     * 是否为空列表
     * returns {boolean}
     */
    isEmpty(): boolean {
        return this.length === 0;
    }

    /**
     * 列表的长度
     * returns {number}
     */
    size(): number {
        return this.length;
    }

    /**
     * 获取第一个元素
     * returns {LinkNode<T>}
     */
    getHead(): LinkNode<T> {
        return this.head;
    }

    /**
     * 重写toString
     * returns {string}
     */
    toString(): string {
        let current = this.head, string = '';
        while (current) {
            string += `${current.element}${current.next ? 'n' : ''}`;
            current = current.next;
        }
        return string;
    }


}


export class LinkNode<T> {
    element: T;
    next: LinkNode<T>;

    constructor(element: T) {
        this.element = element;
        this.next = null;
    }
}
