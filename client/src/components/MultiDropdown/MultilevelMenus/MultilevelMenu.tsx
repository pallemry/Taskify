import React from 'react'
import { MenuItem } from '../../../MenuItem'
import { uuidv4 } from '../../../utils/utils'
import MultilevelMenu from '../MultilevelMenu/MultilevelMenu'

type Props = {
    items?: readonly MenuItem[]
    itemSelected?: (item: MenuItem) => void;
}

export default function MultilevelMenus({items, itemSelected}: Props) {
  return (
    <nav className="menus-wrapper">
      <ul className="menus">
        {items?.map((menu, index) => {
          const depthLevel = 0;
          return (
            <MultilevelMenu
              items={menu}
              key={index}
              optionSelected={itemSelected}
              depthLevel={depthLevel}
            />
          );
        })}
      </ul>
    </nav>
  )
}