const players = [
  {
    name: "Mario",
    speed: 4,
    maneuverability: 3,
    power: 3,
    points: 0,
  },
  {
    name: "Peach",
    speed: 3,
    maneuverability: 4,
    power: 2,
    points: 0,
  },
  {
    name: "Yoshi",
    speed: 2,
    maneuverability: 4,
    power: 3,
    points: 0,
  },
  {
    name: "Bowser",
    speed: 5,
    maneuverability: 2,
    power: 5,
    points: 0,
  },
  {
    name: "Luigi",
    speed: 3,
    maneuverability: 4,
    power: 4,
    points: 0,
  },
  {
    name: "Donkey Kong",
    speed: 2,
    maneuverability: 2,
    power: 5,
    points: 0,
  },
];

async function getBlock() {
  let randomBlock = Math.floor(Math.random() * 3);
  let result;

  switch (randomBlock) {
    case 1:
      result = "Straight";
      break;
    case 2:
      result = "Curve";
      break;
    default:
      result = "Fight";
      break;
  }
  return result;
}

async function logRoll(name, dice, attribute, attribute_points) {
  console.log(`${name} 🎲 rolled ${dice} of ${attribute} in the dice`);
  console.log(
    `${name} 🎲 total ${attribute} is ${dice} + ${attribute_points} = ${
      dice + attribute_points
    }`
  );
}

async function RollDice() {
  return Math.floor(Math.random() * 6) + 1;
}

function pickPlayers(index1, index2) {
  return { player1: players[index1 - 1], player2: players[index2 - 1] };
}

async function playRaceEngine(player1, player2) {
  for (let round = 1; round <= 5; round++) {
    console.log(`🏁 Round ${round}`);

    // choose random block
    let block = await getBlock();
    console.log(`Block: ${block}`);

    //roll dices
    let player1Dice = await RollDice();
    let player2Dice = await RollDice();

    //skill test
    let player1Skill = 0;
    let player2Skill = 0;

    if (block === "Straight") {
      player1Skill = player1.speed + player1Dice;
      player2Skill = player2.speed + player2Dice;

      await logRoll(player1.name, player1Dice, "speed", player1.speed);
      await logRoll(player2.name, player2Dice, "speed", player2.speed);
      if (player1Skill > player2Skill) {
        player1.points++;
        console.log(`${player1.name} wins the round!`);
        console.log(`${player1.name} has been awarded 1 point`);
      } else if (player1Skill < player2Skill) {
        player2.points++;
        console.log(`${player2.name} wins the round!`);
        console.log(`${player2.name} has been awarded 1 point`);
      } else {
        console.log("It's a tie, no points awarded");
      }
    }
    if (block === "Curve") {
      player1Skill = player1.maneuverability + player1Dice;
      player2Skill = player2.maneuverability + player2Dice;

      await logRoll(
        player1.name,
        player1Dice,
        "maneuverability",
        player1.maneuverability
      );
      await logRoll(
        player2.name,
        player2Dice,
        "maneuverability",
        player2.maneuverability
      );
      if (player1Skill > player2Skill) {
        player1.points++;
        console.log(`${player1.name} wins the round!`);
        console.log(`${player1.name} has been awarded 1 point`);
      } else if (player1Skill < player2Skill) {
        player2.points++;
        console.log(`${player2.name} wins the round!`);
        console.log(`${player2.name} has been awarded 1 point`);
      } else {
        console.log("It's a tie, no points awarded");
      }
    }
    if (block === "Fight") {
      player1Skill = player1.power + player1Dice;
      player2Skill = player2.power + player2Dice;

      await logRoll(player1.name, player1Dice, "power", player1.power);
      await logRoll(player2.name, player2Dice, "power", player2.power);
      if (player1Skill > player2Skill) {
        player2.points = Math.max(0, player2.points - 1);
        console.log(`${player1.name} wins the round!`);
        if (player2.points === 0) {
          console.log(`${player2.name} has no points left`);
        } else {
          console.log(`${player2.name} lost 1 point`);
        }
      } else if (player1Skill < player2Skill) {
        player1.points = Math.max(0, player1.points - 1);
        console.log(`${player2.name} wins the round!`);
        if (player1.points === 0) {
          console.log(`${player1.name} has no points left`);
        } else {
          console.log(`${player1.name} lost 1 point`);
        }
      } else {
        console.log("It's a tie, no points lost");
      }
    }
    console.log("___________________________________________ ");
  }
}

(async function main() {
  const { player1, player2 } = pickPlayers(4, 6);
  console.log(
    `🏁🚨 The race between ${player1.name} and ${player2.name} is starting!!`
  );
  console.log("___________________________________________ ");
  await playRaceEngine(player1, player2);

  console.log(
    `${player1.name} has ${player1.points} points and ${player2.name} has ${player2.points} points`
  );
  if (player1.points > player2.points) {
    console.log(`${player1.name} wins 🏆`);
  } else if (player1.points < player2.points) {
    console.log(`${player2.name} wins 🏆`);
  } else {
    console.log("It's a tie");
  }
})();
