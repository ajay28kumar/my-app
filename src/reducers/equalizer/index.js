/* global document, window */
/* eslint no-underscore-dangle: 0 */

export const initialState = {
  Rock: [
    {
      equalizer: '60',
      value: 0
    },
    {
      equalizer: '310',
      value: 0
    },
    {
      equalizer: '1k',
      value: 0
    },
    {
      equalizer: '6k',
      value: 0
    },
    {
      equalizer: '16k',
      value: 0
    }],
  Pop: [
    {
      equalizer: '60',
      value: 0
    },
    {
      equalizer: '310',
      value: 0
    },
    {
      equalizer: '1k',
      value: 0
    },
    {
      equalizer: '6k',
      value: 0
    },
    {
      equalizer: '16k',
      value: 0
    }],
  Jazz: [
    {
      equalizer: '60',
      value: 0
    },
    {
      equalizer: '310',
      value: 0
    },
    {
      equalizer: '1k',
      value: 0
    },
    {
      equalizer: '6k',
      value: 0
    },
    {
      equalizer: '16k',
      value: 0
    }
  ],
  Classical: [
    {
      equalizer: '60',
      value: 0
    },
    {
      equalizer: '310',
      value: 0
    },
    {
      equalizer: '1k',
      value: 0
    },
    {
      equalizer: '6k',
      value: 0
    },
    {
      equalizer: '16k',
      value: 0
    }
  ]
};

export default function (state = initialState, action) {
  switch (action.type) {
    default:
      return state;
  }
}