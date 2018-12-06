import {Component} from '@angular/core';
import {NormalBinaryTree} from '../../structrue/normal-binary-tree';
import {RedBlackTree} from '../../structrue/red-black-tree';

@Component({
    selector: 'hs-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent {

    constructor() {
        const arr = [];
        for (let i = 0; i < 5; i++) {
            arr.push({
                $binaryId: this.getUUID(),
                name: `name${i}`
            });
        }

        const bi = new NormalBinaryTree(arr);
        const rbt = new RedBlackTree(arr);
        console.log('BinaryTree:', bi, rbt);

        console.log(bi.find(arr[2].$binaryId));
        console.log(rbt.find(arr[2].$binaryId));

        console.log('remove', bi.remove(arr[3].$binaryId));
        console.log('remove', rbt.remove(arr[4].$binaryId));

        console.log('BinaryTree:', bi, rbt);

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
}
