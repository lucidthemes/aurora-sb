import blockStyles from '../block.module.css';
import { blockCustomClassesFormat } from '../block-utils';

import type { CodeContentBlock } from './schema';
import codeBlockStyles from './style.module.css';

export default function CodeBlockRender({ id, type, attributes }: CodeContentBlock) {
  const blockWidth = attributes?.width?.value ?? 'standard';
  const blockAnchor = attributes?.anchor?.value ? { id: attributes.anchor.value } : {};
  const blockCustomClasses = attributes?.customClasses?.value
    ? blockCustomClassesFormat(attributes.customClasses.value)
    : '';

  const content = attributes?.content?.value ?? '';

  const codeBlockClass = codeBlockStyles['block-code'];

  const blockClass = blockStyles.block;
  const blockClasses = (blockClass + ' ' + blockCustomClasses).trim() + ' ' + codeBlockClass;

  if (!content) return;

  return (
    <pre
      {...blockAnchor}
      className={`block-code ${blockClasses}`}
      data-block-id={id}
      data-block-type={type}
      data-block-width={blockWidth}
    >
      <code>{content}</code>
    </pre>
  );
}
