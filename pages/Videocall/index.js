import React, {useState, useEffect, useRef} from 'react'
import styles from './styles.module.scss'
import {firestore} from '@lib/firebase'

export default function Vidcall() {
  const videoRef = useRef(null);
  const [callInput, setCallInput] = useState('')
  const [pc, setPc] = useState('')
  // 1. Initialize WebRTC

  const servers = {
    iceServers: [
      {
        urls: [
          'stun:stun1.l.google.com:19302',
          'stun:stun2.l.google.com:19302',
        ] 
      },
    ],
    iceCandidatePoolSize: 0,
  }

  useEffect(() => {
    let pcEff = new RTCPeerConnection(servers);
    setPc(pcEff)
  }, [])
  
  let remoteStream = null;

  const connectCam = async () => {

    await navigator.mediaDevices.getUserMedia({audio: true, video: true}).then(stream => {
      let video = videoRef.current;
      video.srcObject = stream;
      video.play();
    })
    
    remoteStream  = new MediaStream();

    pc.ontrack = event => {
      event.streams[0].getTracks().forEach(track => remoteStream.addTrack(track));
    }
  }

  // 2. Create the call with unique ID

  const createOffer = async () => {
 
    // Referencing the Firestore Collection

    const callDoc = firestore.collection('calls').doc();
    const offerCandidates = callDoc.collection('offerCandidates');
    const answerCandidates = callDoc.collection('answerCandidates');

    setCallInput(callDoc.id);
    console.log('get candidate');
    // Get Candidates for caller, save to db

    pc.onicecandidate = event => {
      event.candidate && offerCandidates.add(event.candidate.toJSON());
    }

    console.log('Creating offer...');

    // Creating the Offer

    const offerDescription  = await pc.createOffer();
    await pc.setLocalDescription(offerDescription);

    const offer = {
      sdp: offerDescription.sdp,
      type: offerDescription.type,
    }

    await callDoc.set({offer});
    console.log('listening for answer');
    // Listen for remote answer
    
    callDoc.onSnapshot((snapshot) => {
      const data = snapshot.data();

      if(!pc.currentRemoteDescription && data?.answer) {
        const answerDescription = new RTCSessionDescription(data.answer);
        pc.setRemoteDescription(answerDescription);
      }
    })

    // When answered, add candidate to peer connection
    answerCandidates.onSnapshot(snapshot => {
      snapshot.docChanges().forEach(change => {
        if(change.type === 'added'){
          const candidate = new RTCIceCandidate(change.doc.data());
          pc.addIceCandidate(candidate);
        }
      })
    })
  }


  // 3. answer the call with unique ID

  const answerCall = async () => {
    console.log('1 ',callInput)
    const callId = callInput;
    console.log('2 ',callId)

    const callDoc = firestore.collection('calls').doc(callId);
    const answerCandidates = callDoc.collection('answerCandidates');
    const offerCandidates = callDoc.collection('offerCandidates');

    pc.onicecandidate = event => {
      event.candidate && answerCandidates.add(event.candidate.toJSON());
    }
    console.log('3')
    const callData = (await callDoc.get()).data();
    const offerDescription = callData.offer;
    await pc.setRemoteDescription(new RTCSessionDescription(offerDescription));
    console.log('4')
    const answerDescription = await pc.createAnswer();
    await pc.setLocalDescription(answerDescription);
    console.log('5')
    const answer = {
      type: answerDescription.type,
      sdp: answerDescription.sdp,
    }
    console.log('6')
    await callDoc.update({answer});
    console.log('7')
    offerCandidates.onSnapshot((snapshot) => {
      snapshot.docChanges().forEach((change) => {
        console.log('8', change);
        if (change.type === 'added') {
          let data = change.doc.data();
          pc.addIceCandidate(new RTCIceCandidate(data));
        }
      });
    });
    console.log('9')
  }

  return (
    <div className={styles.container}>
    
    <h2>1. Start your Webcam</h2>
    
    <div className={styles.videos}>
      <span>
        <h3>Local Stream</h3>
       
        <video ref={videoRef} />
      </span>
      <span>
        <h3>Remote Stream</h3>
        <video id="remoteVideo" autoplay playsinline>
          <source src={remoteStream} type="video/webm"></source>
        </video>
      </span>
    </div>

      <div className={styles.options}>
        <button id="webcamButton" onClick={connectCam}>Start webcam</button>
        <h3>2. Create a new Call</h3>
        <button id="callButton" onClick={createOffer}>Create Call (offer)</button>

        <h3>3. Join a Call</h3>
        <p>Answer the call from a different browser window or device</p>
      
        <input value={callInput ? callInput : ''} placeholder={callInput} type={""} onChange={(e) => { setCallInput(e.target.value)}}/>
        <button id="answerButton" onClick={answerCall}>Answer</button>

        <h3>4. Hangup</h3>
        <button id="hangupButton" disabled className={styles.hang_up}>Hangup</button>
      </div>    
    </div>
  )
}

