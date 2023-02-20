import { MenuItem } from "./MenuItem";

const config = Object.freeze({
    url: 'http://localhost:3000',
    api: 'http://localhost:8000',
    maxPasswordLength: 8,
    DEV: true,
    defaultFileContents: '// You are using taskify!\nconsole.log("Hello world");',
    defaultText: `function mergeSort(array: number[]): number[] {
        if (array.length <= 1) {
          return array;
        }
      
        const middle = Math.floor(array.length / 2);
        const left = array.slice(0, middle);
        const right = array.slice(middle);
      
        return merge(mergeSort(left), mergeSort(right));
      }
      
      function merge(left: number[], right: number[]): number[] {
        const result: number[] = [];
      
        let leftIndex = 0;
        let rightIndex = 0;
      
        while (leftIndex < left.length && rightIndex < right.length) {
          if (left[leftIndex] < right[rightIndex]) {
            result.push(left[leftIndex]);
            leftIndex++;
          } else {
            result.push(right[rightIndex]);
            rightIndex++;
          }
        }
      
        return result.concat(left.slice(leftIndex)).concat(right.slice(rightIndex));
      }
      const unsortedArray = [6, 3, 9, 5, 2, 8, 7, 1, 4];
      const sortedArray = mergeSort(unsortedArray);
      console.log(sortedArray); // Output: [1, 2, 3, 4, 5, 6, 7, 8, 9]
      `

});

export const menuItems = Object.freeze<MenuItem[]>([
    {
        title: 'File',
        id: 1,
        submenu: [{
            title: 'Save',
            id: 11
        }, {
            title: 'Download',
            id: 12
        }, {
            title: 'Import',
            id: 13
        }]
    }, {
        title: 'Run',
        id: 2
    }
])

export default config;