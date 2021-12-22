// /**
//  * Auto-generated code below aims at helping you parse
//  * the standard input according to the problem statement.
//  * ---
//  * Hint: You can use the debug stream to print initialTX and initialTY, if Thor seems not follow your orders.
//  **/

//  var inputs: string[] = readline().split(' ');
//  const lightX: number = parseInt(inputs[0]); // the X position of the light of power
//  const lightY: number = parseInt(inputs[1]); // the Y position of the light of power
//  const initialTx: number = parseInt(inputs[2]); // Thor's starting X position
//  const initialTy: number = parseInt(inputs[3]); // Thor's starting Y position
//  let thorCurrentPosition: [number, number] = [initialTx, initialTy];
 
//  // compass has array of tuples of directional vectors
//  const compass: [number, number, string][] = [
     
//      [0, -1, "N"], //North
//      [1, -1, "NE"], //NorthEast
//      [1, 0, "E"], //East
//      [1, 1, "SE"], //SouthEast
//      [0, 1, "S"], //South
//      [-1, 1, "SW"], //SouthWest
//      [-1, 0, "W"], //West
//      [-1, -1, "NW"] //NorthWest
     
//      ] 
 
//      // Determine direct vector to light
//      // find smallest angle in compass
//      // head in that compass direction
 
//      // α = arccos[(a · b) / (|a| * |b|)]   arccos(dot product / product of magnitudes)
 
//      function dotProduct(a: [number, number], b: [number, number]) : number{
 
//          return a[0] * b[0] + a[1] * b[1];
//      }
 
//      function productMagnitudes(a: [number, number], b: [number, number]) : number{
 
//          let lengthA = Math.sqrt (Math.pow(a[0], 2)  + Math.pow(a[1], 2));
//          let lengthB = Math.sqrt (Math.pow(b[0], 2)  + Math.pow(b[1], 2));
 
//          return lengthA*lengthB;
//      }
 
 
//      // arcos  R(-1,1) => R(0, pi)[Radians] R(0, 180)[degrees)]
 
//      function findAngle(a: [number, number], b: [number, number]) : number{
//          // α = arccos[(a · b) / (|a| * |b|)]   arccos(dot product / product of magnitudes)
  
//          let result = Math.acos( dotProduct(a,b) / productMagnitudes(a,b) );
 
//          return result;
//      }
 
//      function findClosestCompassDirection(thorToLightVector: [number, number]) : 
//          [number, number, string] {
 
             
 
//          let minAngleCompassPoint: [number, number, string] = null; 
//          let minAngle: number = null; 
 
//          // find smallest angle
//          compass.forEach((compassPoint) => {
 
//              let angle = findAngle(thorToLightVector, [compassPoint[0],compassPoint[1]]);
 
//              if(minAngle === null || angle < minAngle ){
 
//                  minAngle = angle;
//                  minAngleCompassPoint = compassPoint;
 
//              }
 
 
//              });
 
 
 
//          return minAngleCompassPoint;
//      }
 
//      function CalculateThorsNewPosition(currentPosition: [number, number], compassPoint: [number, number, string]): [number, number]{
 
//          let newPosition: [number, number] = [currentPosition[0] + compassPoint[0], currentPosition[1] + compassPoint[1]];
//          return newPosition;
//      }
 
     
     
     
 
 
//  // game loop
//  while (true) {
//      const remainingTurns: number = parseInt(readline()); // The remaining amount of turns Thor can move. Do not remove this line.
 
     
//      // vector Thor needs to head
//      const thorToLightVector:  [number, number] = 
//              [lightX - thorCurrentPosition[0], lightY - thorCurrentPosition[1]];
 
    
 
//      // Write an action using console.log()
//      // To debug: console.error('Debug messages...');
 
//      let direction = findClosestCompassDirection(thorToLightVector);
 
//      // Calculate Thors new position
//      let newPosition = CalculateThorsNewPosition(thorCurrentPosition, direction);
     
 
//      // Set new position
//      thorCurrentPosition = newPosition;
 
//      // A single line providing the move to be made: N NE E SE S SW W or NW
//      console.log(direction[2]);
//  }
 