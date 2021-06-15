import React, { useState } from 'react';
import { Button } from 'react-bootstrap';
import './App.css';

function App() {
  const [apiResponse, setApiResponse] = useState('');
  const setLEDConfiguration = () => {
    fetch('http://localhost:9000/cylonRoute/setLedRobotConfiguration', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        // Change the port to the correct port for your Arduino.
        connections: {
          arduino: { adaptor: 'firmata', port: '/dev/ttyACM0' },
        },
        devices: {
          led: { driver: 'led', pin: 13 },
        },
      })
    })
      .then((res) => res.text())
      .then((res) => setApiResponse(res));
  };
  const startLED = () => {
    fetch('http://localhost:9000/cylonRoute/startLED')
      .then((res) => res.text())
      .then((res) => setApiResponse(res));
  };
  const stopLED = () => {
    fetch('http://localhost:9000/cylonRoute/stopLED')
      .then((res) => res.text())
      .then((res) => setApiResponse(res));
  };
  const setopencvRobotConfiguration = () => {
    fetch('http://localhost:9000/cylonRoute/setopencvRobotConfiguration')
      .then((res) => res.text())
      .then((res) => setApiResponse(res));
  };
  const startopencv = () => {
    fetch('http://localhost:9000/cylonRoute/startopencv')
      .then((res) => res.text())
      .then((res) => setApiResponse(res));
  };

  
  var recordedChunks=[];
  var isRecording = false;

   function handleDataAvailable(event) {
      if (event.data.size > 0) {
        recordedChunks.push(event.data);
        isRecording = false
        download();
      } else {
        // ...
      }
    }
  function download(){
      var blob = new Blob(recordedChunks, {
      type: "video/mov"
    });
  
    var url = URL.createObjectURL(blob);
    var a = document.createElement("a");
    document.body.appendChild(a);
    a.style = "display: none";
    a.href = url;
    var d = new Date();
    var n = d.toUTCString();
    a.download = n+".mov";
    a.click();
    window.URL.revokeObjectURL(url);
    recordedChunks = []
    //this.showNotification()
    }
  

  async function getStream() {
    const displayOptions= 
    {
      video: {
        cursor: "always"
      },
      audio: {
          echoCancellation: true,
          noiseSuppression: true,
          sampleRate: 44100
        }
      }
    const options= { mimeType: "video/webm; codecs=vp9" }
    var isRecording;
      try {
  
          const stream =  await navigator.mediaDevices.getDisplayMedia(displayOptions);
          const mediaRecorder = new MediaRecorder(stream, options);
          mediaRecorder.ondataavailable = handleDataAvailable;
          mediaRecorder.start();
          isRecording = true
        } catch(err) {
          isRecording = false
          alert(err);
        }
  }

  return (
    <div className='App'>
      <Button variant='primary' onClick={setopencvRobotConfiguration}>
        Configure opencv
      </Button>
      <Button variant='success' onClick={getStream}>
        Start recording
      </Button>
      <p className='App-intro'>{apiResponse}</p>
    </div>
  );
}

export default App;
