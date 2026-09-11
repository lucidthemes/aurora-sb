import blockStyles from '../block.module.css';
import { blockCustomClassesFormat } from '../block-utils';

import type { ImageContentBlock } from './schema';
import imageBlockStyles from './style.module.css';

export default function ImageBlockRender({ id, type, attributes }: ImageContentBlock) {
  const blockWidth = attributes?.width?.value ?? 'standard';
  const blockAlign = attributes?.align?.value ?? 'left';
  const blockAnchor = attributes?.anchor?.value ? { id: attributes.anchor.value } : {};
  const blockCustomClasses = attributes?.customClasses?.value
    ? blockCustomClassesFormat(attributes.customClasses.value)
    : '';

  const url = attributes?.url?.value;
  const altText = attributes?.altText?.value;
  const size = attributes?.size?.value ?? 'original';
  const aspect = attributes?.aspect?.value ?? 'original';
  const caption = attributes?.caption?.value ?? '';

  const imageBlockClass = imageBlockStyles['block-image'];
  const imageBlockWrapperClass = imageBlockStyles['block-image-wrapper'];

  const blockClass = blockStyles.block;
  const blockClasses = (blockClass + ' ' + blockCustomClasses).trim() + ' ' + imageBlockClass;

  if (!url) return;

  return (
    <div
      {...blockAnchor}
      className={`block-image ${blockClasses}`}
      data-block-id={id}
      data-block-type={type}
      data-block-width={blockWidth}
      data-block-align={blockAlign}
      data-block-size={size}
      data-block-aspect={aspect}
    >
      <figure>
        <div className={imageBlockWrapperClass}>
          <img src={url} alt={altText ?? ''} />
        </div>
        {caption && <figcaption>{caption}</figcaption>}
      </figure>
    </div>
  );
}
