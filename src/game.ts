export interface Frame {
  gameOver: boolean;
  gameStarted: boolean;
  width: number;
  height: number;
  score: number;
  ball: Ball;
}

export interface Ball {
  x: number;
  y: number;
  size: number;
  velocity: number;
  direction: number;
}

export class GameController {
  private frame: Frame;

  private velocity = 10;

  constructor(
    public readonly height = 300,
    public readonly width = 600,
    public readonly ballSize = 20,

    ) {}

  public newGame() {

    this.frame = {
      score: 0,
      width: this.width,
      height: this.height,
      gameOver: false,
      gameStarted: false,
      ball: {
        x: this.width / 2 - this.ballSize / 2,
        y: this.height / 2 - this.ballSize / 2,
        size: this.ballSize,
        velocity: this.velocity,
        direction: 1,
      }
    };
    return this.frame;
  }
  
  public nextFrame() {

    if (this.frame.ball.x === this.width){
        this.frame.ball.direction = -1;
    } else if (this.frame.ball.x === 0){
        this.frame.ball.direction = 1;
    }
    this.frame.ball.x += this.frame.ball.velocity * this.frame.ball.direction
      return this.frame;
    }
}
