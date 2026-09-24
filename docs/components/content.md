# Content

## Overview

The content folder contains the content blocks component used to display the single page and single post content blocks

## Blocks

### Block structure

Each of the blocks contains the following:

- **render** - the render function is what outputs the block with the editor. This constructs the HTML for each block and adds relevant data attributes
- **schema** - used to define the Zod schema for the block and create the types required for the block
- **style.module** - the styles for the block which are used when rendering the block

### Block registry

The block registry serves as a single place to work with a specific block. The registry contains each block and within each block is the following property:

- **render** - used to render that specific block by importing its render component file

### Block rendering

The content blocks fetched for the single page or single post are passed to the content component to be rendered. These blocks are then looped through and the type of the block used to determine the render template required to render it.

An example of how the render template is selected for a block with the type of paragraph:

```typescript
case 'paragraph': {
    const BlockTemplate = blockRegistry.paragraph.render;

    return <BlockTemplate {...block} />;
}
```

### List of blocks

The list of content blocks includes:

- **Button** - displays a button
- **Code** - displays a styled snippet
- **Gallery** - displays a gallery of images
- **Heading** - displays a heading
- **Image** - displays an image
- **List** - displays a list of text
- **Media & Text** - displays an image or video with text alongside it
- **Paragraph** - displays a paragraph of text
- **Pullquote** - displays a pullquote with a quote and a cite
- **Quote** - displays a quote and a cite
- **Separator** - displays a horizontal line break
- **Video** - displays a video

#### Example block

An example of a how a block is structured in JSON within the content blocks array. Each block includes the block id, type, and attributes:

```json
{
  "id": "1ac09c26-780d-4403-a925-6a1d415bab95",
  "type": "paragraph",
  "attributes": {
    "align": {
      "type": "plain-text",
      "value": "left"
    },
    "width": {
      "type": "plain-text",
      "value": "standard"
    },
    "content": {
      "type": "rich-text",
      "value": "Lorem ipsum dolor sit amet, consectetur adipiscing elit."
    }
  }
}
```
