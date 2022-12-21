import React, { useRef } from "react";

const copyToClipboard = async (pngBlob) => {
  try {
    await navigator.clipboard.write([
      // eslint-disable-next-line no-undef
      new ClipboardItem({
        [pngBlob.type]: pngBlob
      })
    ]);
  } catch (error) {
    console.error(error);
  }
};


const CopyImg = async (src) => {
  const img = await fetch(src);
  const imgBlob = await img.blob();
    return copyToClipboard(imgBlob);
};

export default CopyImg;