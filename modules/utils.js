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
      'Aliqte a tortor. Duis et lacus id eros ultricies varius. Donec quis erat vel augue convallis finibus sed vitae massa.',
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
      'Aliqte a tortor. Duis et lacus id eros ultricies varius. Donec quis erat vel augue convallis finibus sed vitae massa.',
    players: 4,
    boardDefault: [
      [9, 9, 9, 9],
      [9, 9, 9, 9],
      [9, 9, 9, 9],
    ],
  },
  {
    id: '3',
    title: 'Echec',
    cover: require('../modules/images/echec.jpg'),
    description:
      'Aliqte a tortor. Duis et lacus id eros ultricies varius. Donec quis erat vel augue convallis finibus sed vitae massa.',
    players: 1,
    boardDefault: [
      [9, 9, 9],
      [9, 9, 9],
      [9, 9, 9],
    ],
  },
];
