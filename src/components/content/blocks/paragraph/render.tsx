import blockStyles from '../block.module.css';
import { blockCustomClassesFormat } from '../block-utils';
import { sanitizeBlockContent } from '../block-sanitize';

import type { ParagraphContentBlock } from './schema';
import paragraphBlockStyles from './style.module.css';

export default function ParagraphBlockRender({ id, type, attributes }: ParagraphContentBlock) {
  const blockWidth = attributes?.width?.value ?? 'standard';
  const blockAlign = attributes?.align?.value ?? 'left';
  const blockAnchor = attributes?.anchor?.value ? { id: attributes.anchor.value } : {};
  const blockCustomClasses = attributes?.customClasses?.value
    ? blockCustomClassesFormat(attributes.customClasses.value)
    : '';

  const content = attributes?.content?.value;

  const paragraphBlockClass = paragraphBlockStyles['block-paragraph'];

  const blockClass = blockStyles.block;
  const blockClasses = (blockClass + ' ' + blockCustomClasses).trim() + ' ' + paragraphBlockClass;

  if (!content) return;

  const sanitizedContent = sanitizeBlockContent({ value: content });

  if (!sanitizedContent) return;

  return (
    <p
      {...blockAnchor}
      className={`block-paragraph ${blockClasses}`}
      data-block-id={id}
      data-block-type={type}
      data-block-width={blockWidth}
      data-block-align={blockAlign}
      dangerouslySetInnerHTML={{ __html: sanitizedContent }}
    />
  );
}
