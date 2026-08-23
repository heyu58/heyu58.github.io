(function () {
  'use strict';

  // 目录当前项高亮
  var toc = document.querySelector('.toc');
  if (!toc) return;

  var links = toc.querySelectorAll('a.toc-link');
  var headings = [];

  links.forEach(function (link) {
    var id = decodeURIComponent((link.getAttribute('href') || '').replace(/^#/, ''));
    if (!id) return;
    var el = document.getElementById(id);
    if (el) headings.push({ el: el, link: link });
  });

  if (!headings.length) return;

  function clearActive() {
    headings.forEach(function (h) { h.link.classList.remove('active'); });
  }

  if ('IntersectionObserver' in window) {
    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        clearActive();
        headings.forEach(function (h) {
          if (h.el === entry.target) h.link.classList.add('active');
        });
      });
    }, { rootMargin: '-20% 0px -70% 0px' });
    headings.forEach(function (h) { observer.observe(h.el); });
  }
})();
