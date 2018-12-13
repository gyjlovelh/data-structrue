/**
 * Created by guanyj on  12/7/18
 */
import {LinkList} from './link-list';

export class HashMap<K, V> {

    private table: Array<LinkList<ValuePair<K, V>>> = [];

    constructor(map?: Map<K, V> | HashMap<K, V>) {
        if (map) {
            this.putAll(map);
        }
    }

    /**
     * Associates the specified value with the specified key in this map.
     * param {K} key
     * param {V} value
     */
    put(key: K, value: V): void {
        const position = this.hashCode(key);
        if (this.table[position] === undefined) {
            this.table[position] = new LinkList();
        }
        this.table[position].append(new ValuePair(key, value));
    }

    /**
     * Copies all of the mappings from the specified map to this map.
     * param {HashMap<k extends K, v extends V>} map
     */
    putAll<k extends K, v extends V>(map: Map<k, v> | HashMap<k, v>): void {
        if (map instanceof  Map) {
            map.forEach((value, key) => {
                this.put(key, value);
            });
        } else {
            map.forEach((key, value) => {
                this.put(key, value);
            });
        }
    }

    /**
     * Returns the value to which the specified key is mapped, or null if this map contains no mapping for the key.
     * param {K} key
     * returns {V}
     */
    get(key: K): V {
        const position = this.hashCode(key);
        if (this.table[position] !== undefined) {
            let current = this.table[position].getHead();

            while (current.next) {
                if (current.element.key === key) {
                    return current.element.value;
                }
                current = current.next;
            }

            if (current.element.key === key) {
                return current.element.value;
            }
        }
        return undefined;
    }

    /**
     * 删除指定项
     * param {string} key
     * returns {boolean}
     */
    remove(key: K): boolean {
        const position = this.hashCode(key);
        if (this.table[position] !== undefined) {
            let current = this.table[position].getHead();
            while (current.next) {
                if (current.element.key === key) {
                    this.table[position].remove(current.element);
                    if (this.table[position].isEmpty()) {
                        this.table[position] = undefined;
                    }
                    return true;
                }
                current = current.next;
            }
            // 检查第一个或者最后一个元素
            if (current.element.key === key) {
                this.table[position].remove(current.element);
                if (this.table[position].isEmpty()) {
                    this.table[position] = undefined;
                }
                return true;
            }
        }
        return false;
    }

    /**
     * Removes all of the mappings from this map.
     */
    clear(): void {
        this.table = [];
    }

    /**
     * Returns true if this map contains no key-value mappings.
     */
    isEmpty(): boolean {
        return this.size() === 0;
    }

    /**
     * Returns true if this map contains no key-value mappings.
     * returns {Array<K>}
     */
    keys(): Array<K> {
        const _temp = [];
        this.forEach(k => {
            _temp.push(k);
        });
        return _temp;
    }

    /**
     * Returns a Collection view of the values contained in this map.
     * returns {Array<V>}
     */
    values(): Array<V> {
        const _temp = [];
        this.forEach((k, v) => {
            _temp.push(v);
        });
        return _temp;
    }

    /**
     * Returns the number of key-value mappings in this map.
     * returns {number}
     */
    size(): number {
        let length = 0;
        this.table.forEach(item => {
            if (item !== undefined && item !== null) {
                length += item.size();
            }
        });
        return length;
    }

    /**
     * Performs the given action for each entry in this map until all entries
     * have been processed or the action throws an exception.
     * param {(key: K, value: V) => void} fn
     */
    forEach(fn: (key: K, value: V) => void): void {
        this.table.forEach(item => {
            const head = item.getHead();
            if (head) {
                let temp = head;
                while (temp) {
                    fn(temp.element.key, temp.element.value);
                    temp = temp.next;
                }
            }
        });
    }

    /**
     * 获取键值的 hash值
     * param {string} key
     * returns {number}
     */
    private hashCode(key: K): number {
        let hash = 5381;
        for (let i = 0; i < key.toString().length; i++) {
            hash = hash * 33 + key.toString().charCodeAt(i);
        }
        return hash % 1013;
    }

}

export class ValuePair<K, V> {
    constructor(
        public key: K,
        public value: V
    ) {}

    toString() {
        return `[${this.key}-${this.value}]`;
    }
}
