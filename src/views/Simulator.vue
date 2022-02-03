<template>
  <div class="container d-flex flex-column align-items-center position-absolute top-50 start-50 translate-middle">
    <div class="card shadow-lg p-3 rounded mb-5">
      <div class="row g-0">
        <div class="col-md-4">
          <img style="height: 300px" src="./../assets/toy-robot.jpg" class="img-fluid rounded-start ps-3 mt-1" />
        </div>
        <div class="col-md-8">
          <div class="card-body">
            <h5 class="card-title">Simulator</h5>
            <p class="card-text">This simulation display the new position of the robot by executing the command.</p>
            <div class="">
              <h6>Enter command here:</h6>
              <textarea
                class="form-control"
                id="commandInput"
                rows="3"
                v-model.lazy.trim="commandInput"
                @keyup="resetData"
              ></textarea>
              <div class="d-flex justify-content-end">
                <button class="btn btn-primary mt-2" id="runCommand" @click="runCommand">
                  <span v-if="executing" class="spinner-grow spinner-grow-sm" role="status" aria-hidden="true"></span>
                  <span v-else>Execute</span>
                </button>
              </div>
            </div>
            <div class="d-flex align-items-baseline">
              <span class="text-muted">Result:</span>
              <span v-if="hasError" class="ps-2 text-danger"> {{ error }}</span>
              <span v-else class="ps-2"> {{ result }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
    <router-link to="/">Back to Home</router-link>
  </div>
</template>

<script>
export default {
  name: 'Simulator',
  props: {
    title: String
  },
  data() {
    return {
      commandInput: '',
      result: '',
      executing: false,
      hasError: false,
      error: ''
    };
  },
  methods: {
    resetData: function () {
      this.executing = false;
      this.hasError = false;
      this.error = '';
      this.result = '';
    },
    runCommand: function () {
      this.resetData();

      let commandArray = this.commandInput.split('\n');

      /** Defining the Table size **/
      let tableSize = { x: 5, y: 5 };

      /** Robot state **/
      let ToyRobot = {
        placed: false,
        direction: false,
        position: {
          x: null,
          y: null
        }
      };

      /************************************
       ************* Place Robot ***********
       ************************************/

      const placeRobot = (commandLine) => {
        commandLine = commandLine.split(/[ ,]+/);
        let placeCommand = commandLine[0],
          placeX = commandLine[1],
          placeY = commandLine[2],
          placeDirection = commandLine[3];

        if (placeCommand === 'PLACE') {
          if (placeX >= 0 && placeX <= tableSize.x) {
            ToyRobot.position.x = placeX;
            ToyRobot.placed = true;
          } else {
            return false;
          }
          if (placeY >= 0 && placeY <= tableSize.y) {
            ToyRobot.position.y = placeY;
            ToyRobot.placed = true;
          } else {
            return false;
          }
          ToyRobot.direction = placeDirection;
        } else {
          this.hasError = true;
          this.error = 'Failure! First command must be to place robot on table';
        }
      };

      /************************************
       ** Move robot in current direction **
       ************************************/

      const moveRobot = (ToyRobot) => {
        // Terminate if Robot is not placed
        if (ToyRobot.placed === false) {
          return false;
        }

        let x = ToyRobot.position.x;
        let y = ToyRobot.position.y;

        switch (ToyRobot.direction) {
          case 'NORTH':
            if (++y < tableSize.y) {
              ToyRobot.position = { x: x, y: y };
            }
            break;
          case 'EAST':
            if (++x < tableSize.x) {
              ToyRobot.position = { x: x, y: y };
            }
            break;
          case 'SOUTH':
            if (--y >= 0) {
              ToyRobot.position = { x: x, y: y };
            }
            break;
          case 'WEST':
            if (--x >= 0) {
              ToyRobot.position = { x: x, y: y };
            }
            break;
          default:
            break;
        }
      };

      /*********************************
       **** Map for turning the robot ***
       *********************************/
      let directionMap = {
        NORTH: {
          LEFT: 'WEST',
          RIGHT: 'EAST'
        },
        EAST: {
          LEFT: 'NORTH',
          RIGHT: 'SOUTH'
        },
        SOUTH: {
          LEFT: 'EAST',
          RIGHT: 'WEST'
        },
        WEST: {
          LEFT: 'SOUTH',
          RIGHT: 'NORTH'
        }
      };

      /*********************************
       **** Turn the robot and update ***
       *********************************/
      const robotDirection = (ToyRobot, commandLine) => {
        // Terminate if Robot is not placed
        if (ToyRobot.placed === false) {
          return false;
        }

        let currentDirection = ToyRobot.direction;
        let newDirection = directionMap[currentDirection][commandLine];
        ToyRobot.direction = newDirection;
      };

      /*********************************
       **** Report on robot position  ***
       *********************************/
      const reportRobot = (ToyRobot) => {
        // Terminate if Robot is not placed
        if (ToyRobot.placed === false) {
          return false;
        }

        let endXPos = ToyRobot.position.x;
        let endYPos = ToyRobot.position.y;
        let endDirection = ToyRobot.direction;

        //console.log(ToyRobot);

        this.result = endXPos + ',' + endYPos + ',' + endDirection;
      };

      commandArray.forEach((commandLine) => {
        if (!this.error) {
          if (commandLine.includes('PLACE')) {
            placeRobot(commandLine);
          } else if (commandLine === 'MOVE') {
            moveRobot(ToyRobot);
          } else if (commandLine === 'LEFT' || commandLine === 'RIGHT') {
            robotDirection(ToyRobot, commandLine);
          } else if (commandLine === 'REPORT') {
            reportRobot(ToyRobot);
          } else {
            this.hasError = true;
            this.error = 'Invalid command executed!';
          }
        }
      });

      this.executing = false;
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped></style>
