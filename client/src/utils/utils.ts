import { v4 } from "uuid";

export function isOverflown(element: HTMLElement): boolean {
    if (element === null) return false;
    return element.scrollHeight > element.clientHeight || element.scrollWidth > element.clientWidth;
}

export const randomBool = (function () {
    var a = new Uint8Array(1);
    return function () {
        crypto.getRandomValues(a);
        return a[0] > 127;
    };
})();

export const removeElement = <T>(arr: T[], value: T) => {
    var index = arr.indexOf(value);
    if (index > -1) {
      arr.splice(index, 1);
    }
    return arr;
}

export const uuidv4 = () => v4();