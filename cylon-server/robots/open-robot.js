const cv2 = require('opencv4nodejs-prebuilt')

class OpenRobot {
  constructor() {
    this.frame = null;
  }

  startopencv() {
    var self = this;
    const FPS = 100;
    const Vcap = new cv2.VideoCapture(0);
    Vcap.set(cv2.CAP_PROP_BUFFERSIZE, 2)
    Vcap.set(cv2.CAP_PROP_FRAME_WIDTH, 300);
    Vcap.set(cv2.CAP_PROP_FRAME_HEIGHT, 300);

  setInterval(() => {
    const frame = Vcap.read();
      if(!frame.empty){
        const image = cv2.imencode('.jpg', frame).toString('base64');
        this.frame = image
      }   
  }, 10);
  }
}

module.exports = new OpenRobot();
