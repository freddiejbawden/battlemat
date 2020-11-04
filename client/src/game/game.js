import GameObject from '../engine/gameObject'
import CameraMovement from './cameraMovement'
import SquareHighlight from './squareHightlight';
import TokenManager from './tokenManager';

// this looks weird
const load = () => {
  new CameraMovement();
  new TokenManager();
  new SquareHighlight();
}

export default load