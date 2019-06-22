'use strict;';

var VERSION = 1;
var storeKey = 'com.twpda.tsum.'+VERSION;
var uiState = [
  {label: 'Switch language:English(英文)',
    labelZh: '切換語言:中文(Chinese)', value: false}, // true for zh_TW
  {label: 'Play game', labelZh: '玩遊戲', value: true},
  {label: 'Receive gift', labelZh: '收禮物', value: true},
  {label: 'Send hearts', labelZh: '送心', value: false},
  {label: '--- Bonus item switches', labelZh: '--- 遊戲寶物選項'},
  {label: 'Auto play count:(0: forever)',
    labelZh: '自動玩次數(0:永遠)',
    value: 1, min: 0, max: 10, step: 1},
  {label: 'Score+10%', labelZh: '分數加10%', value: false},
  {label: 'Coin+', labelZh: '加金幣', value: false},
  {label: 'Exp+10%', labelZh: '經驗值加10%', value: false},
  {label: 'Time+10%', labelZh: '時間加10%', value: false},
  {label: 'Chain 6 tsum to generate Bubble', labelZh: '串6隻產生泡泡',
    value: false},
  {label: 'Reduce Tsum kind', labelZh: '減少種類', value: false},
  {label: '--- Misc options', labelZh: '--- 雜項'},
  {label: 'Auto launch Tsum app', labelZh: '自動開啟 Tsum App', value: false},
  {label: 'Permit ROOT scan', labelZh: '允許Root掃描', value: false},
  {label: 'Hibernate period(msec)', labelZh: '休眠周期(微秒)',
    value: 10000, min: 5000, max: 60000, step: 5000},
  {label: 'Max not in game time(msec) to hibernate',
    labelZh: '超過最長不在遊戲時間(微秒)進入休眠',
    value: 1000, min: 1000, max: 60000, step: 1000},
  {label: 'Check in game period(msec)', labelZh: '檢查是否在遊戲內周期(微秒)',
    value: 500, min: 50, max: 3000, step: 50},
  {label: 'Find game page period(msec)', labelZh: '辨識遊戲頁面周期(微秒)',
    value: 100, min: 50, max: 3000, step: 50},
  {label: 'Wait time for click unknown game page(msec)',
    labelZh: '點擊未知頁面前等待時間(微秒)',
    value: 1000, min: 1000, max: 10000, step: 1000},
  {label: 'Capture period(msec)', labelZh: '擷取畫面周期(微秒)',
    value: 50, min: 50, max: 3000, step: 50},
];

function saveState() {
  if (localStorage !== undefined) {
    localStorage.setItem(storeKey, JSON.stringify(uiState));
  }
}

function loadState() {
  if (localStorage !== undefined) {
    var v = localStorage.getItem(storeKey);
    if (v !== null) {
      uiState = JSON.parse(v);
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
    uiState.forEach(function(v, i, a) {
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
          if (uiState[0].value) {
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
          (uiState[0].value) ? '重置' : 'RESET'
        ),
        m('ol', uiList),
    );
  },
};

function genStartCommand() {
  var command = 'start([';
  uiState.forEach(function(v) {
    if (typeof v.value === 'boolean') {
      command += v.value.toString() + ', ';
    } else if (typeof v.value === 'number') {
      if (v.list !== undefined) {
        command += '"' + v.keyList[v.value] + '", ';
      } else {
        command += v.value + ', ';
      }
    } else if (typeof v.value === 'string') {
      command += '"' + v.value + '", ';
    }
  });
  command += ']);';
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
