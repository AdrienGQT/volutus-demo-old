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

## Methods
