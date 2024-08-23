// キーボードの入力状態を記録する配列の定義
var input_key_buffer = new Array();

// キーボードの入力イベントをトリガーに配列のフラグ値を更新させる
window.addEventListener("keydown", handleKeydown);
function handleKeydown(e) {
  e.preventDefault();
  input_key_buffer[e.keyCode] = true;
}

window.addEventListener("keyup", handleKeyup);
function handleKeyup(e) {
  e.preventDefault();
  input_key_buffer[e.keyCode] = false;
}

// canvas要素の取得
const canvas = document.getElementById("maincanvas");
const ctx = canvas.getContext("2d");

// 画像を表示するの座標の定義 & 初期化
var x = 0;
var y = 300;

// 上下方向の速度
var vy = 0;
// ジャンプしたか否かのフラグ値
var isJump = false;

// ゲームオーバーか否かのフラグ値
var isGameOver = false;

// ブロック要素の定義
var blocks = [
  { x: 0, y: 382, w: 250, h: 1300 },
  // { x: 150, y: 282, w: 50, h: 32 },
  { x: 350, y: 350, w: 200, h: 1000 },
  { x: 380, y: 222, w: 80, h: 32 },  
  { x: 510, y: 252, w: 90, h: 1000 },
  { x: 683, y: 141, w: 500, h: 1000 }
];

// ロゴの定義
var logo = [
  { x: 805, y: 10, w: 80, h: 30 }
];

// 本社の定義
var honsha = [
  { x: 805, y: 40, w: 80, h: 100 }
];

// 西船
var nishifuna = [
  { x: 0, y: 282, w: 150, h: 100 }
];

// 西船文字
var ryo = [
  { x: 0, y: 252, w: 150, h: 30 }
];

// ロード時に画面描画の処理が実行されるようにする
window.addEventListener("load", update);

// 画面を更新する関数を定義 (繰り返しここの処理が実行される)
function update() {
  // 画面全体をクリア
  ctx.clearRect(0, 0, 1000, 1000);

  // 更新後の座標
  var updatedX = x;
  var updatedY = y;

  if (x > 920) {
    // alert('会社を通り過ぎてしまった。今日は在宅勤務にしよう....')
    let num = Math.floor( Math.random() * 5 )
    if(num == 0){
      alert('今日は土曜なのに出社してしまった。疲れているようだ....')
  }else if(num == 1){
      alert('会社を通り過ぎてしまった。今日は在宅勤務にしよう....') 
  }else if(num == 2){
      alert('会社を通り過ぎてしまった。今日は在宅勤務にしよう....')
  }else if(num == 3){
      alert('会社を通り過ぎてしまった。今日は在宅勤務にしよう....')
  }else if(num == 4){
      alert('今日は土曜なのに出社してしまった。疲れているようだ....')
  }
    pass
  }

  if (isGameOver) {
    // 上下方向は速度分をたす
    updatedY = y + vy;

    // 落下速度はだんだん大きくなる
    vy = vy + 0.5;

    if (y > 800) {
      // ゲームオーバーのキャラが更に下に落ちてきた時にダイアログを表示し、各種変数を初期化する
      
      let num = Math.floor( Math.random() * 5 )
      if(num == 0){
        alert('今日は雨だ。在宅勤務にしよう....')
    }else if(num == 1){
        alert('昨日飲みすぎた。在宅勤務にしよう....') 
    }else if(num == 2){
        alert('向かい風が強すぎた。在宅勤務にしよう....')
    }else if(num == 3){
        alert('今日は暑すぎる。在宅勤務にしよう.....')
    }else if(num == 4){
        alert('西船寮が遠すぎる。在宅勤務にしよう....')
    }

      // alert("今日も雨だ。在宅勤務にしよう....");
      isGameOver = false;
      isJump = false;
      updatedX = 0;
      updatedY = 300;
      vy = 0;
    }
  } else {
    // 入力値の確認と反映
    if (input_key_buffer[37]) {
      updatedX = x + 2;
    }
    if (input_key_buffer[38]) {
      if (isJump){
      } else{
        updatedX = x + 2;
        vy = -12;
        isJump = true;
      }
    }
    if (input_key_buffer[39]) {
      updatedX = x + 2;
    }

    // ジャンプ中である場合のみ落下するように調整する
    if (isJump) {
      updatedX = x + 2;
      // 上下方向は速度分をたす
      updatedY = y + vy;

      // 落下速度はだんだん大きくなる
      vy = vy + 0.5;

      // 主人公が乗っているブロックを取得する
      const blockTargetIsOn = getBlockTargrtIsOn(x, y, updatedX, updatedY);

      // ブロックが取得できた場合には、そのブロックの上に立っているよう見えるように着地させる
      if (blockTargetIsOn !== null) {
        updatedY = blockTargetIsOn.y - 70;
        isJump = false;
      }
    } else {
      updatedX = x + 2;
      // ブロックの上にいなければジャンプ中の扱いとして初期速度0で落下するようにする
      if (getBlockTargrtIsOn(x, y, updatedX, updatedY) === null) {
        isJump = true;
        vy = 0;
      }
    }

    if (y > 390) {
      // 下まで落ちてきたらゲームオーバーとし、上方向の初速度を与える
      isGameOver = true;
      updatedY = 500;
      vy = -15;
    }
  }

  x = updatedX;
  y = updatedY;

    // 西船の画像を表示
    var nishifunaImage = new Image();
    nishifunaImage.src = "./nishifuna.png";
    for (const nishi of nishifuna) {
      ctx.drawImage(nishifunaImage, nishi.x, nishi.y, nishi.w, nishi.h);
    }

    // 西船文字の画像を表示
    var ryoImage = new Image();
    ryoImage.src = "./ryo.png";
    for (const r of ryo) {
      ctx.drawImage(ryoImage, r.x, r.y, r.w, r.h);
    }

    // ロゴの画像を表示
    var logoImage = new Image();
    logoImage.src = "./logo.png";
    for (const l of logo) {
      ctx.drawImage(logoImage, l.x, l.y, l.w, l.h);
    }
  
    // 本社の画像を表示
    var honshaImage = new Image();
    honshaImage.src = "./honsha.png";
    for (const hon of honsha) {
      ctx.drawImage(honshaImage, hon.x, hon.y, hon.w, hon.h);
    }

  // 主人公の画像を表示
  var image = new Image();
  image.src = "./base1.png";
  ctx.drawImage(image, x, y, 70, 70);

  // 地面の画像を表示
  var groundImage = new Image();
  groundImage.src = "./base.png";
  for (const block of blocks) {
    ctx.drawImage(groundImage, block.x, block.y, block.w, block.h);
  }



  

  // 再描画
  window.requestAnimationFrame(update);
}

// 変更前後のxy座標を受け取って、ブロック上に存在していればそのブロックの情報を、存在していなければnullを返す
function getBlockTargrtIsOn(x, y, updatedX, updatedY) {
  // 全てのブロックに対して繰り返し処理をする
  for (const block of blocks) {
    if (y + 32 <= block.y && updatedY + 32 >= block.y) {
      if (
        (x + 32 <= block.x || x >= block.x + block.w) &&
        (updatedX + 32 <= block.x || updatedX >= block.x + block.w)
      ) {
        // ブロックの上にいない場合には何もしない
        continue;
      }
      // ブロックの上にいる場合には、そのブロック要素を返す
      return block;
    }
  }
  // 最後までブロック要素を返さなかった場合はブロック要素の上にいないということなのでnullを返却する
  return null;
}