var xbotao1, ybotao1, ybotao2, ybotao3;

var xcursor, ycursor
 
var opcao;
var estado;

var invencivel

var xgal, ygal;

var xcar1, ycar1;
var xcar2, ycar2
var xcaminhao1, ycaminhao1;
var xcaminhao2, ycaminhao2;
var xvan1, yvan1;
var xvan2, yvan2;

var xmilho, ymilho;
var pontos;

var gameOver;

var img1, img2, img3, img4, img5;

var trilha, efeito;

var nomeJogador = "";
var digitandoNome = false;
var ranking = [];

function preload() {
  img1 = loadImage("fotos/Ruan Pablo.png");
  img2 = loadImage("fotos/professorr.png");
  img3 = loadImage("fotos/galinha.png");
  img4 = loadImage("fotos/carro.png");
  img5 = loadImage("fotos/menu.png");
  img6 = loadImage("fotos/carro2.png");
  img7 = loadImage("fotos/caminhao.png");
  img8 = loadImage("fotos/caminhao2.png");
  img9 = loadImage("fotos/van.png");
  img10 = loadImage("fotos/van2.png");
  img11 = loadImage("fotos/rafael.png")
  trilha = loadSound("sons/trilha.mp3");
  efeito = loadSound("sons/coinsom.wav");
}

function setup() {
  createCanvas(400, 400);

  xbotao1 = 130;
  ybotao1 = 120;
  ybotao2 = 190;
  ybotao3 = 260;

  xcursor = 130; 
  ycursor = 120;

  opcao = 1;
  estado = 1;

  xgal = 170;
  ygal = 320;

  xcar1 = -70;
  ycar1 = 80;

  xcar2 = 470;
  ycar2 = 120;
  
  xvan1 = 450;
  yvan1 = 150;
  
  xvan2 = -100;
  yvan2 = 200;
  
  xcaminhao1 = -250;
  ycaminhao1 = 260;

  xcaminhao2 = 500;
  ycaminhao2 = 320;

  xmilho = 100;
  ymilho = 100;

  invencivel = 0

  pontos = 0;

  gameOver = 0;
  
  trilha.loop();

  carregarRanking();
}

function draw() {
  if (estado == 1) {
    menu();
  }

  if (estado == 2) {
    jogar();
  }

  if (estado == 3) {
    instrucoes();
  }

  if (estado == 4) {
    creditos();
  }

  if (estado == 5) {
    telaDigitarNome();
  }

  if (estado == 6) {
    telaRanking();
  }
  if (estado == 7) {
  jogar(); 
  }
}

function keyPressed() {

  if (estado == 5) {

    if (keyCode == ENTER && nomeJogador.trim().length > 0) {
      estado = 2;
      resetJogo();
      return;
    }

    if (keyCode == BACKSPACE) {
      nomeJogador = nomeJogador.slice(0, -1);
      return;
    }

    if (keyCode == ESCAPE) {
      estado = 1;
      nomeJogador = "";
      return;
    }

    return;
  }

  if (estado == 6) {
   if (keyCode == ESCAPE) {
    estado = 1;
    nomeJogador = "";
    resetJogo();
  }
    return;
  }

  if (estado == 2 && (key == "p" || key == "P")) {
    estado = 7;
    return;
  }

  if (estado == 7 && (key == "p" || key == "P")) {
    estado = 2;
    return;
  }

  if (estado == 1) {

    if (keyCode == UP_ARROW) {
      opcao--;
      if (opcao < 1) opcao = 3;
    }

    if (keyCode == DOWN_ARROW) {
      opcao++;
      if (opcao > 3) opcao = 1;
    }

    if (opcao == 1) ycursor = ybotao1;
    if (opcao == 2) ycursor = ybotao2;
    if (opcao == 3) ycursor = ybotao3;

    if (keyCode == ENTER) {
      if (opcao == 1) {
        nomeJogador = "";
        estado = 5;
      } else if (opcao == 2) {
        estado = 3;
      } else if (opcao == 3) {
        estado = 4;
      }
    }

    return;
  }

  if (keyCode == ESCAPE) {
    estado = 1;
  }
}
function keyTyped() {

  if (estado != 5) return;

  if (key.length === 1 && /^[a-zA-ZÀ-ÿ0-9 ]$/.test(key)) {

    if (nomeJogador.length < 12) {
      nomeJogador += key;
    }

  }

  return false;
}

function MoveGal() {
  if (keyIsDown(LEFT_ARROW)) {
    xgal -= 5;
  }

  if (keyIsDown(RIGHT_ARROW)) {
    xgal += 5;
  }

  if (keyIsDown(UP_ARROW)) {
    ygal -= 5;
  }

  if (keyIsDown(DOWN_ARROW)) {
    ygal += 5;
  }
}

function MoveCar() {

  // carro 1 
  xcar1 += 5;
  if (xcar1 > 500) xcar1 = -100;

  // carro 2 
  xcar2 -= 6;
  if (xcar2 < -100) xcar2 = 500;

  // van 1 
  xvan1 += 4;
  if (xvan1 > 500) xvan1 = -120;

  // van 2 
  xvan2 -= 4;
  if (xvan2 < -120) xvan2 = 500;

  // caminhão 1 
  xcaminhao1 += 3;
  if (xcaminhao1 > 550) xcaminhao1 = -180;

  // caminhão 2 
  xcaminhao2 -= 3;
  if (xcaminhao2 < -180) xcaminhao2 = 550;
}
function Colisao() {

  if (invencivel > 0) return;

  // CARRO 1
  if (
    xgal < xcar1 + 80 &&
    xgal + 30 > xcar1 &&
    ygal < ycar1 + 70 &&
    ygal + 30 > ycar1
  ) {
    gameOver = 1;
  }

  // CARRO 2
  if (
    xgal < xcar2 + 80 &&
    xgal + 30 > xcar2 &&
    ygal < ycar2 + 70 &&
    ygal + 30 > ycar2
  ) {
    gameOver = 1;
  }

  // VAN 1
  if (
    xgal < xvan1 + 80 &&
    xgal + 30 > xvan1 &&
    ygal < yvan1 + 42 &&
    ygal + 30 > yvan1
  ) {
    gameOver = 1;
  }

  // VAN 2
  if (
    xgal < xvan2 + 80 &&
    xgal + 30 > xvan2 &&
    ygal < yvan2 + 42 &&
    ygal + 30 > yvan2
  ) {
    gameOver = 1;
  }

  // CAMINHÃO 1
  if (
    xgal < xcaminhao1 + 100 &&
    xgal + 30 > xcaminhao1 &&
    ygal < ycaminhao1 + 50 &&
    ygal + 30 > ycaminhao1
  ) {
    gameOver = 1;
  }

  // CAMINHÃO 2
  if (
    xgal < xcaminhao2 + 100 &&
    xgal + 30 > xcaminhao2 &&
    ygal < ycaminhao2 + 50 &&
    ygal + 30 > ycaminhao2
  ) {
    gameOver = 1;
  }
}
function ColetarMilho() {
  if (
    xgal < xmilho + 15 &&
    xgal + 30 > xmilho &&
    ygal < ymilho + 15 &&
    ygal + 30 > ymilho
  ) {
    pontos = pontos + 100;

    efeito.play();

    var sorteio = floor(random(8));

    if (sorteio == 0) {
      xmilho = 50;
      ymilho = 70;
    }

    if (sorteio == 1) {
      xmilho = 150;
      ymilho = 70;
    }

    if (sorteio == 2) {
      xmilho = 300;
      ymilho = 70;
    }

    if (sorteio == 3) {
      xmilho = 80;
      ymilho = 150;
    }

    if (sorteio == 4) {
      xmilho = 220;
      ymilho = 150;
    }

    if (sorteio == 5) {
      xmilho = 40;
      ymilho = 260;
    }

    if (sorteio == 6) {
      xmilho = 180;
      ymilho = 260;
    }

    if (sorteio == 7) {
      xmilho = 320;
      ymilho = 320;
    }
  }
}
function resetJogo() {

  invencivel = 90;

  xgal = 170;
  ygal = 320;

  xcar1 = -200;
  xcar2 = 600;

  xvan1 = 450;
  xvan2 = -150;

  xcaminhao1 = -300;
  xcaminhao2 = 700;

  xmilho = 100;
  ymilho = 100;

  pontos = 0;
  gameOver = 0;
}
function menu() {

  resetMatrix();

  background(0);

  textAlign(LEFT, BASELINE);
  textStyle(NORMAL);

  image(img5, 0, 0, width, height);

  fill("yellow");
  stroke("black");
  strokeWeight(3);
  textSize(36);
  text("ROAD CHICKEN", 55, 60);

  textSize(18);

  fill("blue");
  rect(xbotao1, ybotao1, 140, 60);

  fill("yellow");
  noStroke();
  text("JOGAR", xbotao1 + 35, ybotao1 + 38);

  fill("blue");
  stroke("black");
  strokeWeight(1);
  rect(xbotao1, ybotao2, 140, 60);

  fill("yellow");
  noStroke();
  text("INSTRUÇÕES", xbotao1 + 10, ybotao2 + 38);

  fill("blue");
  stroke("black");
  strokeWeight(1);
  rect(xbotao1, ybotao3, 140, 60);

  fill("yellow");
  noStroke();
  text("CRÉDITOS", xbotao1 + 22, ybotao3 + 38);

  noFill();
  stroke("yellow");
  strokeWeight(3);
  rect(xcursor, ycursor, 140, 60);
}
function jogar() {
  
  if (invencivel > 0) {
    invencivel--;
  }


  if (gameOver == 0) {

    background("black");

    // Pontuação
    fill("white");
    textSize(20);
    textAlign(LEFT, TOP);
    text("Pontos: " + pontos, 10, 10);
 
    if (estado != 7) {
      MoveGal();
      MoveCar();
      Colisao();
      ColetarMilho();
    }

    // Linhas da pista
    fill("white");
    rect(0, 195, 40, 10);
    rect(70, 195, 40, 10);
    rect(140, 195, 40, 10);
    rect(210, 195, 40, 10);
    rect(280, 195, 40, 10);
    rect(350, 195, 40, 10);

    // Milho
    fill("yellow");
    rect(xmilho, ymilho, 15, 15);

    // Galinha
    image(img3, xgal, ygal, 30, 30);

    // Carro
    image(img4, xcar1, ycar1, 80, 70);
    image(img6, xcar2, ycar2, 80, 70);
    
    image(img9, xvan1, yvan1, 80, 42);
    image(img10, xvan2, yvan2, 80, 42);
    
    image(img8, xcaminhao1, ycaminhao1, 100, 50);
    image(img7, xcaminhao2, ycaminhao2, 100, 50);
   
   if (estado == 7) {

    textAlign(CENTER, CENTER);

    fill("yellow");
    stroke("black");
    strokeWeight(4);
    textSize(40);
    text("PAUSADO", width / 2, height / 2 - 20);
  
    textSize(14);
    strokeWeight(2);
    fill("yellow");
  
    text("Pressione P para continuar", width / 2, height / 2 + 20);
    text("ESC para voltar ao menu", width / 2, height / 2 + 45);
  }
  } else if (gameOver == 1) {
    salvarPontuacao(nomeJogador, pontos);
    gameOver = 2;
    estado = 6;
  }
}
function instrucoes() {
  background("blue");

  fill(0);
  textSize(16);

  text(
    "Road Chicken é um jogo em que uma galinha\n" +
      "enfrenta uma estrada movimentada,\n" +
      "desviando de carros para sobreviver.\n\n" +
      "Use as setas do teclado para mover.",
    20,
    130
  );
}
function creditos() {

  background("blue");

  textAlign(LEFT, BASELINE);
  textStyle(NORMAL);

  // Título
  fill("yellow");
  stroke("black");
  strokeWeight(2);
  textSize(28);
  text("CRÉDITOS", 120, 35);


  let largura = 90;
  let altura = 120;

  image(img1, 15, 60, largura, altura);

  fill("yellow");
  noStroke();
  textSize(15);
  text("Programador:", 15, 200);

  fill("white");
  textSize(14);
  text("Ruan Pablo", 15, 220);

  image(img11, 155, 60, largura, altura);

  fill("yellow");
  textSize(15);
  text("Programador:", 155, 200);

  fill("white");
  textSize(14);
  text("Rafael Dias", 155, 220);
  
  image(img2, 295, 60, largura, altura);

  fill("yellow");
  textSize(15);
  text("Educador:", 295, 200);

  fill("white");
  textSize(14);
  text("Rumminigge", 295, 220);

  // Instrução
  fill(220);
  textAlign(CENTER);
  textSize(14);
  text("ESC para voltar", width / 2, 380);
}
function telaDigitarNome() {
 
  background(0);

  textAlign(LEFT, BASELINE);
  textStyle(NORMAL);
  strokeWeight(1);


  fill("yellow");
  stroke("black");
  strokeWeight(2);
  textSize(32);
  text("ROAD CHICKEN", 75, 55);

 
  textSize(16);
  fill("white");
  noStroke();
  text("Digite seu nome:", 130, 110);


  stroke("yellow");
  strokeWeight(2);
  noFill();
  rect(80, 120, 240, 40);


  fill("yellow");
  noStroke();
  textSize(18);
  var cursor = (frameCount % 60 < 30) ? "|" : " ";
  text(nomeJogador + cursor, 90, 147);


  textSize(12);
  fill(180);
  text("(máx. 12 caracteres)", 125, 178);


  if (nomeJogador.trim().length > 0) {
    fill("blue");
    stroke("yellow");
    strokeWeight(2);
    rect(130, 200, 140, 45);
    fill("yellow");
    noStroke();
    textSize(16);
    text("ENTER p/ jogar", 138, 228);
  } else {
    fill(80);
    stroke(100);
    strokeWeight(2);
    rect(130, 200, 140, 45);
    fill(150);
    noStroke();
    textSize(15);
    text("Digite um nome", 140, 228);
  }

  fill(150);
  textSize(13);
  text("ESC para voltar", 140, 290);
}

function telaRanking() {
  background(0);


  fill("red");
  stroke("black");
  strokeWeight(2);
  textSize(36);
  text("GAME OVER", 65, 55);


  fill("white");
  noStroke();
  textSize(16);
  text("Sua pontuação: " + pontos, 130, 85);

 
  fill("yellow");
  stroke("black");
  strokeWeight(1);
  textSize(22);
  text("🏆 RANKING TOP 5", 95, 120);

  noStroke();
  textSize(16);

  for (var i = 0; i < ranking.length; i++) {
    var y = 150 + i * 40;

    if (ranking[i].nome == nomeJogador && ranking[i].pontos == pontos) {
      fill(255, 255, 0, 80);
      rect(40, y - 20, 320, 35);
    }

    var medalha = "";
    if (i == 0) medalha = "🥇";
    else if (i == 1) medalha = "🥈";
    else if (i == 2) medalha = "🥉";
    else medalha = (i + 1) + ".";

    fill("white");
    text(medalha + " " + ranking[i].nome, 50, y);
    text(ranking[i].pontos + " pts", 290, y);
  }

 
  fill(150);
  textSize(14);
  text("ESC para voltar ao menu", 110, 370);
}

function salvarPontuacao(nome, pts) {
  carregarRanking();

  var novaPontuacao = { nome: nome, pontos: pts };
  var inserido = false;

  for (var i = 0; i < ranking.length; i++) {
    if (pts > ranking[i].pontos) {
      ranking.splice(i, 0, novaPontuacao);
      inserido = true;
      break;
    }
  }

  if (!inserido) {
  ranking[ranking.length] = novaPontuacao;
}

  if (ranking.length > 5) {
    ranking = ranking.slice(0, 5);
  }

  localStorage.setItem("rankingRoadChicken", JSON.stringify(ranking));
}


   function carregarRanking() {
  var salvo = localStorage.getItem("rankingRoadChicken");
  if (salvo) {
    ranking = JSON.parse(salvo);
  } else {
    ranking = [];
  }
}