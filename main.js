$(function() {
  var running = false;
  $("#upperbar").scroll(function() {
    if (running) {
      running = false;
      return;
    }
    running = true;
    $("#portfolioscroller")
      .scrollLeft($("#upperbar").scrollLeft());
  });
  $("#portfolioscroller").scroll(function() {
    if (running) {
      running = false;
      return;
    }
    running = true;
    $("#upperbar")
      .scrollLeft($("#portfolioscroller").scrollLeft());
  });
});

if (document.querySelector('#portfoliocontainer') != null) {
  let pxwidth = document.querySelector('#portfoliocontainer').clientWidth;
  let txtwidth = pxwidth + "px"

  document.querySelector('#upperbardiv').setAttribute("style", "width:" + txtwidth);
  document.querySelector('#upperbardiv').style.width = txtwidth;
  $(function() {
    var running = false;
    $(".wrapper1").scroll(function() {
      if (running) {
        running = false;
        return;
      }
      running = true;
      $(".wrapper2")
        .scrollLeft($(".wrapper1").scrollLeft());
    });
    $(".wrapper2").scroll(function() {
      if (running) {
        running = false;
        return;
      }
      running = true;
      $(".wrapper1")
        .scrollLeft($(".wrapper2").scrollLeft());
    });
  });
}

var r = document.querySelector(':root');

function CSS_set(variable, property) {
  r.style.setProperty(variable, property);
}

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

function BoundHue(hue) {
  return ((360 * 2) + hue) % 360;
}

function BoundSaturation(saturation) {
  return Math.max(Math.min(100, saturation), 0);
}

function BoundLightness(lightness) {
  return Math.max(Math.min(100, lightness), 0);
}

function BoundOpacity(opacity) {
  return Math.max(Math.min(100, opacity), 0);
}

//https://www.30secondsofcode.org/js/s/hsl-to-rgb/
const HSLToRGB = (h, s, l) => {
  s /= 100;
  l /= 100;
  const k = n => (n + h / 30) % 12;
  const a = s * Math.min(l, 1 - l);
  const f = n => l - a * Math.max(-1, Math.min(k(n) - 3, Math.min(9 - k(n), 1)));
  return [255 * f(0), 255 * f(8), 255 * f(4)];
};

function ColorSet(variable, hue, saturation, lightness, opacity) {

  let RGBArray = HSLToRGB(BoundHue(hue), BoundSaturation(saturation), BoundLightness(lightness));
  let RGBAText = 'rgba(';
  let parameter = RGBAText.concat(RGBArray[0], ', ', RGBArray[1], ', ', RGBArray[2], ', ', BoundOpacity(opacity), ')');
  CSS_set(variable, parameter);
  Cookies.set(variable, parameter, {
    expires: 365,
    sameSite: 'strict'
  });
  //console.log(variable, hue, saturation, lightness, opacity, parameter)
}

function randomizePalette() {
  let HL = 0,
    HU = 360;
  let SL = 10,
    SU = 100;
  let LL = 10,
    LU = 80;
  let AL = 1,
    AU = 1;
  let H = getRandomInt(HL, HU);
  let S = getRandomInt(SL, SU);
  let L = getRandomInt(LL, LU);
  let A = getRandomInt(AL, AU);
  let HSLAText = 'hsla(';
  let newPalette = HSLAText.concat(H.toString(), ', ',
    S.toString(), ', ',
    L.toString(), ', ',
    A.toString(), ')');
  paletteSet(newPalette);
}

function visS(pS) {
  return Math.max(Math.min(pS, 100), 50)
}

function visL(pL) {
  return Math.max(Math.min(pL, 60), 30)
}

function paletteSet(colorPalette) {

  
  arrayHHSLA = (colorPalette).match(/\d+/g).map(Number);
  let pH = arrayHHSLA[0];
  let sH = arrayHHSLA[1];
  let pS = arrayHHSLA[2];
  let pL = arrayHHSLA[3];
  let pA = arrayHHSLA[4]
  Cookies.set("colorPalette", colorPalette, {
    expires: 365,
    sameSite: 'strict'
  });

  var hueSlider = document.getElementById("hue-slider");
  var hueSlider2 = document.getElementById("hue-slider-2");
  var saturationSlider = document.getElementById("saturation-slider");
  var lightnessSlider = document.getElementById("lightness-slider");

  hueSlider.value = pH; //primary hue
  hueSlider2.value = sH; //secondary hue
  saturationSlider.value = pS;
  lightnessSlider.value = pL;

  //sH = parseInt(hueSlider2.value); //secondary hue

  document.getElementById("hue-slider-value").innerText = pH;
  document.getElementById("hue-slider-value-2").innerText = sH;
  document.getElementById("saturation-slider-value").innerText = pS;
  document.getElementById("lightness-slider-value").innerText = pL;

  CSS_set('--slider--saturationlower', hslToHex(pH, 0, pL));
  CSS_set('--slider--saturationupper', hslToHex(pH, 100, pL));
  CSS_set('--slider--lightnesslower', hslToHex(pH, pS, 0));
  CSS_set('--slider--lightnessmiddle', hslToHex(pH, pS, 50));
  CSS_set('--slider--lightnessupper', hslToHex(pH, pS, 100));

  // lightmode = 1, darkmode = -1
  if (pL >= 35) {
    var colorMode = 1;
  } else {
    var colorMode = -1;
  }

  // 360 counts, 36=10%
  var hueSpread = 16 * colorMode
  var bgDesaturate = 35 - 5 * colorMode

  //   	set var name, 				hue,	 			saturation, 		lightness,			base opacity
  ColorSet('--colors--0', pH - 0 * hueSpread, visS(pS), visL(pL), pA)
  ColorSet('--colors--1', sH + 0 * hueSpread, visS(pS), visL(pL), pA)
  ColorSet('--colors--2', sH + 1 * hueSpread, visS(pS), visL(pL), pA)
  ColorSet('--colors--3', sH + 2 * hueSpread, visS(pS), visL(pL), pA)
  ColorSet('--colors--4', sH + 3 * hueSpread, visS(pS), visL(pL), pA)
  ColorSet('--colors--5', sH + 4 * hueSpread, visS(pS), visL(pL), pA)
  ColorSet('--colors--6', sH + 5 * hueSpread, visS(pS), visL(pL), pA)
  ColorSet('--colors--gray-1', pH, visS(100 * colorMode), visL(100 * colorMode), pA - 0.8)
  ColorSet('--colors--gray-2', pH, visS(100 * colorMode), visL(100 * colorMode), pA - 0.6)
  ColorSet('--colors--gray-3', pH, visS(100 * colorMode), visL(100 * colorMode), pA - 0.5)
  ColorSet('--colors--gray-4', pH, visS(100 * colorMode), visL(100 * colorMode), pA - 0.25)
  ColorSet('--colors--background', pH, pS - bgDesaturate, pL, pA)
  ColorSet('--colors--inversebg', pH + 180, pS - bgDesaturate, 100 - pL, pA)
  ColorSet('--colors--colormode', pH, 100, 100 * colorMode, pA)
  ColorSet('--colors--imversecolormode', pH, 100, -100 * colorMode, pA)

  if (getSwitchState("bwtextswitch") != 'unchecked') {
    ColorSet('--colors--text', sH + 360 * colorMode, visS(pS - 100 * colorMode), 50 - 50 * colorMode, pA);
  } else {
    ColorSet('--colors--text', sH + 360 * colorMode, visS(pS - 100 * colorMode), visL(pL - 100 * colorMode), pA);
  }
}

function validatePalette(possiblePalette){
  if (possiblePalette.slice(0,5) != 'hhsla'){
    console.log('invalid palette cookie ' + possiblePalette);
    return false;
  }
  try{
    arrayHHSLA = (possiblePalette).match(/\d+/g).map(Number);
  }
  catch{
    console.log('invalid palette cookie ' + possiblePalette);
    return false;
  }

  if (arrayHHSLA.some(isNaN)){
    console.log('invalid palette cookie ' + possiblePalette);
    return false;
  }

  return true;
}

function getPalette() {
  // Check if no color palette set, else set the palette
  let currentCookie = Cookies.get("colorPalette");

  if (validatePalette(currentCookie)) {
    return currentCookie;
  } else {
    return defaultPallette()
  }
}

function defaultPallette() {
  var getDefaultFromBody = document.querySelector('.body').attributes.colorPalette
  if (getDefaultFromBody != null) {
    return getDefaultFromBody.value
  } else {
    return "hhsla(232,248,100,43,1)"
  }
}

if (Cookies.get("bwtextswitch") == null) {
  setSwitchState("bwtextswitch", 'checked')
} else {
  setSwitchState("bwtextswitch", Cookies.get("bwtextswitch"))
}

setTimeout(function() {
  paletteSet(getPalette())
}, 10); //for button update animations


$("#bwtextswitch").on('click', function() {
  setTimeout(function() {
    paletteSet(getPalette());
    //console.log('clicked');
  }, 10);

});

$('.navbar-color').on('click', function() {
  let colorPalette = $(this).attr('data-colorpalette');
  paletteSet(colorPalette)
});

$(function() {
  let hueSlider = document.getElementById("hue-slider");
  let hueSlider2 = document.getElementById("hue-slider-2");
  let saturationSlider = document.getElementById("saturation-slider");
  let lightnessSlider = document.getElementById("lightness-slider");

  $('#hue-slider').on("input change", function() {
    document.getElementById("hue-slider-value").innerText = hueSlider.value;
    SliderUserUpdate();
  });

  $('#hue-slider-2').on("input change", function() {
    document.getElementById("hue-slider-value-2").innerText = hueSlider2.value;
    SliderUserUpdate();
  });


  $('#saturation-slider').on("input change", function() {
    document.getElementById("saturation-slider-value").innerText = saturationSlider.value;
    SliderUserUpdate();
  });

  $('#lightness-slider').on("input change", function() {
    document.getElementById("lightness-slider-value").innerText = lightnessSlider.value;
    SliderUserUpdate();
  });
});

function SliderUserUpdate() {
  let hueSlider = document.getElementById("hue-slider");
  let hueSlider2 = document.getElementById("hue-slider-2");
  let saturationSlider = document.getElementById("saturation-slider");
  let lightnessSlider = document.getElementById("lightness-slider");

  let hue = parseInt(hueSlider.value);
  let hue2 = parseInt(hueSlider2.value);
  let saturation = parseInt(saturationSlider.value);
  let lightness = parseInt(lightnessSlider.value);

  let HHSLAText = 'hhsla(';
  paletteSet(HHSLAText.concat(hue.toString(), ',', hue2.toString(), ',', saturation.toString(), ',', lightness.toString(), ',1)'));
  //sliderColorBoundsSet(hue, saturation, lightness);

}

/*
function sliderColorBoundsSet(hue, saturation, lightness) {

  //hue doesn't update

  CSS_set('--slider--saturationlower', hslToHex(hue, 0, lightness));
  CSS_set('--slider--saturationupper', hslToHex(hue, 100, lightness));
  CSS_set('--slider--lightnesslower', hslToHex(hue, saturation, 0));
  CSS_set('--slider--lightnessmiddle', hslToHex(hue, saturation, 50));
  CSS_set('--slider--lightnessupper', hslToHex(hue, saturation, 100));

}
*/

function hslToHex(h, s, l) { //https://stackoverflow.com/questions/36721830/convert-hsl-to-rgb-and-hex
  l /= 100;
  const a = s * Math.min(l, 1 - l) / 100;
  const f = n => {
    const k = (n + h / 30) % 12;
    const color = l - a * Math.max(Math.min(k - 3, 9 - k, 1), -1);
    return Math.round(255 * color).toString(16).padStart(2, '0'); // convert to Hex and prefix "0" if needed
  };
  return `#${f(0)}${f(8)}${f(4)}`;
}

function getSwitchState(Id) {
  if (document.getElementById(Id) != null) {
    let classList = document.getElementById(Id).children[0].classList;
    let state = 'unchecked';
    for (const sliderClass of Array.from(classList)) {
      if (sliderClass == 'w--redirected-checked') {
        state = 'checked';
      }
    }
    Cookies.set(Id, state, {
      expires: 365,
      sameSite: 'strict'
    });
    return state;
  } else {
    return null
  }
}

function setSwitchState(Id, goalState) {
  if (document.getElementById(Id) != null) {
    let classList = document.getElementById(Id).children[0].classList;
    if (goalState == 'checked' & getSwitchState(Id) != 'checked') {
      classList.add('w--redirected-checked')

    }
    if (goalState == 'unchecked' & getSwitchState(Id) != 'unchecked') {
      classList.remove('w--redirected-checked')
    }
    Cookies.set(Id, goalState, {
      expires: 365,
      sameSite: 'strict'
    })
  }
}

CSS_set('--fonts--simsun', 'simsun')
document.getElementById("simsun").style.fontFamily = 'simsun'

CSS_set('--fonts--comicsansms', 'comicsansms')
document.getElementById("comicsansms").style.fontFamily = 'comicsansms'

CSS_set('--fonts--possibilityboldweb', 'possibilityboldweb')
document.getElementById("possibilityboldweb").style.fontFamily = 'possibilityboldweb'


// Check if no font family set, else set the font family
if (Cookies.get("fontFamily") == null) {
  fontFamilySet('Inter');
} else {
  fontFamilySet(Cookies.get("fontFamily"))
} // 

$('.navbar-font').on('click', function() {
  let fontFamily = $(this).attr('data-fontselected');
  fontFamilySet(fontFamily)
});

function fontFamilySet(fontFamily) {
  let fontCollection = document.getElementsByClassName("navbar-font");
  Array.from(fontCollection).forEach(function(element) {
    element.classList.remove('underlined')
  });

  document.getElementById(fontFamily).classList.add('underlined');
  Cookies.set("fontFamily", fontFamily, {
    expires: 365,
    sameSite: 'strict'
  });
  CSS_set('--fonts--current-font', fontFamily);
}

function randomizeFont() {
  let currentFont = Cookies.get("fontFamily");
  let fontCollection = document.getElementsByClassName("navbar-font");
  const validRandomFontNames = []
  Array.from(fontCollection).forEach(function(element) {
    if (element.id != currentFont) {
      validRandomFontNames.push(element.id);
    }
  });
  let randomFontIndex = getRandomInt(0, validRandomFontNames.length);
  let randomFont = validRandomFontNames[randomFontIndex];
  fontFamilySet(randomFont);

}

$('.randomcube').on('click', function() {
  let attrToRandomize = $(this).attr('data-randomize');
  if (attrToRandomize == 'design') { //randomizeDesign();
    randomizePalette();
    randomizeFont();
  }
  if (attrToRandomize == 'color') {
    randomizePalette();
  }
  if (attrToRandomize == 'font') {
    randomizeFont();
  }
});

if (document.getElementById('rtsmapdarkmode') != null) {
  var darkmodemap = document.getElementById('rtsmapdarkmode');
  var lightmodemap = document.getElementById('rtsmaplightmode');
  
  if (getPalette().match(/\d+/g).map(Number)[2] > 35) {
    var maptoremove = darkmodemap;
  } else {
    var maptoremove = lightmodemap;
  }
  maptoremove.setAttribute("style", "display: none");
  maptoremove.style.display = "none";
}
