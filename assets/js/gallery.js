"use strict";

const initGallery = async () => {
  const gallery = document.getElementById('gallery');
  if (!gallery) return;
  
  const galleryHTML = ({ id, title, url, img, name, creatorUrl }) => `
    <div id="${id}" class="gallery-links">
      <div class="img-container">
        <a href="${url}" target="_blank" rel="noopener noreferrer">
          <img src="${img}" alt="${title}">
          <h4>${title}</h4>
        </a>
        <h5>by <a href="${creatorUrl}" target="_blank" rel="noopener noreferrer">${name}</a></h5>
      </div>
    </div>`;
  
  /* TODO Refactoring jsonp to proper JSON with CORS. */
  // Static _gallery
  if (typeof _gallery !== 'undefined') {
    gallery.insertAdjacentHTML(
      'beforeend',
      Object.values(_gallery)
        .slice(0, 32)
        .map(e =>
          galleryHTML({
            id: `static-${e.id}`,
            title: e.name,
            url: e.public_url,
            img: e.thumbnail,
            name: e.creator.name,
            creatorUrl: e.creator.public_url,
          })
        )
        .join('')
    );
  }
  
  // JSON files
  try {
    const [thingiverse_gallery, thingiverse_recent] = await Promise.all([
      fetch('inc/thingiverse-gallery.json').then(r => r.json()),
      fetch('inc/thingiverse-recent.json').then(r => r.json()),
    ]);
    
    let things = (thingiverse_gallery || []).concat(thingiverse_recent || []);
    things = things.slice(0, 32);
    gallery.insertAdjacentHTML(
      'beforeend',
      things
        .map(v => {
          const img = v.thumbnail.replace('thumb_medium', 'preview_featured');
          return galleryHTML({
            id: v.id,
            title: v.name,
            url: v.public_url,
            img,
            name: v.creator.name,
            creatorUrl: v.creator.public_url,
          });
        })
        .join('')
    );
  } catch (e) {
    console.warn('Gallery JSON load failed:', e);
  }
};

// Failsafe loading pattern.
if(document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initGallery);
} else {
  initGallery().then();
}


let _gallery;
/**
 * TODO
 * Used for legacy cross loading https://files.openscad.org/lists/gallery.jsonp
 */
function gallery(data) {
    _gallery = data;
}
