const obj = [{
  id: 1,
  name: 'Romulo Silva',
  email: 'romuloTop556@email.com',
  password: '475869',
  role: 'comum',
},
{
  id: 2,
  name: 'Caioba',
  email: 'caioba24@email.com',
  password: '123456',
  role: 'admin',
  },
  {
    id: 3,
    name: 'Sérgião',
    email: 'sergiao24@email.com',
    password: '24242424242424',
    role: 'comum',
  },
  {
    id: 4,
    name: 'Tardin',
    email: 'Tardin021@email.com',
    password: '789456321',
    role: 'admin',
  },
  {
    id: 5,
    name: 'Matheus',
    email: 'Matheus021@email.com',
    password: '616461651212',
    role: 'comum',
  },
];

module.exports = {
  async up(queryInterface, _Sequelize) {
    await queryInterface.bulkInsert('users', obj, { timestamps: false });
  },

  async down(queryInterface, _Sequelize) {
    await queryInterface.bulkDelete('users', null, {});
  },
};
