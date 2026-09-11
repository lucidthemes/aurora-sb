import blockStyles from '../block.module.css';
import { blockCustomClassesFormat } from '../block-utils';

import type { QuoteContentBlock } from './schema';
import quoteBlockStyles from './style.module.css';

export default function QuoteBlockRender({ id, type, attributes }: QuoteContentBlock) {
  const blockWidth = attributes?.width?.value ?? 'standard';
  const blockAlign = attributes?.align?.value ?? 'left';
  const blockAnchor = attributes?.anchor?.value ? { id: attributes.anchor.value } : {};
  const blockCustomClasses = attributes?.customClasses?.value
    ? blockCustomClassesFormat(attributes.customClasses.value)
    : '';

  const content = attributes?.content?.value;
  const cite = attributes?.cite?.value;

  const quoteBlockClass = quoteBlockStyles['block-quote'];

  const blockClass = blockStyles.block;
  const blockClasses = (blockClass + ' ' + blockCustomClasses).trim() + ' ' + quoteBlockClass;

  if (!content && !cite) return;

  return (
    <blockquote
      {...blockAnchor}
      className={`block-quote ${blockClasses}`}
      data-block-id={id}
      data-block-type={type}
      data-block-width={blockWidth}
      data-block-align={blockAlign}
    >
      <p>{content}</p>
      <cite>{cite}</cite>
    </blockquote>
  );
}
