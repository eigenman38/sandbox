// /**
//  * Auto-generated code below aims at helping you parse
//  * the standard input according to the problem statement.
//  **/

// let lastCheckpoint: [x: number, y: number, distanceToNext: number] = [0, 0, 0];
// let changed = false;
// let boosted = false;
// let checkPoints: [x: number, y: number, distanceToNext: number][] = [];
// let lapped: boolean = false;
// let largestCheckpointIndex: number = null;

// // game loop
// while (true) {
//   var inputs: string[] = readline().split(' ');
//   const x: number = parseInt(inputs[0]);
//   const y: number = parseInt(inputs[1]);
//   const nextCheckpointX: number = parseInt(inputs[2]); // x position of the next check point
//   const nextCheckpointY: number = parseInt(inputs[3]); // y position of the next check point
//   const nextCheckpointDist: number = parseInt(inputs[4]); // distance to the next checkpoint
//   const nextCheckpointAngle: number = parseInt(inputs[5]); // angle between your pod orientation and the direction of the next checkpoint
//   var inputs: string[] = readline().split(' ');
//   const opponentX: number = parseInt(inputs[0]);
//   const opponentY: number = parseInt(inputs[1]);

//   // check if we have not lapped or repeated checkpoint and if not add this one
//   // if we have then set lap flag
//   let currentCheckpoint: [x: number, y: number, distanceToNext: number] = [
//     nextCheckpointX,
//     nextCheckpointY,
//     nextCheckpointDist,
//   ];

//   // TODO: this will not work since distance likely to be different.
//   // Only check the coordinates not the distance
//   let checkpointSeen = checkPoints?.includes(currentCheckpoint);

//   if (!lapped && !checkpointSeen) {
//     checkPoints.push(currentCheckpoint);
//   } else if (!lapped && checkpointSeen) {
//     lapped = true;
//   }

//   // determine the largest distance checkpoint if lapped and not calculated yet.
//   if (lapped && largestCheckpointIndex === null) {
//     checkPoints.sort((a, b) => a[2] - b[2]); // sort ascending

//     // now max is in index(length -1).
//     largestCheckpointIndex = checkPoints.length - 1;
//   }

//   let thrust: number =
//     nextCheckpointAngle >= 90 || nextCheckpointAngle <= -90 ? 0 : 100;

//   let engine: string = ` ${thrust}`;

//   // check if changed and not [0,0] start

//   if (lastCheckpoint === [0, 0, 0]) {
//     //first iteration no change flag
//     lastCheckpoint = currentCheckpoint;
//     changed = false;
//   } else if (currentCheckpoint !== lastCheckpoint) {
//     //changed
//     lastCheckpoint = currentCheckpoint;
//     changed = true;
//   }
//   //changed
//   //so it has changed but have we turned to new target yet

//   // make functions to simplify.
//   // TODO:  do we even need changed?  *********
//   // problem is we need to wait for angle to stabalize and keep changed
//   // but criteria could simply be
//   // !boosted currentCheckpoint === checkPoints[largestCheckpointIndex] angle stable
//   // **************************

//   // TODO: need to set the changed to false if
//   // change === true
//   // boosted ||
//   // largestCheckpointIndex === null ||
//   // (!boosted && largestCheckpointIndex !== null && angle outside range )
//   if (
//     changed && // at start if new leg
//     !boosted && // only get one boost per race
//     largestCheckpointIndex !== null && // we have done a cycle and have a largest leg calculated
//     currentCheckpoint === checkPoints[largestCheckpointIndex] && // we are on the largest leg
//     nextCheckpointAngle <= 2 &&
//     nextCheckpointAngle >= -2
//   ) {
//     // angle is straight enough to target

//     // GO!!!
//     engine = ' BOOST';
//     changed = false;
//     boosted = true;
//     console.error('BOOSTED!!!!');
//   }

//   // Write an action using console.log()
//   // To debug: console.error('Debug messages...');

//   //if angle between -5 and 5
//   //and distance is great, likely after reaching a cp
//   //and opponent is ahead (optional)

//   // You have to output the target position
//   // followed by the power (0 <= thrust <= 100)
//   // i.e.: "x y thrust"
//   console.log(nextCheckpointX + ' ' + nextCheckpointY + engine);
//   console.error(
//     `Boosted = ${boosted} nextCheckpointAngle = ${nextCheckpointAngle} nextCheckpointDist ${nextCheckpointDist} changed = ${changed} lapped = ${lapped}`
//   );
// }
