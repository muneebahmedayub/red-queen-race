import React, { useEffect } from 'react';
import './App.css';

import useWebAnimations from '@wellyshen/use-web-animations';

function App() {
  const sceneryFrames = [
    { transform: 'translateX(100%)' },
    { transform: 'translateX(-100%)' }
  ];

  const sceneryTimingBackground = {
    duration: 36000,
    iterations: Infinity
  };

  const sceneryTimingForeground = {
    duration: 12000,
    iterations: Infinity
  };

  const background1Movement = useWebAnimations({
    keyframes: sceneryFrames,
    timing: sceneryTimingBackground
  })


  const background2Movement = useWebAnimations({
    keyframes: sceneryFrames,
    timing: sceneryTimingBackground
  })

  const foreground1Movement = useWebAnimations({
    keyframes: sceneryFrames,
    timing: sceneryTimingForeground
  })


  const foreground2Movement = useWebAnimations({
    keyframes: sceneryFrames,
    timing: sceneryTimingForeground
  })

  const spriteFrames = [
    { transform: 'translateY(0)' },
    { transform: 'translateY(-100%)' }
  ];
  const redQueen_alice = useWebAnimations({
    keyframes: spriteFrames,
    timing: {
      easing: 'steps(7, end)',
      direction: "reverse",
      duration: 600,
      playbackRate: 1,
      iterations: Infinity
    }
  })

  const sceneries = [foreground1Movement, foreground2Movement, background1Movement, background2Movement]

  useEffect(() => {
    const adjustBackgroundPlayback = () => {
      if (redQueen_alice.getAnimation().playbackRate < 0.8) {
        sceneries.forEach(anim => {
          anim.getAnimation().updatePlaybackRate(redQueen_alice.getAnimation().playbackRate / 2 * -1)
        })
      }
      else if (redQueen_alice.getAnimation().playbackRate > 1.2) {
        sceneries.forEach(anim => {
          anim.getAnimation().updatePlaybackRate(redQueen_alice.getAnimation().playbackRate / 2)
        })
      }
      else {
        sceneries.forEach(anim => {
          anim.getAnimation().updatePlaybackRate(0)
        })
      }
    }

    adjustBackgroundPlayback()
    background1Movement.getAnimation().currentTime = background1Movement.getAnimation().effect.getTiming().duration / 2

    foreground1Movement.getAnimation().currentTime = foreground1Movement.getAnimation().effect.getTiming().duration / 2

    setInterval(() => {
      if (redQueen_alice.getAnimation().playbackRate > 0.4) {
        redQueen_alice.getAnimation().updatePlaybackRate(redQueen_alice.getAnimation().playbackRate * 0.9)
      }
      adjustBackgroundPlayback()
    }, 3000)
    const goFaster = () => {
      redQueen_alice.getAnimation().updatePlaybackRate(redQueen_alice.getAnimation().playbackRate * 1.1)
      adjustBackgroundPlayback()
    }
    window.addEventListener("click", goFaster);
    window.addEventListener("touchstart", goFaster);
  })

  return (
    <div>
      <div className="wrapper">
        <div className="sky"></div>
        <div className="earth">
          <div id="red-queen_and_alice">
            <img ref={redQueen_alice.ref} id="red-queen_and_alice_sprite" src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/641/sprite_running-alice-queen_small.png" srcSet="https://s3-us-west-2.amazonaws.com/s.cdpn.io/641/sprite_running-alice-queen.png 2x" alt="Alice and the Red Queen running to stay in place." />
          </div>
        </div>

        <div ref={foreground1Movement.ref} className="scenery" id="foreground1">
          <img id="palm3" src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/641/palm3_small.png" srcSet="https://s3-us-west-2.amazonaws.com/s.cdpn.io/641/palm3.png 2x" alt=" " />
        </div>
        <div ref={foreground2Movement.ref} className="scenery" id="foreground2">
          <img id="bush" src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/641/bush_small.png" srcSet="https://s3-us-west-2.amazonaws.com/s.cdpn.io/641/bush.png 2x" alt=" " />
          <img id="w_rook_upright" src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/641/w_rook_upright_small.png" srcSet="https://s3-us-west-2.amazonaws.com/s.cdpn.io/641/w_rook_upright.png 2x" alt=" " />
        </div>
        <div ref={background1Movement.ref} className="scenery" id="background1">
          <img id="r_pawn_upright" src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/641/r_pawn_upright_small.png" srcSet="https://s3-us-west-2.amazonaws.com/s.cdpn.io/641/r_pawn_upright.png 2x" alt=" " />
          <img id="w_rook" src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/641/w_rook_small.png" srcSet="https://s3-us-west-2.amazonaws.com/s.cdpn.io/641/w_rook.png 2x" alt=" " />
          <img id="palm1" src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/641/palm1_small.png" srcSet="https://s3-us-west-2.amazonaws.com/s.cdpn.io/641/palm1.png 2x" alt=" " />
        </div>
        <div ref={background2Movement.ref} className="scenery" id="background2">
          <img id="r_pawn" src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/641/r_pawn_small.png" srcSet="https://s3-us-west-2.amazonaws.com/s.cdpn.io/641/r_pawn.png 2x" alt=" " />

          <img id="r_knight" src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/641/r_knight_small.png" srcSet="https://s3-us-west-2.amazonaws.com/s.cdpn.io/641/r_knight.png 2x" alt=" " />
          <img id="palm2" src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/641/palm2_small.png" srcSet="https://s3-us-west-2.amazonaws.com/s.cdpn.io/641/palm2.png 2x" alt=" " />
        </div>
      </div>
    </div>
  );
}

export default App;
