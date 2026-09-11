import blockStyles from '../block.module.css';
import { blockCustomClassesFormat } from '../block-utils';

import type { GalleryContentBlock } from './schema';
import galleryBlockStyles from './style.module.css';

export default function ImageBlockRender({ id, type, attributes }: GalleryContentBlock) {
  const blockWidth = attributes?.width?.value ?? 'standard';
  const blockAnchor = attributes?.anchor?.value ? { id: attributes.anchor.value } : {};
  const blockCustomClasses = attributes?.customClasses?.value
    ? blockCustomClassesFormat(attributes.customClasses.value)
    : '';

  const images = attributes?.images?.items;
  const columns = attributes?.columns?.value;

  const blockColumns =
    images && columns && images.length >= columns
      ? columns
      : images && columns && images.length <= columns
        ? images.length
        : 2;

  const galleryBlockClass = galleryBlockStyles['block-gallery'];
  const galleryBlockGridClass = galleryBlockStyles['block-gallery-grid'];
  const galleryBlockGridItemClass = galleryBlockStyles['block-gallery-grid-item'];

  const blockClass = blockStyles.block;
  const blockClasses = (blockClass + ' ' + blockCustomClasses).trim() + ' ' + galleryBlockClass;

  if (!images || images.length === 0) return;

  return (
    <div
      {...blockAnchor}
      className={`block-gallery ${blockClasses}`}
      data-block-id={id}
      data-block-type={type}
      data-block-width={blockWidth}
      data-block-columns={blockColumns}
    >
      <div className={galleryBlockGridClass}>
        {images.map((image) => (
          <figure key={image.id.value} className={galleryBlockGridItemClass}>
            <img src={image.url.value} alt={image.altText?.value ?? ''} />
          </figure>
        ))}
      </div>
    </div>
  );
}
