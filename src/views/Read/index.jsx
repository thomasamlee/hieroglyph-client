import React, { useState, useEffect } from 'react';
import axios from 'axios';

import { Link } from 'react-router-dom';
import { Navbar, NavbarBrand, Container, Button, Row, Col } from 'reactstrap';
import './Read.scss';

import transcriptSwitch from './transcriptSwitch';
import playerSwitch from './playerSwitch';
import videoDataSwitch from './videoDataSwitch';

const statusEnum = Object.freeze({
  WAITING: 'WAITING',
  ERROR: 'ERROR',
  UPLOAD: 'UPLOAD',
  READY: 'READY'
});

// YB46h1koicQ Colbert Interview (Example)

export default function Read(props) {
  const { videoId } = props;

  const [video, setVideo] = useState(null);
  const [status, setStatus] = useState('WAITING');
  const [showPlayer, setShowPlayer] = useState(true);

  async function fetchData(videoId) {
    const { ERROR, UPLOAD, READY } = statusEnum;
    try {
      const { data } = await axios.get(`/api/video/${videoId}`);
      if (data) {
        setVideo(data);
        setStatus(READY);
      } else {
        setStatus(UPLOAD);
      }
    } catch (err) {
      console.log(err);
      setStatus(ERROR);
    }
  }

  useEffect(() => {
    fetchData(videoId);
  }, [videoId]);

  return (
    <div>
      <Container>
        {/* <Row>
          <Col>
            <Button color='secondary' onClick={() => props.history.goBack()}>
              Back
            </Button>
          </Col>
        </Row> */}

        {showPlayer ? (
          <Row>
            <Col xs='9' className='video-frame__box'>
              <div className='video-frame'>{playerSwitch(status, video)}</div>
            </Col>
          </Row>
        ) : null}

        {/* Video Data */}
        <Row>{videoDataSwitch(status, video)}</Row>

        {/* Button Bar */}
        {/* <Row>
          <Col>
            <Button
              color='secondary'
              onClick={() => setShowPlayer(!showPlayer)}
            >
              Show Player
            </Button>
          </Col>
        </Row> */}

        {/* Line Break (remove?) */}
        <Row>
          <Col xs='9'>
            <hr />
          </Col>
        </Row>
        {/* Transcript Text */}
        <Row>
          <Col xs='9'>{transcriptSwitch(status, video)}</Col>
        </Row>
      </Container>
    </div>
  );
}
