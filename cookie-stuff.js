function GetCookie(name){
  const arg = name + "=";
  const alen = arg.length;
  const clen = document.cookie.length;
  let i = 0;
  while (i < clen) {
    const j = i + alen;
    if (document.cookie.substring(i, j) == arg) return getCookieVal(j);
    
    i = document.cookie.indexOf(" ", i) + 1;
    if (i == 0) break;
  }
  return null;
}

/*
A cookie value cannot contain semicolons,
commas, or spaces. For this reason, you
will need to use the JavaScript's built-in
function encodeURIComponent() to encode
the values containing these characters
before storing it in the cookie. Likewise,
you'll need to use the corresponding
decodeURIComponent() function when you
read the cookie value.
*/
function SetCookie(name, value) {
  const argv = SetCookie.arguments;
  const argc = SetCookie.arguments.length;
  const expires = (argc > 2) ? argv[2] : null;
  const path = (argc > 3) ? argv[3] : null;
  const domain = (argc > 4) ? argv[4] : null;
  const secure = (argc > 5) ? argv[5] : false;
  document.cookie = name + "=" + encodeURIComponent(value) +
  ((expires == null) ? "" : ("; expires=" + expires.toGMTString())) +
  ((path == null) ? "" : ("; path=" + path)) +
  ((domain == null) ? "" : ("; domain=" + domain)) +
  ((secure == true) ? "; secure" : "");
}

function DeleteCookie(name) {
  const exp = new Date();
  exp.setTime(exp.getTime() - 1);
  const cval = GetCookie(name);
  document.cookie = name + "=" + cval + "; expires=" + exp.toGMTString();
}

const expDays = 30;
const exp = new Date();
exp.setTime(exp.getTime() + (expDays*24*60*60*1000));

function amt(){
  const count = GetCookie('count')
  if(count == null) {
    SetCookie('count','1')
    return 1
    }
    else {
    const newcount = parseInt(count) + 1;
    DeleteCookie('count')
    SetCookie(`count${newcount}`, exp)
    return count
  }
}

function getCookieVal(offset) {
  const endstr = document.cookie.indexOf (";", offset);
  if (endstr == -1)
  endstr = document.cookie.length;
  return decodeURIComponent(document.cookie.substring(offset, endstr));
}

/*
from https://www.tutorialrepublic.com/javascript-tutorial/javascript-cookies.php
            ||
            ||
            ||
           \  /
            \/
*/

function setCookie(name, value, daysToLive) {
  // Encode value in order to escape semicolons, commas, and whitespace
  const cookie = name + "=" + encodeURIComponent(value);

  if (typeof daysToLive === "number") {
    /* Sets the max-age attribute so that the cookie expires
    after the specified number of days */
    cookie += "; max-age=" + (daysToLive * 24 * 60 * 60);

    document.cookie = cookie;
  }
}