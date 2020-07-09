import React from 'react'
import { Flipped } from 'react-flip-toolkit';
import { useDrag, useDrop } from 'react-sortly';

const Project = (props) => {
  const { id, depth, data: { name } } = props;
  const [, drag] = useDrag({
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });
  const [,drop] = useDrop();
  return (
    <Flipped flipId={id}>
      <div ref={(ref) => drop(ref)} className="project" style={{ marginLeft: depth * 20 }}>
        <div ref={drag}>{name}</div>
      </div>
    </Flipped>
  )
};

export default Project;