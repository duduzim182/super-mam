let player;
let cursors;
let enemy;
let laser;
let kripto;
lestEnemyShot = 0;

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

function preload (){
this.load.image('player','supermam.png');
this.load.image('enemy','vilao.png');
this.load.image('laser','laser.png');
this.load.image('kriptonita', 'kriptonita.png')
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
kripto = this.physics.add.group({
    defaultKey: 'kriptonita',
    maxSize: 5
})
this.physics.add.overlap(laser, enemy, hitEnemy, null, this);
this.physics.add.overlap(kripto, player, hitPlayer, null, this);
this.physics.add.overlap(enemy, laser, hitEnemy, null, this);

cursors = this.input.keyboard.createCursorKeys();
//inicia disparos do inimigo a cada 1.5s
    enemyShootTime = setInterval(kripto, 1500);
}
function update (time){
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

    // inimigo lança projeteis automaticamente a cada 1.5 segundos
    if(time > lestEnemyShot + 1500){
        kripto.call(this);
        kripto = time;
    }
       
   //limpeza dos projeteis fora da tela
   laser.children.each(projetil => {
    if (projetil.active && projetil.x > 800).projeteis.setActive(false).setInterval.setVisible(false);
   })

   kripto.children.each(projetil => {
    if (projetil.active && projetil.x > 0).projeteis.setActive(false).setInterval.setVisible(false);
   })

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
