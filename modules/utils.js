export const winningConditions = [
  [
    [0, 0],
    [0, 1],
    [0, 2],
  ],
  [
    [1, 0],
    [1, 1],
    [1, 2],
  ],
  [
    [2, 0],
    [2, 1],
    [2, 2],
  ],
  [
    [0, 0],
    [1, 0],
    [2, 0],
  ],
  [
    [0, 1],
    [1, 1],
    [2, 1],
  ],
  [
    [0, 2],
    [1, 2],
    [2, 2],
  ],
  [
    [0, 0],
    [1, 1],
    [2, 2],
  ],
  [
    [0, 2],
    [1, 1],
    [2, 0],
  ],
];

export const dataGameBox = [
  {
    id: '1',
    title: 'Morpion',
    cover: require('../modules/images/morpion.jpg'),
    description:
      'Le tic-tac-toe, aussi appelé « morpion » et « oxo » en Belgique, est un jeu de réflexion se pratiquant à deux joueurs au tour par tour dont le but est de créer le premier un alignement.',
    players: 2,
    boardDefault: [
      [9, 9, 9],
      [9, 9, 9],
      [9, 9, 9],
    ],
  },
  {
    id: '2',
    title: 'Picollo',
    cover: require('../modules/images/picollo.jpeg'),
    description:
      'En groupe ou à tour de rôle, vous devrez répondre à des questions et suivre ses indications parfois déjantées.',
    players: 4,
    boardDefault: [
      [9, 9, 9, 9],
      [9, 9, 9, 9],
      [9, 9, 9, 9],
    ],
  },
  {
    id: '3',
    title: 'Simon',
    cover: require('../modules/images/simon_says.png'),
    description:
      'Simon est un jeu de société électronique de forme circulaire comportant quatre grosses touches de couleurs différentes : rouge, vert, bleu et jaune.',
    players: 1,
    boardDefault: [
      [9, 9, 9],
      [9, 9, 9],
      [9, 9, 9],
    ],
  },
];
