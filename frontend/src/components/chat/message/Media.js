import React from "react";
import Image from "material-ui-image";

const Media = ({ src, handleOpenMedia }) => {
  return (
    <Image
      alt="message"
      src={src}
      onClick={() => handleOpenMedia({ src: src })}
    />
  );
};

export default Media;
