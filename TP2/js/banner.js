document.addEventListener('DOMContentLoaded', function () {
  const contenedor = document.querySelector(".contenedor_general");
  const banners = document.querySelectorAll('.bannerCompu');
  const bannersCelu = document.querySelectorAll('.bannerCelu');
  const pelotitas = document.querySelectorAll('.pelotitas_banners .pelotita');
  let arraybanners;
  let indiceact = 0;
  let transicion = false;

  function mostrarBanner(indice) {
      transicion = true;

      if (contenedor.clientWidth <= 600) {
          arraybanners = bannersCelu;
          banners.forEach((banner) => {
              banner.style.display = 'none';
          });
      } else {
          arraybanners = banners;
          bannersCelu.forEach((banner) => {
              banner.style.display = 'none';
          });
      }

      arraybanners.forEach((banner, i) => {
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

  function handleResize() {
      mostrarBanner(indiceact);
  }

  mostrarBanner(0);

  pelotitas.forEach((pelotita, indice) => {
      pelotita.addEventListener('click', () => {
          indiceact = indice;
          mostrarBanner(indiceact);
      });
  });

  window.addEventListener('resize', handleResize);

  setInterval(() => {
      if (!transicion) {
          indiceact = (indiceact + 1) % banners.length;
          mostrarBanner(indiceact);
      }
  }, 5000);
});
