import React from 'react';
import './index.css';

export default function Dice(props) {
  return (
    <div>
      <button onClick={props.onClick} className='button_dice'> 
       {props.diceValue}
      </button>
    </div>
  )
}
