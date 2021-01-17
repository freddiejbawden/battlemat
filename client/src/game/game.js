import GameObject from '../engine/gameObject'
import CameraMovement from './cameraMovement'
import SquareHighlight from './squareHightlight';
import TokenManager from './tokenManager';
import ShapeCreator from './shapeCreator'
import LineCreator from './lineCreator'
import Polygon from '../engine/polygon';
import Text from '../engine/text'

// this looks weird
const load = () => {
  new CameraMovement();
  new TokenManager();
  new ShapeCreator();
  new SquareHighlight();
  new LineCreator();
}

export default load