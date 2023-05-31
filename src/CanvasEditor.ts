import { fabric } from 'fabric'

class CanvasEditor {
  canvas?: fabric

  constructor() {
    this.canvas = new fabric.Canvas('canvasEditorWorkspace')

    this.addMenuButtons()
  }

  addMenuButtons() {
    // rect
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

    // line
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
      const activeObject = this.canvas.getActiveObject()

      if (activeObject) {
        this.canvas.remove(activeObject)
      }
    }
  }
}

export default CanvasEditor
