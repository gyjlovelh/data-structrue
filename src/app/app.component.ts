import {Component, OnInit} from '@angular/core';
import {NormalBinaryTree} from '../../structrue/normal-binary-tree';
import {RedBlackTree} from '../../structrue/red-black-tree';
import {performance} from '../../performance/performance';
import {HashMap} from '../../structrue/hash-map';

@Component({
    selector: 'hs-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
    title = 'guanyj';
    text = 'text';
    constructor() {
        const arr = [];
        for (let i = 0; i < 1000; i++) {
            arr.push({
                $binaryId: this.getUUID(),
                name: `name${i}`
            });
        }

        console.log(this.initTree(arr));

        console.log(this.initRedBlackTree(arr));

        this.initHashTable(arr);


    }

    ngOnInit() {
        new MutationObserver(this.observer)
            .observe(document.querySelector('#abc'), {
                childList: true,
                attributes: true,
                characterData: true,
                characterDataOldValue: true,
                subtree: true
            });
    }

    observer(res) {
        console.log('observer', res);
    }


    getUUID(len: number = 36) {
        const uuid = [];
        const str = '0123456789abcdef';
        for (let i = 0; i < len; i++) {
            uuid[i] = str.substr(Math.floor(Math.random() * 0x10), 1);
        }
        if (len === 36) {
            uuid[14] = '4';
            uuid[19] = str.substr((uuid[19] & 0x3 | 0x8), 1)
            uuid[8] = uuid[13] = uuid[18] = uuid[23] = '-';
        }
        return uuid.join('').replace(/-/g, '');
    }

    @performance()
    initTree(arr) {
        return new NormalBinaryTree(arr);
    }

    @performance()
    initRedBlackTree(arr) {
         return new RedBlackTree(arr);
    }

    @performance()
    initHashTable(arr) {
        const map = new HashMap<string, any>();
        console.log('isEmpty', map.isEmpty());
        arr.forEach(item => {
            map.put(item.$binaryId, item);
        });

        // map.forEach((k, v) => {
        //     console.log('k-v', k, v);
        // });
        console.log('isEmpty', map.isEmpty());
        const keys = map.keys();
        const vlaues = map.values();
        const keys1 = map.keys();
        const vlaues1 = map.values();
        const keys2 = map.keys();
        const vlaues2 = map.values();
        map.remove('Guanyj');
        console.log(map.size());
        const demo = new Map<string, any>();
        demo.set('abcd', '21313');
        demo.set('dddd', '21313');
        demo.set('ccc', '21313');
        demo.set('rrrr', '21313');
        map.putAll(demo);
        console.log(map.size(), map.get('ccc'));
        map.clear();
        console.log(map.size(), map.isEmpty(), map.get('ccc'));
        return map;
    }


    async aa() {
        const result = await this.bb();
        console.log(result);
        return result;
    }

    async bb() {
        return new Promise(resolve => {
            setTimeout(() => {
                console.log('bb');
                resolve('guanyj');
            }, 1000);
        });
    }

}
