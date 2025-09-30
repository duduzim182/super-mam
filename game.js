let player;
let cursors;
let enemy;
let laser;
let kripto;
let lestEnemyShot = 0;
let score = 0;
let lives = 3;
let scoreText;
let livesText;
let enemyLifeText;
let victoryText;
let enemyLife = 5;


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

    scoreText = this.add.text(16,16,'pontuaçao: 0',{fontSize:'20px', fill : '#fff'})
    livesText = this.add.text(16,40,'vidas: 3',{fontSize:'20px', fill : '#fff'})
    enemyLifeText=this.add.text(600,16,`vida do inimigo: ${enemyLife}`,{fontSize:'20px', fill : 'rgba(126, 0, 0, 1)'})
    victoryText = this.add.text(400,300,'vitoria',{fontSize:'40px', fill : '#ced500ff'}).setOrigin(0.5).setVisible(false);


    //inicia disparos do inimigo a cada 1.5s
    enemyShotTime = setInterval(projetilEnemy, 1500);
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
        projetilEnemy.call(this);
        lestEnemyShot = time;
    }
       
   //limpeza dos projeteis fora da tela
   laser.children.each(projetil => {
    if (projetil.active && projetil.x > 800) projetil.setActive(false).setVisible(false);
   })

   kripto.children.each(projetil => {
    if (projetil.active && projetil.x > 0) projetil.setActive(false).setVisible(false);
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
function projetilEnemy (){
   const projetil=kripto.get(enemy.x, enemy.y+20); 
       if (projetil){
        projetil.setActive(true).setVisible(true).setScale(0.2);
        projetil.body.enable=true;
        projetil.body.allowGravity=false;
        const angle = Phaser.Math.Angle.Between(projetil.x , projetil.y, player.x, player.y)
        const speed = 200
        projetil.setVelocity(Math.cos(angle)*speed, Math.sin(angle)*speed)
    }
}
function hitEnemy (projetil, enemy){
    projetil.disableBody(true,true);
    score += 10
    scoreText.setText('pontuaçao: '+score);

    enemyLife--;
    enemyLifeText.setText(`vida do inimigo; ${enemyLife}`);// atualiza o placar da vida

    if (enemyLife <= 0){
        enemy.disableBody(true, true)// inimigo desaparecer
        victoryText.setVisible(true)// exibir vitoria
        clearInterval(enemyShotTime)//parar os disparos do inimigo
        kripto.clear(true,true)//limpar o inventario do inimigo
    }
}

//colisao: inimigo acerta o player
function hitPlayer(player, laser){
    laser.disableBody(true, true);

    lives--;
    livesText.setText(`vidas: ${lives}`)

    if (lives <=0){
        this.physics.pause();
        player.setTint(0xff0000)// vida do jogador fica vermelha ao morrer
        livesText.setText('vidas: 0 (Game Over');
    }
}