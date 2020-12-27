import GameObject from '../engine/gameObject'
import CameraMovement from './cameraMovement'
import SquareHighlight from './squareHightlight';
import TokenManager from './tokenManager';
import ShapeCreator from './shapeCreator'
import IntersectionHighlight from './intersectionHighlight'
import Polygon from '../engine/polygon';
// this looks weird
const load = () => {
  new CameraMovement();
  new TokenManager();
  new IntersectionHighlight();
  new ShapeCreator();
  new SquareHighlight();
  new Polygon(null, 25.5,25.5,[[23.5,23.5],[23.5,22.5]])
}

export default load