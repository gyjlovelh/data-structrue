/**
 * Created by guanyj on  12/6/18
 */


export const performance = function () {
    return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
        const oldMethod = descriptor.value;
        descriptor.value = function (...arg) {
            const begin = Date.now();
            const result = oldMethod.apply(this, arg);
            const end = Date.now();
            console.log(`【${propertyKey}】方式执行完成耗时：${end - begin}ms`);
            return result;
        };
    };
};
