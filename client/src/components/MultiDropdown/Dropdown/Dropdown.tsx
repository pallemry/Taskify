import { MenuItem } from '../../../MenuItem';
import MultilevelMenu from '../MultilevelMenu/MultilevelMenu';

type Props = {
    depthLevel: number;
    submenus: MenuItem[];
    dropdown: boolean;
    optionSelected: any;
}

export function Dropdown({ submenus, dropdown, depthLevel, optionSelected }: Props) {
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
            optionSelected={optionSelected}
        />
        ))}
    </ul>
    );
}