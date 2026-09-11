import blockStyles from '../block.module.css';
import { blockCustomClassesFormat } from '../block-utils';

import type { VideoContentBlock } from './schema';
import videoBlockStyles from './style.module.css';

export default function VideoBlockRender({ id, type, attributes }: VideoContentBlock) {
  const blockWidth = attributes?.width?.value ?? 'standard';
  const blockAlign = attributes?.align?.value ?? 'left';
  const blockAnchor = attributes?.anchor?.value ? { id: attributes.anchor.value } : {};
  const blockCustomClasses = attributes?.customClasses?.value
    ? blockCustomClassesFormat(attributes.customClasses.value)
    : '';

  const url = attributes?.url?.value;
  const size = attributes?.size?.value ?? 'original';
  const aspect = attributes?.aspect?.value ?? 'original';

  const videoBlockClass = videoBlockStyles['block-video'];
  const videoBlockWrapperClass = videoBlockStyles['block-video-wrapper'];

  const blockClass = blockStyles.block;
  const blockClasses = (blockClass + ' ' + blockCustomClasses).trim() + ' ' + videoBlockClass;

  if (!url) return;

  return (
    <div
      {...blockAnchor}
      className={`block-video ${blockClasses}`}
      data-block-id={id}
      data-block-type={type}
      data-block-width={blockWidth}
      data-block-align={blockAlign}
      data-block-size={size}
      data-block-aspect={aspect}
    >
      <div className={videoBlockWrapperClass}>
        <video controls={true}>
          <source src={url} type="video/mp4" />
        </video>
      </div>
    </div>
  );
}
