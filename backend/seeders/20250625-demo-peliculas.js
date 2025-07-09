'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    // Borra todo antes de insertar para evitar duplicados
    await queryInterface.bulkDelete('Peliculas', null, {});

    await queryInterface.bulkInsert('Peliculas', [
      {
        titulo: 'El juego del calamar',
        año: 2021,
        genero: 'Suspenso',
        director: 'Hwang Dong-hyuk',
        portada: 'https://pics.filmaffinity.com/squid_game-688981365-large.jpg',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        titulo: 'Friendly Rivalry',
        año: 2024,
        genero: 'Comedia',
        director: 'Ha min',
        portada: 'https://m.media-amazon.com/images/M/MV5BOGZlYzM3YjgtMjI3OC00MDc5LWE3ZjAtNDdiMmE1OGY0MWUzXkEyXkFqcGc@._V1_.jpg',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        titulo: 'Pablo Escobar',
        año: 2012,
        genero: 'Biografía',
        director: 'Carlos Moreno',
        portada: 'https://m.media-amazon.com/images/M/MV5BNTdmZjEyMzktNGMzNS00ZWMyLTljNGMtOTA1ZTNlMzkwZDk0XkEyXkFqcGc@._V1_FMjpg_UX1000_.jpg',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        titulo: 'Stranger Things',
        año: 2016,
        genero: 'Ciencia ficción',
        director: 'The Duffer Brothers',
        portada: 'https://i.pinimg.com/originals/fc/23/a8/fc23a8ee29b16b9fd90c73f78ead2154.jpg',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        titulo: 'The Umbrella Academy',
        año: 2019,
        genero: 'Superhéroes',
        director: 'Steve Blackman',
        portada: 'https://es.web.img3.acsta.net/pictures/18/12/10/14/01/0178829.jpg',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        titulo: 'Snowpiercer',
        año: 2020,
        genero: 'Ciencia ficción',
        director: 'Graeme Manson',
        portada: 'https://i.pinimg.com/736x/5f/e2/60/5fe260da8e6a97b4f132d09401f5e8bf.jpg',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        titulo: 'Supacell',
        año: 2024,
        genero: 'Superpoderes',
        director: 'Rapman',
        portada: 'https://m.media-amazon.com/images/M/MV5BNjk1MGM0ZmMtOGYwYS00ZTdiLTgxYzItOGM1NTZmNGEwMGI4XkEyXkFqcGc@._V1_FMjpg_UX1000_.jpg',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        titulo: 'El plan del diablo',
        año: 2023,
        genero: 'Reality',
        director: 'Jeong Jong-yeon',
        portada: 'https://www.lavanguardia.com/peliculas-series/images/serie/poster/2023/9/w1280/q8ED7O2RM5pXCafMQuBKragWqPz.jpg',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        titulo: 'El juego del calamar: El desafío',
        año: 2023,
        genero: 'Reality',
        director: 'Hwang Dong-hyuk',
        portada: 'https://www.lavanguardia.com/peliculas-series/images/serie/poster/2023/11/w1280/AvOcYB2lcqRFvhq3ybJlcXgpRRu.jpg',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        titulo: 'The 8 Show',
        año: 2024,
        genero: 'Suspenso',
        director: 'Han Jae-rim',
        portada: 'https://hips.hearstapps.com/hmg-prod/images/the8show-664747f8794eb.jpg',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        titulo: 'The Rain',
        año: 2018,
        genero: 'Postapocalíptico',
        director: 'Jannik Tai Mosholt',
        portada: 'https://www.aceprensa.com/wp-content/uploads/2018/05/76719-1.jpg',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        titulo: 'Drive to Survive: Fórmula 1',
        año: 2019,
        genero: 'Documental',
        director: 'James Gay-Rees',
        portada: 'https://i.pinimg.com/1200x/1c/a5/0a/1ca50aacd03a855b411cb536fc22acbf.jpg',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        titulo: 'Metegol',
        año: 2013,
        genero: 'Animación',
        director: 'Juan José Campanella',
        portada: 'https://saltacine.gob.ar/2024/wp-content/uploads/sites/7/2024/06/Afiche-Metegol.jpg',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        titulo: 'Frieren',
        año: 2023,
        genero: 'Anime',
        director: 'Keiichiro Saito',
        portada: 'https://ramenparados.com/wp-content/uploads/2023/08/Frieren_KV3.jpg',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        titulo: 'Black Clover',
        año: 2017,
        genero: 'Anime',
        director: 'Tatsuya Yoshihara',
        portada: 'https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEg9-eA7vuVu7oRfIaBilYNFBM1TLieJNAsoPBN_xbXHbRx6DUol5pZO3clnjF2_QUCNK8zu-S71vyAIoLi6i9RclM0ugy8FiljWj6IauWEAQi1RVi_1C5vAr2ETdrMbsKwJ-zVjFpVMYT2a-3mzQf4nfSk5Gy6fDzcsDPO7uYLfoc-jbmP5kjBOK51BOQ/s2048/black-clover-sword-of-the-wizard-1.jpg',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        titulo: 'The Rising of the Shield Hero',
        año: 2019,
        genero: 'Anime',
        director: 'Takao Abo',
        portada: 'https://pics.filmaffinity.com/tate_no_yuusha_no_nariagari-959299997-large.jpg',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        titulo: 'Jeffrey Dahmer',
        año: 2022,
        genero: 'Crimen',
        director: 'Ryan Murphy',
        portada: 'https://pbs.twimg.com/media/Fcx-bO-XgAMD_B6.jpg:large',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        titulo: 'Monstruos: La historia de Lyle y Erik Menendez',
        año: 2024,
        genero: 'Crimen',
        director: 'Ryan Murphy',
        portada: 'https://www.lavanguardia.com/peliculas-series/images/serie/poster/2024/9/w1280/ziGwbvZvcyy8i3cYNUCDLkQGsU0.jpg',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        titulo: 'Damsel',
        año: 2024,
        genero: 'Fantasía',
        director: 'Juan Carlos Fresnadillo',
        portada: 'https://pics.filmaffinity.com/Damsel-226701907-large.jpg',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        titulo: 'The Witcher',
        año: 2019,
        genero: 'Fantasía',
        director: 'Lauren Schmidt Hissrich',
        portada: 'https://es.web.img2.acsta.net/pictures/19/11/22/09/33/5060052.jpg',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        titulo: 'Ragnarok',
        año: 2020,
        genero: 'Mitología nórdica',
        director: 'Adam Price',
        portada: 'https://pics.filmaffinity.com/ragnarok-867341788-large.jpg',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        titulo: 'Los Vengadores',
        año: 2012,
        genero: 'Superhéroes',
        director: 'Joss Whedon',
        portada: 'https://es.web.img2.acsta.net/pictures/19/03/26/17/22/0896830.jpg',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        titulo: 'Iron Man',
        año: 2008,
        genero: 'Superhéroes',
        director: 'Jon Favreau',
        portada: 'https://pics.filmaffinity.com/iron_man_3_aka_ironman_3-327056153-large.jpg',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        titulo: 'Thor',
        año: 2011,
        genero: 'Superhéroes',
        director: 'Kenneth Branagh',
        portada: 'https://m.media-amazon.com/images/I/81nLIF+eJ7L._UF1000,1000_QL80_.jpg',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        titulo: 'Alice in Borderland',
        año: 2020,
        genero: 'Ciencia ficción',
        director: 'Shinsuke Sato',
        portada: 'https://i.pinimg.com/originals/9b/d1/e1/9bd1e19456230ff13f6a34da90fb4f55.jpg',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        titulo: 'Dulce hogar',
        año: 2020,
        genero: 'Terror',
        director: 'Lee Eung-bok',
        portada: 'https://m.media-amazon.com/images/M/MV5BZDE0MTM5YjgtMzNhOS00NWE2LTkxN2EtMzg0NWRmODBmMDA5XkEyXkFqcGc@._V1_.jpg',
        createdAt: new Date(),
        updatedAt: new Date()
      },
    ], {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Peliculas', null, {});
  }
};
