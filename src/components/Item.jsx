import React from "react";
import { useNavigate } from 'react-router-dom';
const Item = (props) => {
    const router = useNavigate();
    return(
        <div className="container">
        <div className="container__row">
          <strong>{props.post.id}. {props.post.title}</strong>
          <div>
          {props.post.body}
          </div>
          <div className="container__row">
          <button onClick={() => props.remove(props.post)}>Delete</button>
          </div>
        </div>
      </div>
    )
}

export default Item;