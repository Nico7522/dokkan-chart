import { CardStatsFormModel } from '../model/card-stats.model';

export function calculateDefense(cardStats: CardStatsFormModel): number | undefined {
  const {
    baseDefense,
    leaderSkill,
    links,
    additionalPassive,
    multiplicativePassive,
    defenseAfterSuper,
  } = cardStats;
  if (!baseDefense || !leaderSkill) return;

  let linksValue = 1;
  if (links) {
    linksValue = links / 100 + 1;
  }
  let additionalPassiveValue = 1;
  if (additionalPassive) {
    additionalPassiveValue = additionalPassive / 100 + 1;
  }
  let multiplicativePassiveValue = 1;
  if (multiplicativePassive) {
    multiplicativePassiveValue = multiplicativePassive / 100 + 1;
  }
  let defenseAfterSuperValue = 1;
  if (defenseAfterSuper) {
    defenseAfterSuperValue = defenseAfterSuper / 100 + 1;
  }
  const totalDefense =
    baseDefense *
    +leaderSkill *
    linksValue *
    additionalPassiveValue *
    multiplicativePassiveValue *
    defenseAfterSuperValue;

  return totalDefense;
}
