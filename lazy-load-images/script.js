// on document's loaded event, this script queries the DOM for all 
// img elements 
/*
document.addEventListener("DOMContentLoaded", function() {
  const lazyImgs = [].slice.call(document.querySelectorAll("img.lazy"));

  if("Intersection Observer" in window) {
    const lazyImgObserver = new IntersectionObserver((entries, observer) =>  {
      entries.forEach(entry => {
        if(entry.isIntersecting) {
          const lazyImg = entry.target;
          lazyImg.src = lazyImg.dataset.src;
          lazyImg.classList.remove("lazy");
          lazyImgObserver.unobserve(lazyImg);
        }
      })
    })

    lazyImgs.forEach(lazyImage => {
      lazyImgObserver.observe(lazyImage);
    });
  } else {
    // Possibly fallbacks to event handlers here
  }
})
*/

document.addEventListener("DOMContentLoaded", function() {
  // 1- get all lazy loading images
  var lazyImages = [].slice.call(document.querySelectorAll("img.lazy"));

  // if browser supports IntersectionObserver API
  if ("IntersectionObserver" in window &&
      "IntersectionObserverEntry" in window &&
      "intersectionRatio" in window.IntersectionObserverEntry.prototype
      ) {

    // create an Observer Instance
    let lazyImageObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        // if the current image is in the viewport
        if(entry.isIntersecting) {
          let lazyImage = entry.target;
          lazyImage.src = lazyImage.dataset.src;
          lazyImage.classList.remove("lazy");
          lazyImageObserver.unobserve(lazyImage);
        }
      })
    })

    // 2- iterate over images and feed them to Intersection Observer.
    lazyImages.forEach(function(lazyImage) {
      lazyImageObserver.observe(lazyImage);
    });
  } else {
    // if browser does not support the Intersection Observer, 
    // it means we better write our code targeting ES5. 
    var _lazyImages = [].slice.call(document.querySelectorAll("img.lazy"));
    var _active = false;

    var _lazyLoad = function() {
      if (_active === false) {
        _active = true;

        // to optimize as much as we can, we use setTimeout,
        // this way we check the viewport every 250 ms.
        setTimeout(function() {
          _lazyImages.forEach(function(lazyImage) {
            if ((lazyImage.getBoundingClientRect().top <= window.innerHeight &&
                 lazyImage.getBoundingClientRect().bottom >= 0) &&
                getComputedStyle(lazyImage).display !== "none") {

              lazyImage.src = lazyImage.dataset.src;
              lazyImage.srcset = lazyImage.dataset.srcset;
              lazyImage.classList.remove("lazy");

              _lazyImages = _lazyImages.filter(function(image) {
                return image !== lazyImage;
              });

              if (_lazyImages.length === 0) {
                document.removeEventListener("scroll", _lazyLoad);
                window.removeEventListener("resize", _lazyLoad);
                window.removeEventListener("orientationchange", _lazyLoad);
              }
            }
          });

          _active = false;
        }, 250);
      }
    };

    document.addEventListener("scroll", lazyLoad);
    window.addEventListener("resize", lazyLoad);
    window.addEventListener("orientationchange", lazyLoad);
  }
});