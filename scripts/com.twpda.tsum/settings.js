'use strict;';

var VERSION = 1;
var storeKey = 'com.twpda.tsum.'+VERSION;
var uistate = [
  {label: 'Switch Language:English(英文)',
    labelZh: '切換語言:中文(Chinese)', value: false}, // true for zh_TW
  {label: '---'},
  {label: 'Auto Launch Tsum App', labelZh: '自動開啟 Tsum App',
    value: false},
  {label: 'Detect out of game time(second)', labelZh: '偵測脫離遊戲(秒)',
    value: 5, min: 1, max: 10, step: 1},
  {label: '---'},
  {label: 'Auto Play Game', labelZh: '自動玩遊戲', value: true},
  // {label: 'Slow Calculation', labelZh: '慢速計算', value: false},
  {label: 'Pause When Calculating', labelZh: '計算時暫停', value: false},
  {label: 'Clear Bubbles', labelZh: '自動清除泡泡', value: true},
  {label: 'Use Fan?', labelZh: '使用風扇', value: true},
  {label: '5>4', labelZh: '道具五變四', value: false},
  {label: '+Coin', labelZh: '道具Coin', value: false},
  {label: '+Bubble', labelZh: '道具Bubble', value: false},
  {label: 'All Bonus Items', labelZh: '開/關全部道具', value: false},
  {label: 'Skill Waiting time (sec)', labelZh: '技能等待時間(秒)',
    value: 1, min: 0.5, max: 15, step: 0.5},
  {label: 'Skill Level', labelZh: '技能等級',
    value: 3, min: 1, max: 6, step: 1},
  {label: 'Skill Type', labelZh: '技能類型', value: 0,
    keyList: [
      'burst',
      'block_donald_s',
      'block_donaldx_s',
      'block_lukej_s',
      'block_moana_s',
      'block_marie_s',
      'block_missbunny_s',
      'block_rabbit_s',
      'block_mickeyh2015_s',
      'block_snowwhite_s',
      'block_cinderella_s',
    ], list: [
      'Burst',
      'Donald',
      'Holiday Donald',
      'Jedi Luke',
      'Moana',
      'Marie',
      'Miss Bunny',
      'Rabbit',
      'Horn Hat Mickey',
      'Snow White',
      'Cinderella',
    ], listZh: [
      '消除系',
      '唐老鴨',
      '假日唐老鴨',
      '絕地路克',
      '莫娜',
      '瑪麗',
      '小兔子',
      '兔子',
      '角帽米奇',
      '白雪公主',
      '仙度瑞拉',
    ]},
  {label: '---'},
  {label: 'Receive All Hearts', labelZh: '收全部愛心', value: false},
  {label: 'Waiting time (min) before repeat',
    labelZh: '完成後休息時間(分)',
    value: 25, min: 5, max: 60, step: 1},
  {label: '---'},
  {label: 'Receive Hearts One By One', labelZh: '一顆一顆收愛心', value: true},
  {label: 'Skip Ruby', labelZh: '保留鑽石', value: false},
  {label: 'Max Times to Open Mailbox', labelZh: '重複檢查上限次數',
    value: 3, min: 1, max: 20, step: 1},
  {label: 'Waiting time (min) before repeat',
    labelZh: '完成後休息時間(分)', value: 5, min: 1, max: 60, step: 1},
  {label: 'Record Sender', labelZh: '記錄送心者', value: false},
  {label: 'Enlarge Sender\'s Image (Emulator)',
    labelZh: '放大送心者圖片(模擬器)', value: false},
  {label: '---'},
  {label: 'Auto Send Hearts', labelZh: '自動送愛心', value: true},
  {label: 'Send to 0 score', labelZh: '送心給 0 分', value: false},
  {label: 'Send from first', labelZh: '從第1名開始送', value: true},
  {label: 'Max run time(min)', labelZh: '執行時間上限(分)', value: 0,
    min: 0, max: 80, step: 1},
  {label: 'Waiting time (min) before repeat',
    labelZh: '完成後休息時間(分)',
    value: 25, min: 1, max: 59, step: 1},
];

function saveState() {
  if (localStorage !== undefined) {
    localStorage.setItem(storeKey, JSON.stringify(uistate));
  }
}

function loadState() {
  if (localStorage !== undefined) {
    if ( localStorage.getItem(storeKey) !== null) {
      uistate = JSON.parse(v);
    }
  }
}

function getLabel(a, v) { // a.value: is_tw, v: contains label and labelZh
  return (a[0].value) ? (v.labelZh ? v.labelZh : v.label) : v.label;
}

var ConfigPage = {
  oninit: loadState,
  view: function() {
    var uiList = [];
    uistate.forEach(function(v, i, a) {
      var ui;
      if (typeof(v.value) === 'boolean') {
        ui = m('input[type=checkbox]', {
          value: v.value,
          checked: v.value,
          onchange: function(e) {
            v.value = e.target.checked;
            saveState();
          },
        });
      } else if (typeof(v.value) === 'number') {
        if (v.list !== undefined) {
          radioList = [];
          aList = v.list;
          if (uistate[0].value) {
            aList = v.listZh;
          }
          aList.forEach(function(rv, ri) {
            radioList.push(m('input[type=radio]', {
              value: rv,
              checked: (ri == v.value),
            }));
            radioList.push(rv);
          });
          ui = m('form', {
            onchange: function(e) {
              aList.forEach(function(rv, ri) {
                if (rv === e.target.value) {
                  v.value = ri;
                }
              });
              saveState();
            },
          }, radioList);
        } else {
          ui = [
            m('span', v.value),
            m('input[type=range]', {
              value: v.value,
              min: v.min,
              max: v.max,
              step: v.step,
              oninput: function(e) {
                v.value = +e.target.value;
              },
              onchange: function() {
                saveState();
              },
            }),
          ];
        }
      } else if (typeof(v.value) === 'string') {
        ui = m('input[type=text]', {
          value: v.value,
          onchange: function(e) {
            v.value = e.target.value;
            saveState();
          },
        });
      }
      if (v.value === undefined) {
        if (v.label === '---') {
          uiList.push(m('li', '----------'));
        } else {
          uiList.push(m('li', getLabel(a, v)));
        }
      } else if (v.list === undefined) {
        uiList.push(m('li', m('label', ui, getLabel(a, v))));
      } else {
        uiList.push(m('li', m('label', getLabel(a, v), ui)));
      }
    });
    return m('',
        m('div.version', 'Tsum Tsum v' + VERSION),
        m('button.reset', {
          onclick() {
            if (localStorage !== undefined) {
              localStorage.clear();
            }
          },
        },
          (uistate[0].value) ? '重置' : 'RESET'
        ),
        m('ol', uiList),
    );
  },
};

function genStartCommand() {
  var command = 'start(';
  var n = 0;
  uistate.forEach(function(v) {
    if (typeof v.value === 'boolean') {
      command += v.value.toString() + ', ';
      n++;
    } else if (typeof v.value === 'number') {
      if (v.list !== undefined) {
        command += '"' + v.keyList[v.value] + '", ';
        n++;
      } else {
        command += v.value + ', ';
        n++;
      }
    } else if (typeof v.value === 'string') {
      command += '"' + v.value + '", ';
      n++;
    }
  });
  command += n.toString() + ');';
  console.log('dbg: command=' + command);
  return command;
}

m.mount(document.body, {
  view: function() {
    return m(ConfigPage);
  },
});

/* eslint no-unused-vars: ["error", { "vars": "local" }]*/
function onEvent(eventType) { // export for webview UI
  if (eventType == 'OnPlayClick') {
    JavaScriptInterface.runScript(genStartCommand());
  } else if (eventType == 'OnPauseClick') {
    JavaScriptInterface.runScript('stop();');
  }
}

function onLog(message) { // export for webview UI
  console.log(message);
}

// vim:et sw=2 ts=2 ai
