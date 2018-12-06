import {Component} from '@angular/core';
import {NormalBinaryTree} from '../../structrue/normal-binary-tree';
import {RedBlackTree} from '../../structrue/red-black-tree';
import {performance} from '../../performance/performance';

@Component({
    selector: 'hs-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent {

    constructor() {
        const arr = [];
        for (let i = 0; i < 100000; i++) {
            arr.push({
                $binaryId: this.getUUID(),
                name: `name${i}`
            });
        }
        console.log(this.initTree(arr));

        console.log(this.initRedBlackTree(arr));
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

}
