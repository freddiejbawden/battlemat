import GameObject from '../engine/gameObject'
import CameraMovement from './cameraMovement'
import SquareHighlight from './squareHightlight';
import TokenManager from './tokenManager';
import ShapeCreator from './shapeCreator'
import Polygon from '../engine/polygon';
// this looks weird
const load = () => {
  new CameraMovement();
  new TokenManager();
  new ShapeCreator();
  new SquareHighlight();
}

export default load