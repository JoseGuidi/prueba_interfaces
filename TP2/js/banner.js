document.addEventListener('DOMContentLoaded', function () {
    const banners = document.querySelectorAll('.bannerCompu');
    const pelotitas = document.querySelectorAll('.pelotitas_banners .pelotita');
  
    let indiceact = 0; 
    let transicion = false; 
  
    function mostrarBanner(indice) {
      transicion = true; 
  
      banners.forEach((banner, i) => {
        if (i === indice) {
          banner.style.display = 'flex';
        } else {
          banner.style.display = 'none';
        }
      });
  
      pelotitas.forEach((pelotita, i) => {
        if (i === indice) {
          pelotita.classList.add('active');
        } else {
          pelotita.classList.remove('active');
        }
      });
  

      setTimeout(() => {
        transicion = false;
      }, 1000); 
    }

    mostrarBanner(0);

    pelotitas.forEach((pelotita, indice) => {
      pelotita.addEventListener('click', () => {
        indiceact = indice;
        mostrarBanner(indiceact);
      });
    });
  

    setInterval(() => {
      if (!transicion) {
        indiceact = (indiceact + 1) % banners.length;
        mostrarBanner(indiceact);
      }
    }, 5000); 
  });