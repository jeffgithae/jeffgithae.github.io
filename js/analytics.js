// analytics.js
// Simple click-tracking that sends events to Google Analytics (gtag)
// Replace 'G-XXXXXXX' in index.html with your Measurement ID and verify in GA4 console.

;(function () {
  if (typeof window.gtag !== 'function') {
    // gtag not yet loaded — create a stub to queue events until the real gtag is ready
    window.dataLayer = window.dataLayer || [];
    window.gtag = function () { window.dataLayer.push(arguments); };
  }

  function sendClickEvent(action, label, category) {
    try {
      window.gtag('event', action, {
        event_category: category || 'engagement',
        event_label: label || undefined,
        transport_type: 'beacon'
      });
    } catch (e) {
      // fail quietly — tracking should not break the site
      console.warn('gtag event failed', e);
    }
  }

  // Generic click handler — captures clicks on anchors and buttons
  document.addEventListener('click', function (ev) {
    var el = ev.target;
    // climb up the tree to find a clickable element
    var node = el.closest ? el.closest('a, button, input[type="button"], input[type="submit"]') : null;
    if (!node) return;

    var tagName = node.tagName.toLowerCase();
    var label = '';
    var category = '';
    var href = node.getAttribute && node.getAttribute('href');

    if (tagName === 'a') {
      label = node.textContent && node.textContent.trim() || href || node.id || node.className;
      // mark mailto/tel as contact, external links as outbound
      if (href && (href.indexOf('mailto:') === 0 || href.indexOf('tel:') === 0)) {
        category = 'contact';
      } else if (href && (href.indexOf(location.origin) === -1 && href.indexOf('http') === 0)) {
        category = 'outbound';
      } else {
        category = 'navigation';
      }
      sendClickEvent('click_link', label, category);
    } else if (tagName === 'button' || (node.type && (node.type === 'submit' || node.type === 'button'))) {
      label = node.textContent && node.textContent.trim() || node.value || node.id || node.className;
      category = 'button';
      sendClickEvent('click_button', label, category);
    }
  }, false);

  // Optional: track form submissions (contact form)
  var form = document.getElementById('myForm');
  if (form) {
    form.addEventListener('submit', function (ev) {
      // send an event; allow form to submit normally
      sendClickEvent('submit_contact_form', 'contact form', 'form');
    });
  }
})();
