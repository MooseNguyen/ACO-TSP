import { CreateSketch } from '../../utils';
import './Canvas.css';
import { ReactP5Wrapper } from 'react-p5-wrapper';

// eslint-disable-next-line react/prop-types
export default function Canvas({ action }) {
  return (
    <div className="canvas">
      <div className="x-direction">X</div>
      <div className="y-direction">Y</div>
      <ReactP5Wrapper action={action} sketch={CreateSketch} />
    </div>
  );
}
