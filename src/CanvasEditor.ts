import { fabric } from 'fabric'

import { COMPONENT_HEIGHT, COMPONENT_WIDTH } from './consts'

class CanvasEditor {
  canvas: fabric.Canvas

  constructor() {
    this.canvas = new fabric.Canvas('canvasEditorWorkspace', { width: COMPONENT_WIDTH, height: COMPONENT_HEIGHT })

    this.addMenuButtons()
  }

  onAddElement(serializedCanvas: object, count: number) {
    console.log('onAddElement', serializedCanvas, count)
    alert('need to specify onAddElement')
  }

  addMenuButtons() {
    // add line
    const addRect = document.getElementById('addRectButton') as HTMLButtonElement
    addRect.onclick = () => {
      const rect = new fabric.Rect({
        top: 0,
        left: 0,
        width: 25,
        height: 25,
        fill: 'red',
      })

      this.canvas.add(rect)
    }

    // add text
    const addText = document.getElementById('addText') as HTMLButtonElement
    addText.onclick = () => {
      const text = new fabric.Text('28', {
        top: 0,
        left: 0,
        fontSize: 18,
      })

      this.canvas.add(text)
    }

    // Remove selected object on button click
    const remove = document.getElementById('removeElement') as HTMLButtonElement
    remove.onclick = () => {
      const activeObject = this.canvas.getActiveObject()

      if (activeObject) {
        this.canvas?.remove(activeObject)
      }
    }

    // Remove selected object on button click
    const addComponent = document.getElementById('addCanvasFabricComponents') as HTMLButtonElement
    addComponent.onclick = () => {
      const serializedCanvas = this.canvas.toObject()

      const componentsCountEl = document.getElementById('CanvasFabricComponentsCount') as HTMLInputElement
      const componentsCount = Number(componentsCountEl.value)

      console.log('add Component, serializedCanvas=>', serializedCanvas, componentsCount)
      this.onAddElement(serializedCanvas, componentsCount)
    }
  }
}

export default CanvasEditor
