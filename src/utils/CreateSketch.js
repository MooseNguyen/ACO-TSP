import { CreateAntColony } from './AntColony';

let x = 900;
let y = 800;
let nodes = [];
let action;

export function CreateSketch(p) {
  const myMousePressed = () => {
    if (p.mouseX < x && p.mouseY < y) {
      p.ellipse(p.mouseX, p.mouseY, 15, 15);
      nodes.push(p.createVector(p.mouseX, p.mouseY));
      if (nodes.length >= 2) {
        p.stroke(255);
        p.strokeWeight(1);
        p.noFill();
        p.beginShape();
        for (var i = 0; i < nodes.length; i++) {
          p.vertex(nodes[i].x, nodes[i].y);
        }
        p.endShape(p.CLOSE);
      }
    }
  };

  p.setup = () => {
    const canvas = p.createCanvas(x, y);
    canvas.mousePressed(myMousePressed);
    p.background(10);
    p.fill(255);
  };

  p.updateWithProps = (props) => {
    action = props.action;
  };

  function clearCanvas() {
    p.background(10);
    p.fill(255);
    nodes = [];
  }

  function getP(p) {
    return p;
  }
  const P = getP(p);

  p.draw = () => {
    if(action){
       if (action === 'clear') {
         clearCanvas();
         action = '';
       }else if (action === 'start') {
         const { AntColony } = CreateAntColony(P, nodes);
         const antColony = new AntColony(200, 3, 3, 0.1, 1, 500, 0.001);
         antColony.reset();
         antColony.run();
         action = '';
       }
    }
  };
}
