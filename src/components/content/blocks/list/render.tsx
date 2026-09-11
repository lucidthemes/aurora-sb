import blockStyles from '../block.module.css';
import { blockCustomClassesFormat } from '../block-utils';

import type { ListContentBlock } from './schema';
import listBlockStyles from './style.module.css';

export default function ListBlockRender({ id, type, attributes }: ListContentBlock) {
  const blockWidth = attributes?.width?.value ?? 'standard';
  const blockAlign = attributes?.align?.value ?? 'left';
  const blockAnchor = attributes?.anchor?.value ? { id: attributes.anchor.value } : {};
  const blockCustomClasses = attributes?.customClasses?.value
    ? blockCustomClassesFormat(attributes.customClasses.value)
    : '';

  const listStyle = attributes?.listStyle?.value ?? 'disc';

  const listBlockClass = listBlockStyles['block-list'];

  const blockClass = blockStyles.block;
  const blockClasses = (blockClass + ' ' + blockCustomClasses).trim() + ' ' + listBlockClass;

  return (
    <ul
      {...blockAnchor}
      className={`block-list ${blockClasses}`}
      data-block-id={id}
      data-block-type={type}
      data-block-width={blockWidth}
      data-block-align={blockAlign}
      data-block-list-style={listStyle}
    >
      {attributes?.list?.items &&
        attributes.list.items.map((item) => {
          const itemIdValue = item.id.value;

          if (!itemIdValue) return;

          return (
            <li key={itemIdValue} data-block-list-item-id={itemIdValue}>
              {item.content.value}
            </li>
          );
        })}
    </ul>
  );
}
