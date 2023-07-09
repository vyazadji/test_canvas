export const VIEW_HEIGHT = 800
export const VIEW_WIDTH = 800

export const COMPONENT_HEIGHT = 50
export const COMPONENT_WIDTH = 50

export const VIEW_TYPE = {
  // app 1 with many synthetic tests
  HTML: 'html',
  SVG: 'svg',
  CANVAS: 'canvas',
  CANVAS_FABRIC: 'canvasFabric',
  PIXIJS: 'pixijs',
  CANVAS_KONVA: 'canvasKonva',

  // apps with POC realization
  APP_2_CANVAS: 'app2Canvas',
  APP_3_WEBGL: 'app3Webgl',
  APP_4_OFFSCREEN_CANVAS: 'app4OffscreenCanvas',
  APP_5_MULTILAYER: 'app5Multilayer',
} as const
