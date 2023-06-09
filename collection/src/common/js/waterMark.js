export function watermark(settings) {


  var defaultSettings={
      watermark_txt:"text",
      watermark_x:20,
      watermark_y:20,
      watermark_rows:10,
      watermark_cols:18,
      watermark_x_space:20,
      watermark_y_space:15,
      watermark_color:'#aaa',
      watermark_alpha:0.35,
      watermark_fontsize:'12px',
      watermark_font:'',
      watermark_width:100,
      watermark_height:80,
      watermark_angle:15
  };

  if(arguments.length===1&&typeof arguments[0] ==="object" )
  {
      var src=arguments[0]||{};
      for(var keyS in src)
      {
          if(src[keyS]&&defaultSettings[keyS]&&src[keyS]===defaultSettings[keyS])
              continue;
          else if(src[keyS])
              defaultSettings[keyS]=src[keyS];
      }
  }

  var oTemp = document.createDocumentFragment();


  var page_width = Math.max(document.body.scrollWidth,document.body.clientWidth);
  var cutWidth = page_width*0.0150;
   page_width=page_width-cutWidth;

  var page_height = Math.max(document.body.scrollHeight,document.body.clientHeight);
  // var page_height = document.body.scrollHeight+document.body.scrollTop;

  if (defaultSettings.watermark_cols == 0 || (parseInt(defaultSettings.watermark_x + defaultSettings.watermark_width *defaultSettings.watermark_cols + defaultSettings.watermark_x_space * (defaultSettings.watermark_cols - 1)) > page_width)) {
      defaultSettings.watermark_cols = parseInt((page_width-defaultSettings.watermark_x+defaultSettings.watermark_x_space) / (defaultSettings.watermark_width + defaultSettings.watermark_x_space) - 1);
      defaultSettings.watermark_x_space = parseInt((page_width - defaultSettings.watermark_x - defaultSettings.watermark_width * defaultSettings.watermark_cols) / (defaultSettings.watermark_cols - 1) - 10);
  }

  if (defaultSettings.watermark_rows == 0 || (parseInt(defaultSettings.watermark_y + defaultSettings.watermark_height * defaultSettings.watermark_rows + defaultSettings.watermark_y_space * (defaultSettings.watermark_rows - 1)) > page_height)) {
      defaultSettings.watermark_rows = parseInt((defaultSettings.watermark_y_space + page_height - defaultSettings.watermark_y) / (defaultSettings.watermark_height + defaultSettings.watermark_y_space));
      defaultSettings.watermark_y_space = parseInt(((page_height - defaultSettings.watermark_y) - defaultSettings.watermark_height * defaultSettings.watermark_rows) / (defaultSettings.watermark_rows - 1));
  }
  var x;
  var y;
  for (var i = 0; i < defaultSettings.watermark_rows; i++) {
      y = defaultSettings.watermark_y + (defaultSettings.watermark_y_space + defaultSettings.watermark_height) * i;
      for (var j = 0; j < defaultSettings.watermark_cols; j++) {
          x = defaultSettings.watermark_x + (defaultSettings.watermark_width + defaultSettings.watermark_x_space) * j;

          var mask_div = document.createElement('div');
          mask_div.id = 'mask_div' + i + j;
          mask_div.className = 'mask_div';
          mask_div.appendChild(document.createTextNode(defaultSettings.watermark_txt));

          mask_div.style.webkitTransform = "rotate(-" + defaultSettings.watermark_angle + "deg)";
          mask_div.style.MozTransform = "rotate(-" + defaultSettings.watermark_angle + "deg)";
          mask_div.style.msTransform = "rotate(-" + defaultSettings.watermark_angle + "deg)";
          mask_div.style.OTransform = "rotate(-" + defaultSettings.watermark_angle + "deg)";
          mask_div.style.transform = "rotate(-" + defaultSettings.watermark_angle + "deg)";
          mask_div.style.visibility = "";
          mask_div.style.position = "absolute";
          mask_div.style.left = x + 'px';
          mask_div.style.top = y + 'px';
          mask_div.style.overflow = "hidden";
          mask_div.style.zIndex = "9999";
          mask_div.style.pointerEvents='none';//pointer-events:none
          //mask_div.style.border="solid #eee 1px";
          mask_div.style.opacity = defaultSettings.watermark_alpha;
          mask_div.style.fontSize = defaultSettings.watermark_fontsize;
          mask_div.style.fontFamily = defaultSettings.watermark_font;
          mask_div.style.color = defaultSettings.watermark_color;
          mask_div.style.textAlign = "center";
          mask_div.style.width = defaultSettings.watermark_width + 'px';
          mask_div.style.height = defaultSettings.watermark_height + 'px';
          mask_div.style.display = "block";
          oTemp.appendChild(mask_div)
      }
  }
  document.body.appendChild(oTemp);
}
