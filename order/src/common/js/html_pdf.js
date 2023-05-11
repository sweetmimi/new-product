/* eslint-disable */

import html2canvas from 'html2canvas';
import JsPDF from 'jspdf';

/**
 * @param  ele         
 * @param  padfName     
 * */

 export const  downloadPDF=(ele, pdfName)=> {
 
  window.scrollTo(0, 0);
  let eleW = ele.offsetWidth;// 
  let eleH = ele.offsetHeight;// 
  let eleOffsetTop = ele.offsetTop;  //
  let eleOffsetLeft = ele.offsetLeft; // 

  var canvas = document.createElement("canvas");
  var abs = 0;

  let win_in = document.documentElement.clientWidth || document.body.clientWidth; // 
  let win_out = window.innerWidth; // 
  console.log(ele)
  if (win_out > win_in) {
    // abs = (win_o - win_i)/2;    //
    abs = (win_out - win_in) / 2;    
  }
  canvas.width = eleW * 2;    // 
  canvas.height = eleH * 2;

  var context = canvas.getContext("2d");
  context.scale(3, 3);
  context.translate(-eleOffsetLeft - abs, -eleOffsetTop);

  html2canvas(ele, {
    dpi: 300,
    
    useCORS: true  
  }).then((canvas) => {
    var contentWidth = canvas.width;
    var contentHeight = canvas.height;
    var pageHeight = contentWidth / 595.28 * 841.89;
    var leftHeight = contentHeight;
    var position = 0;
    var imgWidth = 595.28;
    var imgHeight = 595.28 / contentWidth * contentHeight;
    var pageData = canvas.toDataURL('image/jpeg', 1.0);
    var pdf = new JsPDF('', 'pt', 'a4');

    if (leftHeight < pageHeight) {
      pdf.addImage(pageData, 'JPEG', 0, 0, imgWidth, imgHeight);
      // pdf.addImage(pageData, 'JPEG', 20, 40, imgWidth, imgHeight);
    } else {    // 
      while (leftHeight > 10) {
        console.log(leftHeight)
        pdf.addImage(pageData, 'JPEG', 0, position, imgWidth, imgHeight);
        leftHeight -= pageHeight;
        position -= 841.89;
       
        if (leftHeight > 10) {
          pdf.addPage();
        }
      }
    }
    pdf.save(pdfName);
  })
}

export const  previewImg=async (ele)=> {
  window.scrollTo(0, 0);
  let eleW = ele.offsetWidth;// 
  let eleH = ele.offsetHeight;// 
  let eleOffsetTop = ele.offsetTop;  // 
  let eleOffsetLeft = ele.offsetLeft; // 

  var canvas = document.createElement("canvas");
  var abs = 0;

  let win_in = document.documentElement.clientWidth || document.body.clientWidth; // 
  let win_out = window.innerWidth; // 
  if (win_out > win_in) {
    abs = (win_out - win_in) / 2;    // 
  }
  canvas.width = eleW * 2;
  canvas.height = eleH * 2;

  var context = canvas.getContext("2d");
  context.scale(2, 2);
  context.translate(-eleOffsetLeft - abs, -eleOffsetTop);
  var baseSrc = ''
  await html2canvas(ele, {
    dpi: 300,　　 scale:2,//
    useCORS: true  //
  }).then((canvas) => {
    var pageData = canvas.toDataURL('image/jpeg', 1.0);
    baseSrc = pageData
  })

  return baseSrc;
}

