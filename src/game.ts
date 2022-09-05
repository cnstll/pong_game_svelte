import { compute_slots } from "svelte/internal";

export interface Frame {
  gameOver: boolean;
  gameStarted: boolean;
  width: number;
  height: number;
  padding: number;
  score: number;
  ball: Ball;
}

export interface Ball {
  x: number;
  y: number;
  size: number;
  vX: number;
  vY: number;
  velocity: number;
  direction: number;
}

export class GameController {
  private frame: Frame;

  private velocity = 1;

  constructor(
    public readonly height = 300,
    public readonly width = 600,
    public readonly ballSize = 10,
    public readonly padding = 5,

    ) {}

  public newGame() {

    this.frame = {
      score: 0,
      width: this.width,
      height: this.height,
      padding: this.padding,
      gameOver: false,
      gameStarted: false,
      ball: {
        x: this.width / 2 - this.ballSize / 2,
        y: this.height / 2 - this.ballSize / 2,
        size: this.ballSize,
        vX: 1,
        vY: 1,
        velocity: this.velocity,
        direction: 1,
      }
    };
    return this.frame;
  }
  
  public nextFrame() {

    if (this.frame.ball.x >= this.frame.width){
        this.frame.ball.vX = -1;
    } else if (this.frame.ball.x <= this.frame.padding) {
        this.frame.ball.vX = 1;
    }
    if (this.frame.ball.y >= this.frame.height){
        this.frame.ball.vY = -1;
    } else if (this.frame.ball.y <= this.frame.padding) {
        this.frame.ball.vY = 1;
    }
    this.frame.ball.x += this.frame.ball.velocity * this.frame.ball.vX;
    this.frame.ball.y += this.frame.ball.velocity * this.frame.ball.vY;
    return this.frame;
}
}
