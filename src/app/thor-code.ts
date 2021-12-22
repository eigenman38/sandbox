/**
 * Auto-generated code below aims at helping you parse
 * the standard input according to the problem statement.
 * ---
 * Hint: You can use the debug stream to print initialTX and initialTY, if Thor seems not follow your orders.
 **/


class Thor {

    //inputs: string[] = readline().split(' ');
    readonly inputs: string[] = ["3", "2", "1", "2"];
    readonly lightX: number = parseInt(this.inputs[0]); // the X position of the light of power
    readonly lightY: number = parseInt(this.inputs[1]); // the Y position of the light of power
    readonly initialTx: number = parseInt(this.inputs[2]); // Thor's starting X position
    readonly initialTy: number = parseInt(this.inputs[3]); // Thor's starting Y position
    thorCurrentPosition: [number, number] = [this.initialTx, this.initialTy];

    // compass has array of tuples of directional vectors
    readonly compass: [number, number, string][] = [

        [0, -1, "N"], //North
        [1, -1, "NE"], //NorthEast
        [1, 0, "E"], //East
        [1, 1, "SE"], //SouthEast
        [0, 1, "S"], //South
        [-1, 1, "SW"], //SouthWest
        [-1, 0, "W"], //West
        [-1, -1, "NW"] //NorthWest

    ]

    // Determine direct vector to light
    // find smallest angle in compass
    // head in that compass direction

    // α = arccos[(a · b) / (|a| * |b|)]   arccos(dot product / product of magnitudes)

    private dotProduct(a: [number, number], b: [number, number]): number {

        return a[0] * b[0] + a[1] * b[1];
    }

    private productMagnitudes(a: [number, number], b: [number, number]): number {

        let lengthA = Math.sqrt(Math.pow(a[0], 2) + Math.pow(a[1], 2));
        let lengthB = Math.sqrt(Math.pow(b[0], 2) + Math.pow(b[1], 2));

        return lengthA * lengthB;
    }


    // arcos  R(-1,1) => R(0, pi)[Radians] R(0, 180)[degrees)]

    private findAngle(a: [number, number], b: [number, number]): number {
        // α = arccos[(a · b) / (|a| * |b|)]   arccos(dot product / product of magnitudes)

        let result = Math.acos(this.dotProduct(a, b) / this.productMagnitudes(a, b));

        return result;
    }

    private findClosestCompassDirection(thorToLightVector: [number, number]):
        [number, number, string] {



        let minAngleCompassPoint: [number, number, string] = [0, 0, ""];
        let minAngle: number;

        // find smallest angle
        this.compass.forEach((compassPoint) => {

            let angle = this.findAngle(thorToLightVector, [compassPoint[0], compassPoint[1]]);

            if (minAngle === null || minAngle === undefined || angle < minAngle) {

                minAngle = angle;
                minAngleCompassPoint = compassPoint;

            }


        });



        return minAngleCompassPoint;
    }

    private calculateThorsNewPosition(currentPosition: [number, number], compassPoint: [number, number, string]): [number, number] {

        let newPosition: [number, number] = [currentPosition[0] + compassPoint[0], currentPosition[1] + compassPoint[1]];
        return newPosition;
    }





    private gameLoop() {
        // game loop
        while (true) {
            //const remainingTurns: number = parseInt(readline()); // The remaining amount of turns Thor can move. Do not remove this line.
            const remainingTurns: number = 100;


            // vector Thor needs to head
            const thorToLightVector: [number, number] =
                [this.lightX - this.thorCurrentPosition[0], this.lightY - this.thorCurrentPosition[1]];



            // Write an action using console.log()
            // To debug: console.error('Debug messages...');

            let direction = this.findClosestCompassDirection(thorToLightVector);

            // Calculate Thors new position
            let newPosition = this.calculateThorsNewPosition(this.thorCurrentPosition, direction);


            // Set new position
            this.thorCurrentPosition = newPosition;

            // A single line providing the move to be made: N NE E SE S SW W or NW
            console.log(direction[2]);
        }

    }



}