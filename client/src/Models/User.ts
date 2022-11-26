import { FolderOrFile } from './../components/Pages/Explorer/Helper/ExpolerInterfaces';
export default interface User {
    email: string;
    password: string;
    rootFolder?: FolderOrFile[];
}