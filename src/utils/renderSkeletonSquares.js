const renderSkeletonSquares = (count, className) => {
  const squares = [];
  for (let i = 0; i < count; i++) {
    squares.push(<div key={i} className={className}></div>);
  }
  return squares;
};
export default renderSkeletonSquares;