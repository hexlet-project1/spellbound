class GameTurns {
  constructor(player, enemies, stage) {
    this.player = player;
    this.enemies = enemies;
    this.stage = stage;
  }

  choosenElement = null;

  currentArrow = "down";

  arrowOrder = 0;

  successPercent = 0;

  enemyDmg = 100;

  changeArrow() {
    document.querySelectorAll(".arrow").forEach((e) => {
      e.style.filter = "none";
    });
    this.currentArrow = arrowsDirections[Math.floor(Math.random() * 4)];
    document.querySelector(`.arrow_${this.currentArrow}`).style.filter =
      "drop-shadow(5px 5px 10px rgb(236, 236, 61))";
  }

  arrowActions(codeKey) {
    if (this.choosenElement === null) {
      return true;
    }
    this.arrowOrder += 1;
    this.changeEnergy("--player-energy", this.arrowOrder * 10);
    if (codeKey.split("arrow")[1] === this.currentArrow) {
      this.successPercent += 10;
    }
    this.changeArrow();
    if (this.arrowOrder === 10) {
      let temp = true;
      if (this.successPercent > 60) {
        temp = this.tryAttack(
          "player",
          [this.choosenElement],
          this.successPercent,
        );
      }
      this.clearArrows();
      this.changeArrow();
      return temp;
    }
    return true;
  }

  clearEnemies() {
    this.enemies = [];
  }

  clearArrows() {
    this.arrowOrder = 0;
    this.successPercent = 0;
    this.changeEnergy("--player-energy", this.successPercent);
    document.querySelector(`.arrow_${this.currentArrow}`).style.filter = "none";
  }

  changeHpbar(
    varName,
    entity = {
      info: {
        currentHp: 1,
        maxHp: 1,
      },
    },
  ) {
    document.documentElement.style.setProperty(
      varName,
      `${(entity.info.currentHp / entity.info.maxHp) * 100}%`,
    );
  }

  changeEnergy(varname, percent = 0) {
    document.documentElement.style.setProperty(varname, `${percent}%`);
  }

  tryAttack(attackerType, types, finalPercent) {
    const { player } = this;
    if (this.enemies.length === 0) {
      return false;
    }
    const enemy = this.enemies.at(-1);
    if (attackerType === "player") {
      player.dealDmg(enemy, types, finalPercent);
      this.changeHpbar("--enemy-hp-percent", enemy);
      if (enemy.info.currentHp <= 0) {
        this.changeEnergy("--enemy-energy");
        this.enemies.pop();
        if (this.enemies.length === 0) {
          this.makeResult(true);
          return false;
        }
        document.querySelector(".enemy").querySelector("img").src =
          this.enemies.at(-1).info.imgUrl;
        this.changeHpbar("--enemy-hp-percent");
      }
      return true;
    }
    if (player.info.currentHp <= 0) {
      this.makeResult(false);
      return false;
    }
    if (enemy.info.cd !== 0) {
      if (enemy.info.cdDelay === false) {
        enemy.info.cdDelay = true;
        setTimeout(() => {
          enemy.info.cd -= 0.5;
          enemy.info.cdDelay = false;
          this.changeEnergy(
            "--enemy-energy",
            100 - (enemy.info.cd / enemy.info.atkDelay) * 100,
          );
        }, 500);
      }
    } else {
      enemy.info.cd = enemy.info.atkDelay;
      enemy.dealDmg(player, enemy.info.types, this.enemyDmg);
      this.changeHpbar("--player-hp-percent", player);
      enemy.info.cd = enemy.info.atkDelay;
      this.changeEnergy("--enemy-energy", 0);
    }
    return true;
  }

  makeResult(resBool) {
    body
      .querySelector(".interaction")
      .insertAdjacentHTML(
        "beforebegin",
        '<button class="fight_result"></button>',
      );
    const resultButton = body.querySelector(".fight_result");
    const reachedStage = localStorage.getItem("currentStage");
    const { stage } = this;
    if (resBool) {
      if (reachedStage === stage && maxStage > reachedStage) {
        localStorage.setItem("currentStage", Number(stage) + 1);
      }
      if (Number(stage) < maxStage) {
        resultButton.textContent = "continue";
        resultButton.addEventListener("click", () =>
          redrawPage({
            currentTarget: { className: `stage_${Number(stage) + 1}` },
          }),
        );
      } else {
        resultButton.textContent = "back to menu";
        resultButton.addEventListener("click", () => redrawPage(menu));
      }
    } else {
      resultButton.textContent = "try again";
      resultButton.addEventListener("click", () =>
        redrawPage({ currentTarget: { className: `stage_${stage}` } }),
      );
    }
  }
}
