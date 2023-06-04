import { fabric } from 'fabric'

class CanvasEditor {
  canvas: fabric.Canvas

  constructor() {
    this.canvas = new fabric.Canvas('canvasEditorWorkspace', { width: 50, height: 50 })

    this.addMenuButtons()
  }

  onAddElement(serializedCanvas: object) {
    console.log('onAddElement', serializedCanvas)
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
    const addComponent = document.getElementById('saveComponent') as HTMLButtonElement
    addComponent.onclick = () => {
      const serializedCanvas = this.canvas.toObject()

      console.log('add Component, serializedCanvas=>', serializedCanvas)
      this.onAddElement(serializedCanvas)
    }
  }
}

export default CanvasEditor
