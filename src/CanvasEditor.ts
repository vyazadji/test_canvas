import { fabric } from 'fabric'

class CanvasEditor {
  canvas?: fabric

  constructor() {
    this.canvas = new fabric.Canvas('canvasEditorWorkspace', { width: 200, height: 200 })

    this.addMenuButtons()
  }

  onAddElement(_serializedCanvas: object) {
    alert('pls specify onAddElement')
  }

  addMenuButtons() {
    // add line
    const addRectButton = document.getElementById('addRectButton')!
    addRectButton.onclick = (_e: MouseEvent) => {
      const rect = new fabric.Rect({
        top: 50,
        left: 50,
        width: 60,
        height: 70,
        fill: 'red',
      })

      this.canvas.add(rect)
    }

    // add text
    const addTextButton = document.getElementById('addText')!
    addTextButton.onclick = (_e: MouseEvent) => {
      const text = new fabric.Text('28', {
        top: 0,
        left: 0,
      })

      this.canvas.add(text)
    }

    // Remove selected object on button click
    document.getElementById('removeElement')!.onclick = () => {
      const activeObject = this.canvas.getActiveObject()

      if (activeObject) {
        this.canvas.remove(activeObject)
      }
    }

    // Remove selected object on button click
    document.getElementById('saveComponent')!.onclick = () => {
      const serializedCanvas = this.canvas.toObject()

      console.log('add Component, serializedCanvas=>', serializedCanvas)
      this.onAddElement(serializedCanvas)
    }
  }
}

export default CanvasEditor
