import React from 'react';

const Note = ({ item }) => {
  return (
    <div>
      {item.title}
      <br />
      {item.description}
    </div>
  );
};

export default Note;
