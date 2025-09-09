const config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: {y : 0},
            debug: false
        }
    },
    scene: {
        preload: preload,
        create: create,
        update: update
    }
}
const game = new Phaser.Game(config);
let player;
let cursors;
let enemy;
let laser;

function preload (){
this.load.image('player','supermam.png');
this.load.image('enemy','vilao.png');
this.load.image('laser','laser.png');
}
function create (){
player = this.physics.add.sprite(400,300,'player');
player.setScale(0.1)
enemy = this.physics.add.sprite(200,500,'enemy');
enemy.setScale(0.4)
}
function update (){
    
}