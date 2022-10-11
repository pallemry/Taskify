import { MenuItem } from "./MenuItem";

export const config = Object.freeze({
    url: 'http://localhost:3000',
    maxPasswordLength: 8
});

export const menuItems = Object.freeze<MenuItem>([
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