import { compute_slots } from "svelte/internal";

export interface Frame {
  gameOver: boolean;
  pointScored: boolean;
  gameStarted: boolean;
  width: number;
  height: number;
  top_limit: number;
  bottom_limit: number;
  left_limit: number;
  right_limit: number;
  score: number;
  ball: Ball;
  leftPaddle: Paddle;
  rightPaddle: Paddle;
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

export interface Paddle {
  x: number;
  y: number;
  width: number;
  length: number;
  vY: number;
  velocity: number;
  score: number;
}

export class GameController {
  private frame: Frame;

  private velocity = 1;
  private max_score = 1;
  constructor(
    public readonly height = 300,
    public readonly width = 600,
    public readonly ballSize = 10,
    public readonly body_margin = 8,
    public readonly margin = 410,
    public readonly padding = 1,
    public readonly border = 1,
    public readonly paddleWidth = 5,
    public readonly paddleLength = 40
  ) {}
  private top_limit = this.body_margin + this.padding + this.border;
  private bottom_limit = this.top_limit + this.height;
  private left_limit =
    this.body_margin + this.margin + this.padding + this.border;
  private right_limit = this.left_limit + this.width;

  public newGame() {
    this.frame = {
      score: 0,
      width: this.width,
      height: this.height,
      top_limit: 0,
      bottom_limit: this.height,
      left_limit: 0,
      right_limit: this.width,
      gameOver: false,
      gameStarted: false,
      pointScored: false,
      ball: {
        x: this.width / 2,
        y: this.height / 2 - this.ballSize / 2,
        size: this.ballSize,
        vX: 1,
        vY: 1,
        velocity: this.velocity,
        direction: 1,
      },
      leftPaddle: {
        x: 3 * this.paddleWidth,
        y: this.height / 2 - this.paddleLength / 2,
        width: this.paddleWidth,
        length: this.paddleLength,
        vY: -1,
        velocity: this.velocity,
        score: 0,
      },
      rightPaddle: {
        x: this.width - 3 * this.paddleWidth,
        y: this.height / 2 - this.paddleLength / 2,
        width: this.paddleWidth,
        length: this.paddleLength,
        vY: 1,
        velocity: this.velocity * 10,
        score: 0,
      },
    };
    return this.frame;
  }

  public nextFrame() {
    if (this.frame.gameOver || !this.frame.gameStarted) {
      return this.frame;
    }
    if (!this.frame.pointScored && this.checkPointScored()) {
      // If the ball hits the left or right limit its gameover
      if (
        this.frame.ball.x + this.frame.ball.size / 2 >=
        this.frame.right_limit
      ) {
        this.frame.leftPaddle.score += 1;
      } else {
        this.frame.rightPaddle.score += 1;
      }
      if (
        this.frame.leftPaddle.score == this.max_score ||
        this.frame.rightPaddle.score == this.max_score
      ) {
        this.frame.gameOver = true;
      }
      this.frame.pointScored = true;
      return this.frame;
    } else if (this.frame.pointScored) {
      return this.frame;
    }
    // If the ball hits the bottom or top limit it bounces
    if (this.frame.ball.y >= this.frame.bottom_limit - this.frame.ball.size) {
      this.frame.ball.vY = -1;
    } else if (this.frame.ball.y <= this.frame.top_limit) {
      this.frame.ball.vY = 1;
    }
    // if the ball hits the right paddle it bounces
    if (this.hitRightPaddle()) {
      //Rotate the ball
      this.frame.ball.vX *= -1;
      this.frame.ball.vY *= 1;
    }
    // if the ball hits the left paddle it bounces
    else if (this.hitLeftPaddle()) {
      this.frame.ball.vX *= -1;
      this.frame.ball.vY *= 1;
    }
    // The left paddle is following the ball
    if (
      this.frame.ball.y >= this.frame.top_limit &&
      this.frame.ball.y + this.frame.leftPaddle.length / 2 <=
        this.frame.bottom_limit
    ) {
      this.frame.leftPaddle.y = this.frame.ball.y;
    }

    this.frame.ball.y += this.frame.ball.velocity * this.frame.ball.vY;
    this.frame.ball.x += this.frame.ball.velocity * this.frame.ball.vX;
    return this.frame;
  }

  private checkPointScored() {
    return (
      this.frame.ball.x + this.frame.ball.size / 2 >= this.frame.right_limit ||
      this.frame.ball.x - this.frame.ball.size / 2 <= this.frame.left_limit
    );
  }

  private hitLeftPaddle() {
    return (
      this.frame.ball.x - this.frame.ball.size / 2 == this.frame.leftPaddle.x &&
      this.frame.ball.y >= this.frame.leftPaddle.y &&
      this.frame.ball.y <=
        this.frame.leftPaddle.y + this.frame.leftPaddle.length
    );
  }
  private hitRightPaddle() {
    return (
      this.frame.ball.x + this.frame.ball.size / 2 ==
        this.frame.rightPaddle.x &&
      this.frame.ball.y >= this.frame.rightPaddle.y &&
      this.frame.ball.y <=
        this.frame.rightPaddle.y + this.frame.rightPaddle.length
    );
  }

  private gameIsOn() {
    return this.frame.gameStarted && !this.frame.gameOver;
  }

  public startGame() {
    this.newGame();
    this.frame.gameStarted = true;
    return this.frame;
  }

  public handleKeys(event) {
    if (this.gameIsOn() && event.key === "ArrowUp") {
      if (
        this.frame.rightPaddle.y - this.frame.rightPaddle.velocity >=
        this.frame.top_limit
      ) {
        this.frame.rightPaddle.y -= this.frame.rightPaddle.velocity;
      }
    } else if (this.gameIsOn() && event.key === "ArrowDown") {
      if (
        this.frame.rightPaddle.y +
          this.frame.rightPaddle.velocity +
          this.frame.rightPaddle.length <=
        this.frame.bottom_limit
      ) {
        this.frame.rightPaddle.y += this.frame.rightPaddle.velocity;
      }
    }
  }
}
