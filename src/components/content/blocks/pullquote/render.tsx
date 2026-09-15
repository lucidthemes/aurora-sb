import blockStyles from '../block.module.css';
import { blockCustomClassesFormat } from '../block-utils';
import { sanitizeBlockContent } from '../block-sanitize';

import type { PullquoteContentBlock } from './schema';
import pullquoteBlockStyles from './style.module.css';

export default function PullquoteBlockRender({ id, type, attributes }: PullquoteContentBlock) {
  const blockWidth = attributes?.width?.value ?? 'standard';
  const blockAlign = attributes?.align?.value ?? 'left';
  const blockAnchor = attributes?.anchor?.value ? { id: attributes.anchor.value } : {};
  const blockCustomClasses = attributes?.customClasses?.value
    ? blockCustomClassesFormat(attributes.customClasses.value)
    : '';

  const content = attributes?.content?.value;
  const cite = attributes?.cite?.value;

  const pullquoteBlockClass = pullquoteBlockStyles['block-pullquote'];

  const blockClass = blockStyles.block;
  const blockClasses = (blockClass + ' ' + blockCustomClasses).trim() + ' ' + pullquoteBlockClass;

  if (!content && !cite) return;

  const sanitizedContent = content ? sanitizeBlockContent({ value: content }) : undefined;
  const sanitizedCite = cite ? sanitizeBlockContent({ value: cite }) : undefined;

  if (!sanitizedContent && !sanitizedCite) return;

  return (
    <figure
      {...blockAnchor}
      className={`block-pullquote ${blockClasses}`}
      data-block-id={id}
      data-block-type={type}
      data-block-width={blockWidth}
      data-block-align={blockAlign}
    >
      <blockquote>
        {sanitizedContent && <p dangerouslySetInnerHTML={{ __html: sanitizedContent }} />}
        {sanitizedCite && <cite dangerouslySetInnerHTML={{ __html: sanitizedCite }} />}
      </blockquote>
    </figure>
  );
}
