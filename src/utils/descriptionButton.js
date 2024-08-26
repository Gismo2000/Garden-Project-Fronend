export const showDescription = (showFullDescription, setShowFullDescription) => {
    setShowFullDescription(!showFullDescription);
  };
  
  export const displayedFullDescription = (product, showFullDescription) => {
    if (!product || !product.description) {
      return "";
    }
    return showFullDescription
      ? product.description
      : product.description.slice(0, Math.ceil(product.description.length / 2)) + "...";
  };
  