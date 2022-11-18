import { MenuItem } from "./MenuItem";

const config = Object.freeze({
    url: 'http://localhost:3000',
    api: 'http://localhost:8000',
    maxPasswordLength: 8,
    DEV: true,
    defaultFileContents: '// You are using taskify!\nconsole.log("Hello world");'

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