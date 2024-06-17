class Entity {
  constructor(info) {
    this.info = {
      ...info,
      currentHp: info.maxHp,
      cd: info.atkDelay,
      cdDelay: false,
    };
  }

  dealDmg(to, types, finalPercent = 100) {
    const currInfo = this.info;
    const currTypes = types ?? currInfo.types;
    const enemyInfo = to.info;
    let percentNum = 0;
    for (let i = 0; currTypes.length > i; i += 1) {
      const currElemDmg = currInfo.elementPercents[currTypes[i]].dmg;
      const enemyElemRes = enemyInfo.elementPercents[currTypes[i]].resistance;
      percentNum += currElemDmg - enemyElemRes;
    }
    enemyInfo.currentHp -=
      currInfo.baseAtk * (percentNum / 100) * (finalPercent / 100);
  }
}

const createElementPercents = (dmg, resistance) => ({ dmg, resistance });
function getEnemiesStage(stage) {
  return [...stageEnemyNames[stage - 1]]
    .reverse()
    .map((enemyName) => new Entity(entities[enemyName]));
}
const entities = {
  player: {
    imgUrl: "./img/entity_player_female.png",
    types: ["****"],
    maxHp: 100,
    baseAtk: 15,
    atkDelay: 0,
    elementPercents: {
      water: createElementPercents(100, 0),
      fire: createElementPercents(100, 0),
      air: createElementPercents(100, 0),
      earth: createElementPercents(100, 0),
    },
  },
  fireGolem: {
    imgUrl: "./img/entity_fireGolem.png",
    types: ["fire"],
    maxHp: 60,
    baseAtk: 10,
    atkDelay: 10,
    elementPercents: {
      water: createElementPercents(0, -100),
      fire: createElementPercents(200, 100),
      air: createElementPercents(0, 75),
      earth: createElementPercents(0, 50),
    },
  },
  turtle: {
    imgUrl: "./img/entity_turtle.png",
    types: ["water", "earth"],
    maxHp: 45,
    baseAtk: 10,
    atkDelay: 10,
    elementPercents: {
      water: createElementPercents(150, 100),
      fire: createElementPercents(0, -100),
      air: createElementPercents(0, 0),
      earth: createElementPercents(50, 50),
    },
  },
  waterElemental: {
    imgUrl: "./img/entity_waterElemental.png",
    types: ["water"],
    maxHp: 60,
    baseAtk: 15,
    atkDelay: 10,
    elementPercents: {
      water: createElementPercents(200, 100),
      fire: createElementPercents(0, -100),
      air: createElementPercents(0, 0),
      earth: createElementPercents(0, 75),
    },
  },
  kraken: {
    imgUrl: "./img/entity_kraken.png",
    types: ["water", "earth"],
    maxHp: 65,
    baseAtk: 15,
    atkDelay: 10,
    elementPercents: {
      water: createElementPercents(100, 100),
      fire: createElementPercents(0, -100),
      air: createElementPercents(0, 100),
      earth: createElementPercents(0, 75),
    },
  },
  waterSnake: {
    imgUrl: "./img/entity_waterSnake.png",
    types: ["water"],
    maxHp: 80,
    baseAtk: 25,
    atkDelay: 7,
    elementPercents: {
      water: createElementPercents(250, 100),
      fire: createElementPercents(0, -100),
      air: createElementPercents(0, 100),
      earth: createElementPercents(0, 100),
    },
  },
  tree: {
    imgUrl: "./img/entity_tree.png",
    types: ["earth"],
    maxHp: 75,
    baseAtk: 25,
    atkDelay: 7,
    elementPercents: {
      water: createElementPercents(25, 100),
      fire: createElementPercents(0, -150),
      air: createElementPercents(0, 100),
      earth: createElementPercents(200, 100),
    },
  },
  spider: {
    imgUrl: "./img/entity_spider.png",
    types: ["earth"],
    maxHp: 70,
    baseAtk: 15,
    atkDelay: 7,
    elementPercents: {
      water: createElementPercents(0, 25),
      fire: createElementPercents(0, -100),
      air: createElementPercents(0, 75),
      earth: createElementPercents(150, 100),
    },
  },
  earthGolem: {
    imgUrl: "./img/entity_earthGolem.png",
    types: ["earth"],
    maxHp: 100,
    baseAtk: 25,
    atkDelay: 6,
    elementPercents: {
      water: createElementPercents(0, -75),
      fire: createElementPercents(0, 100),
      air: createElementPercents(0, 25),
      earth: createElementPercents(225, 100),
    },
  },
  yeti: {
    imgUrl: "./img/entity_yeti.png",
    types: ["water", "earth"],
    maxHp: 75,
    baseAtk: 25,
    atkDelay: 7,
    elementPercents: {
      water: createElementPercents(100, 75),
      fire: createElementPercents(0, -75),
      air: createElementPercents(25, 100),
      earth: createElementPercents(25, 75),
    },
  },
  harpy: {
    imgUrl: "./img/entity_harpy.png",
    types: ["air", "earth"],
    maxHp: 85,
    baseAtk: 25,
    atkDelay: 5,
    elementPercents: {
      water: createElementPercents(0, 25),
      fire: createElementPercents(0, -100),
      air: createElementPercents(150, 100),
      earth: createElementPercents(50, 75),
    },
  },
  airElemental: {
    imgUrl: "./img/entity_airElemental.png",
    types: ["air", "water"],
    maxHp: 115,
    baseAtk: 20,
    atkDelay: 7,
    elementPercents: {
      water: createElementPercents(100, 100),
      fire: createElementPercents(0, -75),
      air: createElementPercents(200, 100),
      earth: createElementPercents(50, 50),
    },
  },
  fireElemental: {
    imgUrl: "./img/entity_fireElemental.png",
    types: ["fire"],
    maxHp: 85,
    baseAtk: 50,
    atkDelay: 7,
    elementPercents: {
      water: createElementPercents(0, -100),
      fire: createElementPercents(200, 100),
      air: createElementPercents(0, 75),
      earth: createElementPercents(0, 50),
    },
  },
  ashenDevil: {
    imgUrl: "./img/entity_ashenDevil.png",
    types: ["fire", "earth"],
    maxHp: 115,
    baseAtk: 40,
    atkDelay: 7,
    elementPercents: {
      water: createElementPercents(0, -100),
      fire: createElementPercents(200, 100),
      air: createElementPercents(0, 100),
      earth: createElementPercents(150, 100),
    },
  },
  vulcanoGoddess: {
    imgUrl: "./img/entity_vulcanoGoddess.png",
    types: ["fire", "earth"],
    maxHp: 150,
    baseAtk: 50,
    atkDelay: 7,
    elementPercents: {
      water: createElementPercents(0, -100),
      fire: createElementPercents(250, 100),
      air: createElementPercents(0, 100),
      earth: createElementPercents(50, 150),
    },
  },
};
const stageEnemyNames = [
  ["fireGolem", "turtle"],
  ["waterElemental", "kraken"],
  ["waterSnake"],
  ["tree", "spider"],
  ["earthGolem"],
  ["yeti", "airElemental"],
  ["fireGolem", "harpy"],
  ["ashenDevil", "fireElemental"],
  ["vulcanoGoddess"],
];