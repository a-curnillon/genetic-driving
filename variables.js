let info;

let gameState;

let play = true;
let debugMode = false;

let obstacleNumber = 4;
let obstacleWidth = 40;
let obstacleHeight = 40;

let colorTabR = [255, 255, 102, 0, 0, 0, 51, 0, 255, 153];
let colorTabG = [0, 0, 0, 0, 204, 153, 153, 255, 255, 153];
let colorTabB = [0, 255, 204, 255, 255, 153, 51, 0, 102, 153];

let carNumber = 50;
let carWidth = 40;
let carHeight = 20;

let isStarted;
let isPlaying;

let playground;
let watch;
let scoreTab;

let obstacles = [];

let cars = [];
let bestCars = [];

let startTime;

let stringTabTime;
let tabColors = [];
let tabSorted = [];

let gameNumber = 1;
let xlabel = [];
let meanTime = [];
let bestScore = [];

let updated = false;

let tempPosTab = [];
let tempCrashTab = [];

let mutationRate = 0.2;
let numberOfChildren = 2;


let firstGroupRate = 4/7;
let secondGroupRate = 2/7;
let thirdGroupRate = 1/7;

let tabProbR1 = [2/7, 1/7, 1/14];
let tabProbR20 = [0, 2/10, 1/10];
let tabProbR21 = [2/6, 1/6, 1/12];
let tabProbR22 = [4/13, 2/13, 1/13]; 
let tabProbU = [3.96/8.36, 1.98/8.36, 1.32/8.36, 1.1/8.36, 1/8.36];

let DATA = `source,target,value\n`;