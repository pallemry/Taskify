import { MenuItem } from '../../../MenuItem';
import MultilevelMenu from '../MultilevelMenu/MultilevelMenu';

type Props = {
    depthLevel: number;
    submenus: MenuItem[];
    dropdown: boolean;
}

export function Dropdown({ submenus, dropdown, depthLevel }: Props) {
    depthLevel = depthLevel + 1;
    const dropdownClass = depthLevel > 1 ? 'dropdown-submenu' : '';
    return (
    <ul
        className={`dropdown ${dropdownClass} ${
        dropdown ? 'show' : ''
        }`}
    >
        {submenus.map((submenu, index) => (
        <MultilevelMenu
            items={submenu}
            key={index}
            depthLevel={depthLevel}
        />
        ))}
    </ul>
    );
}