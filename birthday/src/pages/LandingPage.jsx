import React, { useState } from 'react';
import './LandingPage.css'; // {{ edit_1 }}
import Background from '../components/Background.jsx';

const LandingPage = () => {
  const [isVisible, setIsVisible] = useState(false); // {{ edit_2 }}

  const handleClick = (event) => {
    const heartDrop = document.createElement('div');
    heartDrop.className = 'heart-drop';
    heartDrop.innerHTML = '21'; // Add the number to the heart drop
    document.body.appendChild(heartDrop); // Append to body or a specific container

    // Set the position based on the click event
    heartDrop.style.left = `${event.clientX}px`;
    heartDrop.style.top = `${event.clientY}px`;

    // Trigger the animation
    setTimeout(() => {
        heartDrop.style.animation = 'drop 1s forwards, fadeOut 1s forwards 1s'; // Ensure the animation is applied
    }, 0);

    // Remove the heart drop after animation
    heartDrop.addEventListener('animationend', () => {
        heartDrop.remove();
    });
  };

  const handleMouseClick = (e) => { // {{ edit_4 }}
    const heart = document.createElement('div');
    heart.className = 'heart-drop';
    heart.style.left = `${e.pageX}px`;
    heart.style.top = `${e.pageY}px`;
    document.body.appendChild(heart);
    setTimeout(() => {
      heart.remove();
    }, 1000); // Remove heart after 1 second
  };

  return (
    <div className="landing-page" onClick={handleMouseClick}> {/* {{ edit_5 }} */}
      <Background />
      <div>
          <button className='start-btn' style={{ display: isVisible ? 'none' : 'flex' }} onClick={() => setIsVisible(true)}>Happy Birthday</button> 
      </div>
        <div className='envelope'>
          <div className='envelope-content outer'>
            {isVisible && ( // {{ edit_7 }}
            <div className='inner'>
              <p className='head'>Happy 21st Birthday</p>
              <p className='date'>February 3</p>
              <p className='message'>
                
                Hello haha Happy birthday sayo, sana nag-enjoy ka ngayon araw, hoping you're doing good din.
                Sorry dito hahaha late talaga para kung nag-enjoy ka man ngayon may
                sisira at sisira ng araw mo hahaha de joke lang. Tara sama ka sakin sa Lantern Rite. Di ko alam sasabihin ko 
                HAHAHA well, ayun lang Byebye Furina kong malakas ang tama.

                </p>
                <p className='ingat'>Ingat ka palagi</p>
              <button className='close-btn' onClick={() => setIsVisible(false)}>X</button>
            </div>
            )}
          </div>
        </div>
    </div>
  )
}

export default LandingPage