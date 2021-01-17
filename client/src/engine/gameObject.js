import engine from "./engine"
import { uuidv4 } from "../utils";


export default class GameObject {
  constructor(id,x,y,parent,{shouldRender=true}={}) {
    this.id = id || uuidv4()
    this.position = {x: x||0, y:y||0}
    this.shouldRender = shouldRender;
    this.parent = parent;
    this.children = []
    engine.registerGameObject(this.id, this);
  }

  addChild(id) {
    if (!this.children.includes(id)) {
      this.children.push(id);
    } else {
      console.error(`${id} is already a child of ${this.parent}`)
    }
  }

  renderChildren(ctx,canvas) {
    this.children.forEach(child => child.render(ctx,canvas))
  }

  translatePointToRelative(pos) {
    const stack = []
    let relPos = {...pos}
    let nextParentId = this.parent
    // find the base of the tree
    while (nextParentId) {
      stack.push(nextParentId);
      const parentObject = engine.getGameObject(nextParentId)
      nextParentId = parentObject.parent;
    }

    // walk down the tree and apply transformations to the positions
    while(stack.length !== 0) {
      const parentId = stack.pop()
      const parentObject = engine.getGameObject(parentId)
      relPos = {
        x: relPos.x - parentObject.position.x,
        y: relPos.y - parentObject.position.y
      }
    }

    return relPos

  }

  getAbsolutePosition() {
    let maxIter =0
    const absolutePosition = {...this.position}
    let nextParentId = this.parent
    while (nextParentId) {
      const parentObject = engine.getGameObject(nextParentId)
      if (parentObject && parentObject.position) {
        absolutePosition.x = absolutePosition.x + parentObject.position.x;
        absolutePosition.y = absolutePosition.y + parentObject.position.y
        nextParentId = parentObject.parent
      } else {
        nextParentId = null
      }
      maxIter+=1
      
    }
    return absolutePosition
  }

  destroy() {
    engine.removeGameObject(this.id);
  }
  update() {

  }
  start() {
     
  }
  mouseDown() {
    return false;
  }
  mouseUp() {
    return false;
  }
  render() {
    this.renderChildren();
    // console.warn('Base GameObject does not have a render method!')
  }
}