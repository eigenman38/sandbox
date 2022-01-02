/**
 * Auto-generated code below aims at helping you parse
 * the standard input according to the problem statement.
 **/

type checkPointType = [x: number, y: number, distanceToCheckpoint: number];
type positionType = [x: number, y: number];

class Utilities {
  public static arrayEqual<T>(a: T[], b: T[]): boolean {
    if (a.length !== b.length) {
      return false;
    }

    if (a.every((value, index) => value === b[index])) {
      return true;
    }

    return false;
  }
}

class System {
  private static lastCheckpoint: checkPointType = [0, 0, 0];
  private static boosted = false;
  private static checkPoints: checkPointType[] = [];
  private static lapped: boolean = false;
  private static largestCheckpointIndex: number = null;

  public static checkPointChanged(currentCheckpoint: checkPointType): boolean {
    // check if changed and not [0,0] start

    console.error(
      `lastCheckpoint = ${this.lastCheckpoint} currentCheckpoint = ${currentCheckpoint}`
    );

    //make this a.length === b.length &&
    //a.every((val, index) => val === b[index])

    if (Utilities.arrayEqual(this.lastCheckpoint, [0, 0, 0])) {
      // tuple equality not workign as expected.

      //first iteration no change flag
      this.lastCheckpoint = Object.assign([], currentCheckpoint);
      return false;
    } else if (
      !Utilities.arrayEqual(
        currentCheckpoint.slice(0, 1),
        this.lastCheckpoint.slice(0, 1)
      )
    ) {
      //changed
      this.lastCheckpoint = Object.assign([], currentCheckpoint);
      return true;
    } else {
      return false;
    }
  }

  public static checkPointSeen(
    currentCheckpoint: checkPointType,
    checkPointChanged: boolean
  ): boolean {
    // if we have lapped then we've seen it
    if (this.lapped) {
      return true;
    }

    let seen = this.checkPoints?.some((checkPointType) => {
      return checkPointType.slice(0, 1) === currentCheckpoint.slice(0, 1);
    });

    // if we've seen it then we have lapped.
    if (seen) {
      this.lapped = true;

      // should calc the largest distance now
      this.calculateLargestDistance(checkPointChanged);
    } else {
      this.storeCheckPoint(seen, checkPointChanged, currentCheckpoint);
    }

    return seen;
  }

  public static shouldWeBoost(
    checkPoint: checkPointType,
    checkpointAngle: number
  ): boolean {
    // !boosted
    // angle is stable
    // on longest leg ( that we know this means we have lapped)

    if (this.boosted) {
      return false;
    }

    if (!this.angleStableForBoost(checkpointAngle)) {
      return false;
    }

    if (!this.onLongestLeg(checkPoint)) {
      return false;
    }

    return true;
  }

  public static angleStableForBoost(checkpointAngle: number): boolean {
    return checkpointAngle <= 2 && checkpointAngle >= -2;
  }

  public static onLongestLeg(checkPoint: checkPointType): boolean {
    if (
      this.largestCheckpointIndex === null ||
      this.largestCheckpointIndex === undefined
    ) {
      return false;
    }

    if (
      checkPoint.slice(0, 1) ===
      this.checkPoints[this.largestCheckpointIndex].slice(0, 1)
    ) {
      return true;
    }

    return false;
  }

  public static executeShipNavigationCommand(
    checkpointAngle: number,
    boost: boolean,
    checkPoint: checkPointType,
    thrust: number
  ) {
    if (boost && this.shouldWeBoost(checkPoint, checkpointAngle)) {
      // boost
      console.log(`${checkPoint[0]}  ${checkPoint[1]}  BOOST`);
      this.boosted = true;
    } else {
      // no boost thrust
      console.log(`${checkPoint[0]}  ${checkPoint[1]}  ${thrust}`);
    }
  }

  public static calculateThrust(checkpointAngle: number): number {
    let thrust: number =
      checkpointAngle >= 90 || checkpointAngle <= -90 ? 0 : 100;

    return thrust;
  }

  public static outputErrorParams(
    checkpointAngle: number,
    checkpointDist: number,
    changed: boolean
  ) {
    console.error(
      `Boosted = ${this.boosted} nextCheckpointAngle = ${checkpointAngle}`
    );

    console.error(
      `nextCheckpointDist ${checkpointDist} changed = ${changed} lapped = ${this.lapped}`
    );
  }

  private static calculateLargestDistance(checkPointChanged: boolean) {
    if (this.largestCheckpointIndex !== null) {
      // have to check this way since 0 is falsey
      return;
    } else {
      // determine the largest distance checkpoint if lapped, changed and not calculated yet.
      if (this.lapped && checkPointChanged) {
        this.checkPoints.sort((a, b) => a[2] - b[2]); // sort ascending

        // now max is in index(length -1).
        this.largestCheckpointIndex = this.checkPoints.length - 1;
      }
    }
  }

  private static storeCheckPoint(
    checkpointSeen: boolean,
    checkPointChanged: boolean,
    checkpoint: [x: number, y: number, distanceToCheckpoint: number]
  ) {
    // don't store if hasn't changed yet. this will eliminate the out of cycle issues
    // don't store if it has been seen.
    // if not seen and just changed.
    // should ensure we see the largest distance to next

    // if we have lapped then we've seen it.
    if (this.lapped) {
      return;
    }

    if (!checkPointChanged) {
      return;
    }

    // store it
    this.checkPoints.push(checkpoint);

    return;
  }
} //  class

// game loop
while (true) {
  var inputs: string[] = readline().split(' ');
  const x: number = parseInt(inputs[0]);
  const y: number = parseInt(inputs[1]);
  const nextCheckpointX: number = parseInt(inputs[2]); // x position of the next check point
  const nextCheckpointY: number = parseInt(inputs[3]); // y position of the next check point
  const nextCheckpointDist: number = parseInt(inputs[4]); // distance to the next checkpoint
  const nextCheckpointAngle: number = parseInt(inputs[5]); // angle between your pod orientation and the direction of the next checkpoint
  var inputs: string[] = readline().split(' ');
  const opponentX: number = parseInt(inputs[0]);
  const opponentY: number = parseInt(inputs[1]);

  // translate into better object types.
  let currentCheckpoint: checkPointType = [
    nextCheckpointX,
    nextCheckpointY,
    nextCheckpointDist,
  ];
  let currentPlayerPosition: positionType = [x, y];
  let currentOpponentPosition: positionType = [opponentX, opponentY];

  // ask the system questions
  let checkPointChanged = System.checkPointChanged(currentCheckpoint);

  // system isn't just answering but storing the check point if needed.
  let checkpointSeen = System.checkPointSeen(
    currentCheckpoint,
    checkPointChanged
  );

  let boost = System.shouldWeBoost(currentCheckpoint, nextCheckpointAngle);
  let thrust = 0;

  if (!boost) {
    thrust = System.calculateThrust(nextCheckpointAngle);
  }

  System.executeShipNavigationCommand(
    nextCheckpointAngle,
    boost,
    currentCheckpoint,
    thrust
  );

  System.outputErrorParams(
    nextCheckpointAngle,
    nextCheckpointDist,
    checkPointChanged
  );
}
