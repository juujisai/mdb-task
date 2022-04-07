import React from 'react';

const Loader = () => {
  const circles = ['circle1', 'circle2', 'circle3', 'circle4', 'circle5', 'circle6', 'circle7', 'circle8']

  const circlesElements = circles.map((item, id) => (
    <span className={`loading-circle ${item}`} key={id} style={{ transform: `translate(-50%, 150%) rotate(${360 * id / circles.length}deg)`, animationDelay: `${(4 / circles.length) * id}s` }}></span>
  ))

  return (
    <div className='loader'>

      <div className="loader-circles">
        {circlesElements}
      </div>
      <h1 className='loader__h1'>Ładowanie ...</h1>


    </div >
  );
}

export default Loader;