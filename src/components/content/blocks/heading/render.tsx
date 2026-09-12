import blockStyles from '../block.module.css';
import { blockCustomClassesFormat } from '../block-utils';
import { sanitizeBlockContent } from '../block-sanitize';

import type { HeadingContentBlock } from './schema';
import headingBlockStyles from './style.module.css';

export default function HeadingBlockRender({ id, type, attributes }: HeadingContentBlock) {
  const blockWidth = attributes?.width?.value ?? 'standard';
  const blockAlign = attributes?.align?.value ?? 'left';
  const blockAnchor = attributes?.anchor?.value ? { id: attributes.anchor.value } : {};
  const blockCustomClasses = attributes?.customClasses?.value
    ? blockCustomClassesFormat(attributes.customClasses.value)
    : '';

  const content = attributes?.content?.value ?? '';

  const HeadingBlockTag = `h${attributes?.level?.value || 2}` as 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';

  const headingBlockClass = headingBlockStyles['block-heading'];

  const blockClass = blockStyles.block;
  const blockClasses = (blockClass + ' ' + blockCustomClasses).trim() + ' ' + headingBlockClass;

  if (!content) return;

  const sanitizedContent = sanitizeBlockContent({ value: content });

  if (!sanitizedContent) return;

  return (
    <HeadingBlockTag
      {...blockAnchor}
      className={`block-heading ${blockClasses}`}
      data-block-id={id}
      data-block-type={type}
      data-block-width={blockWidth}
      data-block-align={blockAlign}
      dangerouslySetInnerHTML={{ __html: sanitizedContent }}
    />
  );
}
