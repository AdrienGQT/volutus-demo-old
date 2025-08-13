# Volutus

## Introduction

Volutus is a loghtweight JavaScript library designed to create smooth, infinite sliders with minimal setup. it provides seamless scrolling experiences and supports many gestures : mouse wheel navigation, touch/drag interactions and button controls.

## Installation

Using a package manager:

```bash
npm i volutus
```
```js
import Volutus from 'volutus'
```

## Setup

### Minimal

```js
const volutus = new Volutus({
  direction : 'column', // or 'row'
  container: container,
  items: items
})
```

### Custom example

```js
  const volutus = new Volutus({
    // Direction
    direction: "row", // or "row"
    // HTML Elements
    container : container,
    items : items,
    previousButton : buttonPrev,
    nextButton : buttonNext,
    // Features
    supportScroll: true,
    supportDrag: true,
    supportButtons : true,
    // Tweaks
    gap: 12,
    scrollStrength: 0.2,
    dragStrength: 1.5,
    snapStrength: 0.02,
    lerpFactor: 0.05
  });
```

## Settings

| Option                 | Type                       | Default                                            | Description     |
|------------------------|----------------------------|----------------------------------------------------|--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `direction`            | `string`                   | `undefined`                                        | The direction of the scroll. Either 'column' or 'row'.                                                                                     |
| `container`            | `HTMLElement`              | `undefined`                                        | The element that will be used as the scroll container.                                                                                   |
| `items`                | `NodeList`                 | `undefined`                                        | A list that contains the elements that will be scrolled, usually `container`'s children.                                                 |
| `previousButton`       | `HTMLElement`              | `undefined`                                        | The element that will be used as the previous item navigation button.                                                 
|
| `nextButton`           | `HTMLElement`              | `undefined`                                        | The element that will be used as the next item navigation button.                                                 
|
| `gap`                  | `number`                   | `12`                                               | The space between the items.                                                 
|
| `scrollStrength`       | `number`                   | `0.2`                                              | A value that sets the strength of the mouse wheel on the slider.                                                 
|
| `dragStrength`         | `number`                   | `1.5`                                              | A value that sets the strength of the touch/drag on the slider.                                                 
|
| `snapStrength`         | `number`                   | `0.02`                                             | A value that sets the strength of the snap effect on the slider.                                                 
|
| `lerpFactor`           | `number`                   | `0.05`                                             | A value that determines the interpolation weight in the scroll lerp.                                                 
|
| `supportScroll`        | `boolean`                  | `true`                                             | Wether or not to support mouse wheel navigation.                                                 
|
| `supportDrag`          | `boolean`                  | `true`                                             | Wether or not to support touch/drag interactions.                                                 
|
| `supportButtons`       | `boolean`                  | `true`                                             | Wether or not to support button controls.                                                 
|

## Methods
