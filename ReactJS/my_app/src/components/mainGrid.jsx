import React from "react";
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import IconButton from '@mui/material/IconButton';
import PhotoCamera from '@mui/icons-material/PhotoCamera';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import CloudDownloadIcon from '@mui/icons-material/CloudDownload';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import Slider from '@mui/material/Slider';
import CachedIcon from '@mui/icons-material/Cached';
import SendIcon from '@mui/icons-material/Send';
import { Item } from './mainGridItem';
import PreviewImage from './functional/PreviewImage'
import imageLoad from '../assets/imageLoad.png'
import { setWidth, setHeight, getWidth, getHeight } from "./functional/Storage";
//import setWidth from "./functional/Storage";
import BasicSelect from "./mainSelect";
import CutomSwitch from "./mainSwitch";
import * as htmlToImage from 'html-to-image';
import { toPng, toJpeg, toBlob, toPixelData, toSvg } from 'html-to-image';  
import Image from "./imageMaker";
import CopyImg from "./imageMaker";

function copyIMG() {
  let node = document.querySelector('.ascii');

  htmlToImage.toPng(node)
  .then(function (dataUrl) {
    let img = new Image();
    img.src = dataUrl;
    CopyImg(img.src)
  })
  .catch(function (error) {
    console.error('oops, something went wrong!', error);
  });
}


export default function MainGrid() {
    return(
        <Grid 
        marginTop={'5%'}
          boxShadow={"none"}
          paddingTop={6}
          container 
          direction="row"
        //   justifyContent="space-between"
          //alignItems="baseline" 
          spacing={3}>
          
            <Grid item xs={6} md={4} boxShadow={"none"}>
              <Item className="bx" >
                <Box 
                boxShadow={"none"}
                className="bx"
                direction="row"
                //justifyContent="space-between"
                //alignItems="baseline" 
                spacing={2}
                position={'center'}>
                  <Box 
                  className='leftBox' 
                  height={400}
                  >
                    <img className="previewIMG" src={imageLoad} width='100%' height='100%' alt="imageLoad" />
                  </Box>
                  <Grid boxShadow={"none"}>
                    <Grid padding={1} container  justifyContent="space-around" boxShadow={"none"}>
                        <IconButton color="primary" component="label">
                        <CloudDownloadIcon />
                        </IconButton>
                        <IconButton color="primary" component="label">
                        <CloudUploadIcon />
                        </IconButton>
                        <IconButton color="primary" component="label">
                        <SendIcon />
                        </IconButton>
                        <IconButton color="primary" component="label">
                        <ContentCopyIcon onClick={copyIMG}/>
                        </IconButton>
                        <IconButton color="primary" component="label" className="copyBTN">
                        <CachedIcon onClick={PreviewImage} />
                        </IconButton>
                        <IconButton className="uploadPictureBTN" color="primary" aria-label="upload picture" component="label">
                        <input onChange={PreviewImage} type="file" hidden accept="image/*" className="uploadPicture" multiple></input>
                        {/* <input onChange={PreviewImage} className="uploadPicture" hidden accept="image/*" type="file" /> */}
                        <PhotoCamera />
                        </IconButton>
                    </Grid>
                    <Grid paddingLeft={2} paddingRight={2} justifyContent="space-around">
                        <Slider min={10} step={10} marks max={110} defaultValue={getWidth() || 50} onChange={(e) => {setWidth(e.target.value)}} aria-label="Custom marks" valueLabelDisplay="auto" />
                        <Slider min={10} step={10} marks max={110} defaultValue={getHeight() || 25} onChange={(e) => {setHeight(e.target.value)}} aria-label="Custom marks" valueLabelDisplay="auto" />
                          <CutomSwitch />
                          <BasicSelect />
                    </Grid>
                  
                  
                  </Grid>
                  
                </Box>
              </Item>
            </Grid>
            <Grid content spacing={2} item xs={6} md={8}>
              <Item>
                <pre class="ascii js-ascii-image"></pre>
              </Item>
            </Grid>
          </Grid>
    );
}