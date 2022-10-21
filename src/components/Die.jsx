import React from "react";

export default function Die(props) {
  const styles = {
    backgroundColor: props.isHeld ? "#59E391" : "white",
  };
  return (
    <div>
      <div>
        <div onClick={props.holdDice} style={styles} className="items">
          {props.value}
        </div>
      </div>
    </div>
  );
}
