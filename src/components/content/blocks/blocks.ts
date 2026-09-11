import React from 'react';
import type { BlockRegistry } from './block.schema';

export const blockRegistry: BlockRegistry = {
  paragraph: {
    render: React.lazy(() => import('../blocks/paragraph/render')),
  },
  heading: {
    render: React.lazy(() => import('../blocks/heading/render')),
  },
  separator: {
    render: React.lazy(() => import('../blocks/separator/render')),
  },
  list: {
    render: React.lazy(() => import('../blocks/list/render')),
  },
  image: {
    render: React.lazy(() => import('../blocks/image/render')),
  },
  video: {
    render: React.lazy(() => import('../blocks/video/render')),
  },
  quote: {
    render: React.lazy(() => import('../blocks/quote/render')),
  },
  pullquote: {
    render: React.lazy(() => import('../blocks/pullquote/render')),
  },
  mediaText: {
    render: React.lazy(() => import('../blocks/media-text/render')),
  },
  gallery: {
    render: React.lazy(() => import('../blocks/gallery/render')),
  },
  button: {
    render: React.lazy(() => import('../blocks/button/render')),
  },
  code: {
    render: React.lazy(() => import('../blocks/code/render')),
  },
};
