// おみくじ
'use strict';

{
    const btn=document.getElementById('btn');

    btn.addEventListener('click',()=>{
        const results=['大吉','中吉','小吉','末吉','凶'];
        btn.textContent=results[Math.floor(Math.random()*results.length)];
        
        // 確率設定
        const n=Math.random();
        if(n<0.05){
            btn.textContent='大吉'; //5%
        }else if(n<0.35){
            btn.textContent='中吉'; //30%
        }else if(n<0.75){
            btn.textContent='小吉'; //40%
        }else if(n<0.90){
            btn.textContent='末吉'; //15%
        }else{
            btn.textContent='凶'; //10%
        }
    });
}


// ストップウォッチ付きタイピングゲーム
        const timeElement = document.getElementById('time');
        const start = document.getElementById('start');
        const reset = document.getElementById('reset');
        const result = document.getElementById('result');

        // ▼キー打たれたら1個ずつ赤にする
        const typedField = document.getElementById('typed');
        const untypedField = document.getElementById('untyped');

        const time = 10000;

        let missTypeCount = 0;
        let successTypeCount = 0;

        const strs = [
            'Python',
            'Ruby',
            'PHP',
            'Golang',
            'JavaScript',
            'Node.js',
            'Swift',
            'Kotlin',
            'Dart',
            'Java',
            'C++',
            'VisualBasic',
            'ShellScript',
            'RubyOnRails',
            'document',
            'bug',
            'object',
            'model',
            'fullstack',
            'engineer',
            'software',
            'secureshell',
            'init',
            'algorithm',
            'commit',
            'debug',
            'path',
            'rollback',
            'refactoring',
            'HyperTextMarkupLanguage',
            'ApplicationProgrammingInterface'
        ];

        function randomInt(max) {
            return Math.floor(Math.random() * Math.floor(max));
        }

        function nextString(){
            const idx = randomInt(strs.length);
            return strs[idx];
        }

        function updateTextField(){
            typedField.textContent = typed;
            untypedField.textContent = untyped;
        }
        
        function next(){
            typed = '';
            untyped = nextString();
            updateTextField();
        }

        function updateTime(){
            const ms = remaining % 1000;
            const s = Math.floor(remaining / 1000) % 60;
            const m = Math.floor(remaining / (1000*60)) % 60;
            const h = Math.floor(remaining / (1000*60*60));

            const msStr = ms.toString().padStart(3,'0');
            const sStr = s.toString().padStart(2,'0');
            const mStr = m.toString().padStart(2,'0');
            const hStr = h.toString().padStart(2,'0');

            timeElement.innerHTML = `${hStr}:${mStr}:${sStr}.${msStr}`;
        }

        function keyDownCallback(e) {
            if(e.key !== untyped.substring(0, 1)) {
                missTypeCount += 1;
                return;
            }
            successTypeCount += 1;
            typed += untyped.substring(0, 1);
            untyped = untyped.substring(1);

            updateTextField();

            if (untyped === '') {
                next();
            }
        }

        function gameStart() {
            let pre = new Date();
            intervalId = setInterval(function() {
                const now = new Date();
                remaining -= now - pre;

                if(remaining < 0) {
                    gameEnd();
                }

                pre = now;
                updateTime();
            }, 10);

            document.addEventListener('keydown', keyDownCallback);

            next();
        }

        function gameEnd(){
            remaining = 0;
            updateTime();
            clearInterval(intervalId);
            intervalId = null;
            document.removeEventListener('keydown', keyDownCallback);
            result.textContent = `ミスタイプ数： ${missTypeCount}, 総タイプ数： ${missTypeCount + successTypeCount}, リセットボタンを押してね！`;
        }

        // 残り時間のミリ秒
        let remaining = time;

        let intervalId = null;

        start.addEventListener('click', function(e) {
            if (intervalId !== null) { return; }
            gameStart();
        });

        reset.addEventListener('click', function(e) {
            document.removeEventListener('keydown',keyDownCallback);

            clearInterval(intervalId);
            intervalId = null;
            remaining = time;
            updateTime();
            next();

            missTypeCount = 0;
            successTypeCount = 0;
            result.textContent = '';
        });


// クイズ
const quiz = [
    {
        question: '2024年に新しい紙幣が登場することが発表されました。新5000円札に描かれるのは誰？',
        answers: ['津田梅子','渋沢栄一','北里柴三郎','聖徳太子'],
        correct: '津田梅子'
    },{
        question: 'ゲーム史上、最も売れたゲーム機はどれ？',
        answers: ['スーパーファミコン','PlayStation 2','ニンテンドーDS','Xbox 360'],
        correct: 'ニンテンドーDS'
    },{
        question: '「Python」なんて読む？',
        answers: ['フィトン','パイソン','ピーソン','ピーマン'],
        correct: 'パイソン'
    }
];

const quizLength = quiz.length;
let quizIndex = 0;
let score = 0;

const $button = document.getElementsByTagName('button');
const buttonLength = $button.length;

// クイズの問題文、選択肢を定義
const setupQuiz = () => {
    document.getElementById('js-question').textContent = quiz[quizIndex].question;
    let buttonIndex = 0;
    let buttonLength = $button.length;
    while(buttonIndex < buttonLength){
        $button[buttonIndex].textContent = quiz[quizIndex].answers[buttonIndex];
        buttonIndex++;
    }
}

setupQuiz();

const clickHandler = (e) => {
    if(quiz[quizIndex].correct === e.target.textContent){
        window.alert('正解！');
        score++;
    }else{
        window.alert('不正解！');
    }

    quizIndex++;

    if(quizIndex < quizLength){
        setupQuiz();
    }else{
        window.alert('終了！あなたの正解数は' + score + '/' + quizLength + 'です！');
    }
};

// ボタンをクリックしたら正誤判定
let handlerIndex = 0;
while(handlerIndex < buttonLength) {
    $button[handlerIndex].addEventListener('click', (e) => {
        clickHandler(e);
    });
    handlerIndex++;
}
