export interface MenuItem {
    url?: string;
    className?: string;
    title: string;
    id: string | number;
    submenu?: MenuItem[];
}
