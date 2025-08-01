
  const images = [
    '../home/imgs/personal/MAL-2Final.png',
    '../home/imgs/personal/MAL-3.png',
    '../home/imgs/personal/MAL-4.png',
    '../home/imgs/personal/MAL1.png',
    '../home/imgs/personal/WLG2REAL.png',
    '../home/imgs/work/CruelOilBlaizunDiamond.jpg',
    '../home/imgs/work/NailClippersBlaizunDiamond.jpg',
    '../home/imgs/work/SwankyCover-1.jpg',
    '../home/imgs/IMGClass/1.png',
    '../home/imgs/IMGClass/8.png',
    '../home/imgs/IMGClass/10.png',
    '../home/imgs/IMGClass/DumbJealous.png',
    '../home/imgs/IMGClass/FeelsLikeADream.png',
    '../home/imgs/IMGClass/honestly.png',
    '../home/imgs/IMGClass/Iknowyouredownbad.png',
    '../home/imgs/IMGClass/JumpedInTooDeepREALFINAL.png',
    '../home/imgs/IMGClass/proj7.png',
    '../home/imgs/IMGClass/Proj8Insta.png',
    '../home/imgs/IMGClass/proj9.png',
    '../home/imgs/IMGClass/ReachingOutToMe.png',


    // Add more image sources as needed
  ];
  const container = document.getElementById('imageContainer');

  images.forEach((src) => {
    const card = document.createElement('div');
    card.classList.add("card");
    const imgElement = document.createElement('img');
    imgElement.src = src;
    card.appendChild(imgElement);
    container.appendChild(card);
  });

  