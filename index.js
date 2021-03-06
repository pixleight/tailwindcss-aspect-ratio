const plugin = require('tailwindcss/plugin');
const defaultTheme = require('./defaultTheme');
const _ = require('lodash')

module.exports = plugin(function({ theme, variants, e, addUtilities }) {
  const aspectRatioBase = {
    '.aspect-ratio': {
      '--aspect-ratio-w': '1',
      '--aspect-ratio-h': '1',
      position: 'relative',
      height: 0,
      overflow: 'hidden',
      paddingBottom: 'calc(var(--aspect-ratio-h) / var(--aspect-ratio-w) * 100%)',
    },
    '.aspect-ratio-item': {
      position: 'absolute',
      width: '100%',
      height: '100%',
    },
  };

  const aspectRule = (modifier, value, dimension = '') => {
    if( value instanceof Array ) {
      return {
        [`.${e(`aspect-ratio-${dimension}${modifier}`)}`]: {
          '--aspect-ratio-w': `${value[0]}`,
          '--aspect-ratio-h': `${value[1]}`,
        }
      }
    }

    if(!!dimension) {
      return {
        [`.${e(`aspect-ratio-${dimension}-${modifier}`)}`]: {
          [`--aspect-ratio-${dimension}`]: `${value}`
        }
      }
    }
  }

  const aspectRatioTheme = theme('aspectRatio');

  let aspectRatioUtilities = [];

  _.forEach(aspectRatioTheme, (value, modifier) => {
    if( modifier === 'w' || modifier === 'h' ) {
      _.forEach(value, v => {
        aspectRatioUtilities.push( aspectRule(v, v, modifier) );
      })
    } else {
      aspectRatioUtilities.push( aspectRule(modifier, value) )
    }
  })

  aspectRatioUtilities.unshift(aspectRatioBase)

  addUtilities(aspectRatioUtilities, variants('aspectRatio'));
}, {
  theme: {
    aspectRatio: defaultTheme,
  },
  variants: {
    aspectRatio: ['responsive'],
  },
});
