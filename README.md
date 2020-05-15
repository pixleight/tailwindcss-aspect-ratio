# An Aspect Ratio Plugin for Tailwind CSS

This plugin generates utility classes to help create responsive elements that will maintain a specific aspect ratio. Useful for embedded content like videos from YouTube.

## Installation

### Install plugin via npm

```sh
# Using npm
npm install @pixleight/tailwindcss-aspect-ratio

# Using Yarn
yarn add @pixleight/tailwindcss-aspect-ratio
```

### Add plugin to Tailwind

```js
// tailwind.config.js

module.exports = {
  plugins: [
    // ...
    require('@pixleight/tailwindcss-aspect-ratio'),
    // ...
  ]
}
```

## Usage

`.aspect-ratio` generates the initial styling, with additional classes for setting the width and height ratios. 

The `.aspect-ratio-item` class also styles the child element to fit the container (this could also be achieved with `.absolute.inset-0`)

This plugin comes with ratios from 1–16 for both width and height. Using both of these classes along with the `.aspect-ratio` allows you customize the aspect ratio however you like without needing to configure new classes.

### Example:

```html
<div class="aspect-ratio aspect-ratio-w-16 aspect-ratio-h-9">
  <div class="aspect-ratio-item">
    <iframe src="https://www.youtube.com/embed/dQw4w9WgXcQ"></iframe>
  </div>
</div>
```

Generates:

```css
.aspect-ratio: {
  --aspect-ratio-w: 1;
  --aspect-ratio-h: 1;
  position: relative;
  height: 0;
  overflow: hidden;
  padding-bottom: calc(var(--aspect-ratio-h) / var(--aspect-ratio-w) * 100%);
}

.aspect-ratio-item: {
  position: absolute;
  width: 100%;
  height: 100%;
}

.aspect-ratio-w-16 {
  --aspect-ratio-w: 16;
}

.aspect-ratio-h-9 {
  --aspect-ratio-h: 9;
}
```

We also include some helpful defaults for common sizes:

- `.aspect-ratio-16/9`
  - *or* `.aspect-ratio-video`
- `.aspect-ratio-1/1`
  - *or* `.aspect-ratio-square`
- `.aspect-ratio-4/3`
- `.aspect-ratio-3/2`

## Customization

Sizes can be configured in the `theme` section of your Tailwind config file:

```js
// tailwind.config.js

module.exports = {
  // ...
  theme: {
    // ...
    extend: {
      // ...
      aspectRatio: {
        '21/9': [21, 9], // Generates `.aspect-ratio-21/9` for a 21:9 ratio

        /**
         * Integers in the `w` and `h` arrays generate classes for that dimension and ratio:
         * .aspect-ratio-{d}-{r}
         */
        w: [
          21,
          30,
        ],
        h: [
          19,
          22,
        ]
      },
      // ...
    },
  },
  // ...
}
```

Because values in the `theme.extend` section are only merged shallowly, you will need to include the values from the plugin's default theme if you wish to add more ratios to `w` or `h` instead of replacing them:

```js
// tailwind.config.js

const aspectRatioTheme = require('@pixleight/tailwindcss-aspect-ratio/defaultTheme')

module.exports = {
  // ...
  theme: {
    // ...
    extend: {
      // ...
      aspectRatio: {
        w: [
          ...aspectRatioTheme.w, // include ratios from 1–16
          21,
        ],
      },
      // ...
    },
  },
  // ...
}
```