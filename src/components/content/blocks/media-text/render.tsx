import type { CSSProperties } from 'react';

import blockStyles from '../block.module.css';
import { blockCustomClassesFormat } from '../block-utils';

import type { MediaTextContentBlock } from './schema';
import mediaTextBlockStyles from './style.module.css';

export default function MediaTextBlockRender({ id, type, attributes }: MediaTextContentBlock) {
  const blockWidth = attributes?.width?.value ?? 'standard';
  const blockAlign = attributes?.align?.value ?? 'left';
  const blockAnchor = attributes?.anchor?.value ? { id: attributes.anchor.value } : {};
  const blockCustomClasses = attributes?.customClasses?.value
    ? blockCustomClassesFormat(attributes.customClasses.value)
    : '';

  const mediaType = attributes?.mediaType?.value;
  const mediaUrl = attributes?.mediaUrl?.value;
  const mediaAltText = attributes?.mediaAltText?.value;
  const mediaPosition = attributes?.mediaPosition?.value ?? 'left';
  const mediaWidth = attributes?.mediaWidth?.value ?? 50;
  const mediaSize = attributes?.mediaSize?.value ?? 'original';
  const mediaAspect = attributes?.mediaAspect?.value ?? 'original';
  const text = attributes?.text?.value ?? '';
  const textPosition = attributes?.textPosition?.value ?? 'center';

  const mediaTextBlockClass = mediaTextBlockStyles['block-media-text'];
  const mediaTextBlockMediaClass = mediaTextBlockStyles['block-media-text-media'];
  const mediaTextBlockMediaWrapperClass = mediaTextBlockStyles['block-media-text-media-wrapper'];
  const mediaTextBlockContentClass = mediaTextBlockStyles['block-media-text-content'];

  const blockClass = blockStyles.block;
  const blockClasses = (blockClass + ' ' + blockCustomClasses).trim() + ' ' + mediaTextBlockClass;

  return (
    <div
      {...blockAnchor}
      className={`block-media-text ${blockClasses}`}
      data-block-id={id}
      data-block-type={type}
      data-block-width={blockWidth}
      data-block-align={blockAlign}
      data-block-media-position={mediaPosition}
      data-block-media-width={mediaWidth}
      data-block-media-size={mediaSize}
      data-block-media-aspect={mediaAspect}
      data-block-text-position={textPosition}
      style={{ '--media-width': `${mediaWidth}%` } as CSSProperties}
    >
      <div className={mediaTextBlockMediaClass}>
        {mediaType && mediaUrl && (
          <>
            {mediaType === 'image' ? (
              <figure>
                <div className={mediaTextBlockMediaWrapperClass}>
                  <img src={mediaUrl} alt={mediaAltText ?? ''} />
                </div>
              </figure>
            ) : (
              <div className={mediaTextBlockMediaWrapperClass}>
                <video controls={true} onClick={(e) => e.preventDefault()}>
                  <source src={mediaUrl} type="video/mp4" />
                </video>
              </div>
            )}
          </>
        )}
      </div>
      <div className={mediaTextBlockContentClass}>
        <p>{text}</p>
      </div>
    </div>
  );
}
