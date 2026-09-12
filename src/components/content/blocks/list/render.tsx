import blockStyles from '../block.module.css';
import { blockCustomClassesFormat } from '../block-utils';
import { sanitizeBlockContent } from '../block-sanitize';

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
          const itemContentValue = item.content.value;

          if (!itemIdValue || !itemContentValue) return;

          const sanitizedContent = sanitizeBlockContent({ value: itemContentValue });

          if (!sanitizedContent) return;

          return (
            <li
              key={itemIdValue}
              data-block-list-item-id={itemIdValue}
              dangerouslySetInnerHTML={{ __html: sanitizedContent }}
            />
          );
        })}
    </ul>
  );
}
