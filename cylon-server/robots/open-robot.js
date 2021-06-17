const cylon = require('cylon');
const cylonOpencv = require('cylon-opencv');



class OpenRobot {
  constructor() {
    this.robot = null;
    this.im = null;
  }

  setOpenCvRobotConfiguration() {
    this.robot = cylon
      .robot({
        // Change the port to the correct port for your Arduino.
        connections: {
            opencv: { adaptor: 'opencv' }
          },
          devices: {
            window: { driver: 'window' },
            camera: {
              driver: 'camera',
              camera: 0, 
              haarcascade: '/Users/snehalata.pimprale/Documents/cylonjs/code-hoot/explore-react-cylon-integration/cylon-server/node_modules/cylon-opencv/examples/display_camera/haarcascade_frontalface_alt.xml'      }
          },
      })
      .start();
      this.startopencv();
  }

 
  startopencv() {
      var self = this;
      console.log('The camera is ready!' +  JSON.stringify(this.robot.devices.camera))
        this.robot.devices.camera.once('cameraReady', function() {
        console.log('The camera is ready!')
  
        // We listen for frame ready event, when triggered
        // we display the frame/image passed as an argument
        // and we tell the window to wait 40 milliseconds
        var frameSelf = self;
        //console.log('started opencv')
        self.robot.devices.camera.on('frameReady', function(err, im) {
          
          //console.log("FRAMEREADY!");
          //console.log(frameSelf.robot.devices.window)
          //console.log("FRAMEREADY!");

          console.log("frameready!");
          const data = frameSelf.robot.devices.window.show(im, 400);
          self.im = im;
          console.log(im, typeof(im), JSON.stringify(im))

          //this.sendDataToSocket(im)
        });
        
  
        // Here we have two options to start reading frames from
        // the camera feed.
        // 1. As fast as possible triggering the next frame read
        //    in the listener for frameReady, if you need video
        //    as smooth as possible uncomment #my.camera.readFrame()
        //    in the listener above and the one below this comment.
        //
        // my.camera.readFrame()
        //
        // 2. Use an interval of time to try and get aset amount
        //    of frames per second  (FPS), in the next example
        //    we are trying to get 1 frame every 50 milliseconds
        //    (20 FPS).
        //
        //every(50, function() { frameSelf.robot.devices.camera.readFrame(); });

        setInterval(function() { 
          const data =frameSelf.robot.devices.camera.readFrame(); 
        }
          , 5000);
      });
     
  }
}

module.exports = new OpenRobot();
