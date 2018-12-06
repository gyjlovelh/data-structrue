import {Component} from '@angular/core';
import {BinaryTree} from '../../structrue/binary-tree';

@Component({
    selector: 'hs-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent {
    title = 'data-structure';

    constructor() {
        const arr = [];
        for (let i = 0; i < 1000; i++) {
            arr.push({
                id: this.getUUID(),
                name: `name${i}`
            });
        }

        const bi = new BinaryTree(arr, 'id');
        console.log('BinaryTree:', bi);
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
