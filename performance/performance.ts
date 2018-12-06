/**
 * Created by guanyj on  12/6/18
 */


export const performance = function () {
    return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
        const oldMethod = descriptor.value;
        descriptor.value = function (...arg) {
            const begin = Date.now(),
                result = oldMethod.apply(this, arg),
                end = Date.now();
            window.console.warn(`【${propertyKey}】函数执行完成共耗时：${end - begin}ms`);
            return result;
        };
    };
};
