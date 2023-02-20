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

export function getHeightBetweenNavbarAndScreenBottom(bottomOffset: number = 0, defaultValue: number = 0) {
    try {
        const navbar = document.querySelector('.navbar') as HTMLElement;
        const bottom = navbar.getBoundingClientRect().bottom;
        const height = (window.innerHeight - bottom) - bottomOffset;
        const newHeight = Math.max(height, defaultValue);
        return newHeight;
    }
    catch { return defaultValue; }
}

/**
 * checks whether a string contains an upper case letter
 * @param str the string to check
 * @returns whether the string contains an upper case letter
 */
export function checkUppercase(str: string): boolean {
    for (var i=0; i<str.length; i++){
      if (str.charAt(i) === str.charAt(i).toUpperCase() && str.charAt(i).match(/[a-z]/i)){
        return true;
      }
    }
    return false;
};

export function checkLowercase(str: string): boolean {
    for (var i=0; i<str.length; i++){
      if (str.charAt(i) === str.charAt(i).toLowerCase() && str.charAt(i).match(/[A-Z]/i)){
        return true;
      }
    }
    return false;
};

export function checkNumber(str: string): boolean {
    for (var i=0; i<str.length; i++){
      if (str.charAt(i).match(/[0-9]/i)){
        return true;
      }
    }
    return false;
};

export const uuidv4 = () => v4();

export const PreventDefault = (e: {
  preventDefault: () => void;
}) => e.preventDefault();