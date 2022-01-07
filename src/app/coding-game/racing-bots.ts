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
  private static readonly xMax = 15999;
  private static readonly yMax = 8999;
  private static lastCheckpoint: checkPointType = [0, 0, 0];
  private static boosted = false;
  private static checkPoints: checkPointType[] = [];
  private static lapped: boolean = false;
  private static largestCheckpointIndex: number | null = null;

  /////////////////////////////////
  private static rotateVector(
    origin: positionType,
    target: positionType,
    angleToRotate: number //In degrees.  Positive is clockwise but our map y is flipped.  hmmmm
  ): positionType {

    console.error(`rotateVector: origin: ${origin} target ${target} angleToRotate ${angleToRotate}`);

    // translate to normal
    let newTarget: positionType = [target[0] - origin[0], target[1] - origin[1]];

    console.error(`rotateVector: Translate to 0,0: newTarget ${newTarget}`);

    newTarget[0] =
      newTarget[0] * Math.cos((angleToRotate * Math.PI) / 180) -
      newTarget[1] * Math.sin((angleToRotate * Math.PI) / 180);

    newTarget[1] =
      newTarget[1] * Math.cos((angleToRotate * Math.PI) / 180) +
      newTarget[0] * Math.sin((angleToRotate * Math.PI) / 180);

    console.error(`rotateVector: Rotated: : newTarget ${newTarget}`);

    // translate back to origin
    newTarget = [Math.floor(newTarget[0] + origin[0]), Math.floor(newTarget[1] + origin[1])];

    console.error(`rotateVector: Translated Back: origin: ${origin} newTarget ${newTarget}`);


    return newTarget;
  }

  ///////////////////////////
  private static insideArena(target: positionType): boolean {
    return ((target[0] >= 0 && target[0] <= this.xMax) && (target[1] >= 1 && target[1] <= this.yMax));
  }

  /////////////////////////////
  private static findMidPoint(
    origin: positionType,
    target: positionType
  ): positionType {

    target = [Math.floor((origin[0] + target[0]) / 2), Math.floor((origin[1] + target[1]) / 2)];

    return target;
  }

  //////////////////////
  public static calculateTarget(
    playerPosition: positionType,
    currentCheckpoint: checkPointType,
    checkpointAngle: number
  ): positionType {
    let currentTarget: positionType = [currentCheckpoint[0], currentCheckpoint[1]];
    // tolerance
    if (Math.abs(checkpointAngle) === 0 || Math.abs(checkpointAngle) >= 70) {
      console.error(`calculateTarget: Angle within Tolerance or > 70 degrees: No Oversteer`);

      return currentTarget;
    }

    let modifiedAngle = checkpointAngle * 1;
    if (modifiedAngle > 70) {
      modifiedAngle = 70;
    }
    else if (modifiedAngle < -70) {
      modifiedAngle = -70
    }

    let newTarget = this.rotateVector(
      playerPosition,
      currentTarget,
      modifiedAngle
    );

    console.error(`calculateTarget: Target Vector Rotated: ${checkpointAngle} degrees to ${newTarget}`);


    while (!this.insideArena(newTarget)) {
      console.error(`calculateTarget: Target Vector Not In Arena Bounds: Finding midpoint`);
      newTarget = this.findMidPoint(playerPosition, newTarget);
      console.error(`calculateTarget: Midpoint = ${newTarget}`);

    }

    console.error(`calculateTarget: New Target = ${newTarget}`);

    return newTarget;
  }

  ////////////////////////////////
  public static checkPointChanged(currentCheckpoint: checkPointType): boolean {
    // check if changed and not [0,0] start

    console.error(
      `lastCheckpoint = ${this.lastCheckpoint} currentCheckpoint = ${currentCheckpoint}`
    );

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

  ////////////////////////////////
  public static checkPointSeen(
    currentCheckpoint: checkPointType,
    checkPointChanged: boolean
  ): boolean {
    // if we have lapped then we've seen it
    if (this.lapped) {
      return true;
    }

    let seen = this.checkPoints?.some((checkPointType) => {
      return Utilities.arrayEqual(
        checkPointType.slice(0, 1),
        currentCheckpoint.slice(0, 1)
      );
    });

    return seen;
  }

  ////////////////////////////////
  public static shouldWeBoost(
    checkPoint: checkPointType,
    checkpointAngle: number
  ): boolean {
    // !boosted
    // angle is stable
    // on longest leg ( that we know this means we have lapped)

    if (this.boosted) {
      console.error(`shouldWeBoost: Already Boosted`);
      return false;
    }

    if (!this.lapped) {
      console.error(`shouldWeBoost: Not Lapped`);
      return false;
    }

    if (!this.onLongestLeg(checkPoint)) {
      console.error(`shouldWeBoost: Not On Longest Leg`);
      return false;
    }

    if (!this.angleStableForBoost(checkpointAngle)) {
      console.error(`shouldWeBoost: Angle Unstable`);
      return false;
    }

    if (checkPoint[2] <= 6000) {
      console.error(`shouldWeBoost: Checkpoint too close`);
      return false;
    }



    return true;
  }

  ////////////////////////////
  public static angleStableForBoost(checkpointAngle: number): boolean {
    return checkpointAngle === 0;
  }

  /////////////////////////////////
  public static onLongestLeg(checkPoint: checkPointType): boolean {
    if (
      this.largestCheckpointIndex === null ||
      this.largestCheckpointIndex === undefined
    ) {
      return false;
    }

    if (
      Utilities.arrayEqual(
        checkPoint.slice(0, 1),
        this.checkPoints[this.largestCheckpointIndex].slice(0, 1)
      )
    ) {
      return true;
    }

    return false;
  }

  //////////////////////////////
  // given the current params have we just now lapped?
  public static haveWeJustLapped(
    checkPointChanged: boolean,
    checkpointSeen: boolean
  ): boolean {
    // if we've seen it and the cp just changed then we have  just lapped if we haven't lapped yet
    if (checkPointChanged && checkpointSeen && !this.lapped) {
      this.lapped = true;
      return true;
    }

    return false;
  }

  ////////////////////////////////////////
  public static executeShipNavigationCommand(
    checkpointAngle: number,
    boost: boolean,
    target: positionType,
    checkPoint: checkPointType,
    thrust: number
  ): void {
    if (boost && this.shouldWeBoost(checkPoint, checkpointAngle)) {
      // boost
      console.log(`${target[0]}  ${target[1]}  BOOST`);
      this.boosted = true;
    } else {
      // no boost thrust
      console.log(`${target[0]}  ${target[1]}  ${thrust}`);
    }
  }

  //////////////////////////////////////
  public static calculateThrust(
    checkpointAngle: number,
    distanceToCheckpoint: number
  ): number {

    return 100;
    let thrust: number = 0;

    if (checkpointAngle >= 170 || checkpointAngle <= -170) {
      thrust = 20;
      if (distanceToCheckpoint <= 3000) {
        thrust = 0;
      }
    } else if (checkpointAngle >= 160 || checkpointAngle <= -160) {
      thrust = 20;
      if (distanceToCheckpoint <= 3000) {
        thrust = 0;
      }
    } else if (checkpointAngle >= 150 || checkpointAngle <= -150) {
      thrust = 20;
      if (distanceToCheckpoint <= 3000) {
        thrust = 0;
      }
    } else if (checkpointAngle >= 140 || checkpointAngle <= -140) {
      thrust = 20;
      if (distanceToCheckpoint <= 3000) {
        thrust = 0;
      }
    } else if (checkpointAngle >= 130 || checkpointAngle <= -130) {
      thrust = 20;
      if (distanceToCheckpoint <= 3000) {
        thrust = 0;
      }
    } else if (checkpointAngle >= 120 || checkpointAngle <= -120) {
      thrust = 20;
      if (distanceToCheckpoint <= 3000) {
        thrust = 0;
      }
    } else if (checkpointAngle >= 110 || checkpointAngle <= -110) {
      thrust = 20;
      if (distanceToCheckpoint <= 3000) {
        thrust = 0;
      }
    } else if (checkpointAngle >= 100 || checkpointAngle <= -100) {
      thrust = 20;
      if (distanceToCheckpoint <= 3000) {
        thrust = 0;
      }
    } else if (checkpointAngle >= 90 || checkpointAngle <= -90) {
      thrust = 20;
      if (distanceToCheckpoint <= 3000) {
        thrust = 0;
      }
    } else if (checkpointAngle >= 80 || checkpointAngle <= -80) {
      thrust = 50;
      if (distanceToCheckpoint <= 3000) {
        thrust = thrust / 4;
      }
    } else if (checkpointAngle >= 70 || checkpointAngle <= -70) {
      thrust = 70;
      if (distanceToCheckpoint <= 3000) {
        thrust = thrust / 4;
      }
    } else if (checkpointAngle >= 60 || checkpointAngle <= -60) {
      thrust = 80;
      if (distanceToCheckpoint <= 3000) {
        thrust = thrust / 4;
      }
    } else if (checkpointAngle >= 50 || checkpointAngle <= -50) {
      thrust = 80;
      if (distanceToCheckpoint <= 3000) {
        thrust = thrust / 2;
      }
    } else if (checkpointAngle >= 40 || checkpointAngle <= -40) {
      thrust = 80;
      if (distanceToCheckpoint <= 3000) {
        thrust = thrust / 2;
      }
    } else if (checkpointAngle >= 30 || checkpointAngle <= -30) {
      thrust = 80;
      if (distanceToCheckpoint <= 3000) {
        thrust = thrust / 2;
      }
    } else if (checkpointAngle >= 20 || checkpointAngle <= -20) {
      thrust = 100;
      if (distanceToCheckpoint <= 3000) {
        thrust = thrust / 2;
      }
    } else if (checkpointAngle >= 10 || checkpointAngle <= -10) {
      thrust = 100;
      if (distanceToCheckpoint <= 2500) {
        thrust = thrust / 2;
      }
    }
    else if (checkpointAngle >= 5 || checkpointAngle <= -5) {
      thrust = 100;
      if (distanceToCheckpoint <= 2000) {
        thrust = thrust / 2;
      }
    } else {
      thrust = 100;

    }



    return thrust;
  }

  ////////////////////////////////////////
  public static outputErrorParams(
    checkpointAngle: number,
    checkpointDist: number,
    changed: boolean,
    checkpointSeen: boolean
  ) {
    console.error(
      `Boosted = ${this.boosted} nextCheckpointAngle = ${checkpointAngle}`
    );

    console.error(
      `nextCheckpointDist ${checkpointDist} changed = ${changed} lapped = ${this.lapped}`
    );

    console.error(`checkpointSeen = ${checkpointSeen}`);

    console.error(`Largest Leg Index = ${this.largestCheckpointIndex}`);
  }

  ////////////////////////////////////////
  public static calculateLargestDistance(checkPointChanged: boolean) {
    if (this.largestCheckpointIndex !== null) {
      //console.error(`calculateLargestDistance: Already Calced`);
      // have to check this way since 0 is falsey
      return;
    } else {
      // determine the largest distance checkpoint if lapped, changed and not calculated yet.
      if (this.lapped && checkPointChanged) {
        console.error(`calculateLargestDistance: Not Calced`);
        this.checkPoints.sort((a, b) => a[2] - b[2]); // sort ascending

        //console.error(`calculateLargestDistance: Sorted=${this.checkPoints}`);

        // now max is in index(length -1).
        this.largestCheckpointIndex = this.checkPoints.length - 1;

        //console.error(`calculateLargestDistance: largestCheckpointIndex=${this.largestCheckpointIndex}`);
      }
    }
  }

  ///////////////////////////////////////////////////////
  public static storeCheckPoint(
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
    if (checkpointSeen) {
      return;
    }

    // store it
    this.checkPoints.push(checkpoint);

    return;
  }
} //  class

/////////////////////////////////////////////
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

  ///////////////////
  // ask the system questions
  let checkPointChanged = System.checkPointChanged(currentCheckpoint);

  let checkpointSeen = System.checkPointSeen(
    currentCheckpoint,
    checkPointChanged
  );

  // if we've seen it and we just changed then we have lapped.

  if (System.haveWeJustLapped(checkPointChanged, checkpointSeen)) {
    // should calc the largest distance now
    // but only when we just lapped and only once.
    System.calculateLargestDistance(checkPointChanged);
  }

  // if checkpoint changed and we haven't seen it yet, then store it.
  if (checkPointChanged && !checkpointSeen) {
    System.storeCheckPoint(
      checkpointSeen,
      checkPointChanged,
      currentCheckpoint
    );
  }

  let boost = System.shouldWeBoost(currentCheckpoint, nextCheckpointAngle);
  let thrust = 0;

  if (!boost) {
    thrust = System.calculateThrust(nextCheckpointAngle, nextCheckpointDist);
  }

  let newTarget = System.calculateTarget(currentPlayerPosition, currentCheckpoint, nextCheckpointAngle);

  console.error(`New Target = ${newTarget}`);

  System.executeShipNavigationCommand(
    nextCheckpointAngle,
    boost,
    newTarget,
    currentCheckpoint,
    thrust
  );

  System.outputErrorParams(
    nextCheckpointAngle,
    nextCheckpointDist,
    checkPointChanged,
    checkpointSeen
  );
}
