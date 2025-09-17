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
player = this.physics.add.sprite(100,500,'player');
player.setScale(0.1)
player.setCollideWorldBounds(true)
enemy = this.physics.add.sprite(700,100,'enemy');
enemy.setScale(0.4)
enemy.setCollideWorldBounds(true)
enemy.setVelocityY(-100)
laser=this.physics.add.group({
    defaultKey:'laser',
    maxSize:10,
    runChildUpdate:true
})
cursors = this.input.keyboard.createCursorKeys();
}
function update (){
    if (cursors.left.isDown){
        player.x-=3;
    }
    else if (cursors.right.isDown){
        player.x+=3;
    }
    if (cursors.up.isDown){
        player.y-=3;
    }
    else if  (cursors.down.isDown){
        player.y+=3;
    }
    if (Phaser.Input.Keyboard.JustDown(cursors.space)){
    playerProjetil()
    }
    if (enemy.y<=100){
        enemy.setVelocityY(100)
    }
    else if (enemy.y>=500){
        enemy.setVelocityY(-100)
    }
}
function playerProjetil(){
    const projetil=laser.get(player.x, player.y-20);
    if (projetil){
        projetil.setActive(true).setVisible(true).setScale(0.2);
        projetil.body.enable=true;
        projetil.body.allowGravity=false;
        projetil.setVelocityX(1500)
    }
}
