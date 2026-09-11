import { Link } from 'react-router-dom';

import blockStyles from '../block.module.css';
import { blockCustomClassesFormat } from '../block-utils';

import type { ButtonContentBlock } from './schema';
import buttonBlockStyles from './style.module.css';

export default function ButtonBlockRender({ id, type, attributes }: ButtonContentBlock) {
  const blockWidth = attributes?.width?.value ?? 'standard';
  const blockAlign = attributes?.align?.value ?? 'left';
  const blockAnchor = attributes?.anchor?.value ? { id: attributes.anchor.value } : {};
  const blockCustomClasses = attributes?.customClasses?.value
    ? blockCustomClassesFormat(attributes.customClasses.value)
    : '';

  const link = attributes?.link?.value ?? '';
  const newTab = attributes?.newTab?.value === true ? '_blank' : '_self';
  const text = attributes?.text?.value ?? '';

  const buttonBlockClass = buttonBlockStyles['block-button'];
  const buttonBlockLinkClass = buttonBlockStyles['block-button-link'];

  const blockClass = blockStyles.block;
  const blockClasses = (blockClass + ' ' + blockCustomClasses).trim() + ' ' + buttonBlockClass;

  return (
    <div
      {...blockAnchor}
      className={`block-button ${blockClasses}`}
      data-block-id={id}
      data-block-type={type}
      data-block-width={blockWidth}
      data-block-align={blockAlign}
    >
      <Link className={buttonBlockLinkClass} to={link} target={newTab}>
        <span>{text}</span>
      </Link>
    </div>
  );
}
