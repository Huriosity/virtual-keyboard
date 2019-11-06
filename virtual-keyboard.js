let english = localStorage.getItem('english');

let altbtn = false;
let capsBtn = false;
let shiftBtn = false;

const dontWriteBtn = [8, 9, 13, 16, 17, 18, 20, 32, 37, 38, 39, 40, 46];

if (english === null) {
  english = true;
} else {
  english = JSON.parse(english);
}

function checkWhithTable(subStr, table) {
  for (let code in table) {
      if (code == subStr){
          return table[code];
      }
  }
  return '';
}

function removeChar(text) {
  return text.slice(0, -1);
}

/* const keys = Object.keys(currentValues);
const values = Object.values(currentValues);
for (let i = 0; i < keys.length; i += 1) {
    yield put(setCurrentValue(keys[i], values[i]));
} */

const rus_layout = {
  'й': 'q',
  'ц' : 'w',
  'у' : 'e',
  'к' : 'r',
  'е' : 't',
  'н' : 'y',
  'г' : 'u',
  'ш' : 'i',
  'щ' : 'o',
  'з' : 'p',
  'х' : '[',
  'ъ' : ']',

  'ф' : 'a',
  'ы' : 's',
  'в' : 'd',
  'а' :  'f',
  'п' : 'g',
  'р' : 'h',
  'о' : 'j',
  'л' : 'k',
  'д' : 'l',
  'ж' : ';',
  'э' : '\'',

  'я' : 'z',
  'ч' : 'x',
  'с' : 'c',
  'м' : 'v',
  'и' : 'b',
  'т' : 'n',
  'ь' : 'm',
  'б' : ',',
  'ю' : '.',
  '.': '/',
};

const digit_analog = {
  '48':')',
  '49':'!',//1
  '50':'\\',//2
  '51':'#',//3
  '52':'$',//4
  '53':'%',//5
  '54':'^',//6
  '55':'&',//7
  '56':'*',//8
  '57':')',//9
};

const arrows = {
  '37' :'◄',//'37',
  '38' :'▲',//'38',
  '39' :'►',//'39',
  '40' :'▼',//'40',
}

const keyboard = {
  elements: {
    main: null,
    keysContainer: null,
    keys: [],
  },

  init() {
    this.elements.main = document.createElement('main');
    this.elements.textarea = document.createElement('textarea');
    this.elements.keysContainer = document.createElement('div');

    this.elements.keysContainer.appendChild(this.createKeys());
    this.elements.keysContainer.classList.add('keyboard__keys');
    this.elements.textarea.classList.add('keyboard__output');

    this.elements.main.appendChild(this.elements.textarea);
    this.elements.main.appendChild(this.elements.keysContainer);
    this.elements.main.classList.add('wrapper');

    document.body.appendChild(this.elements.main);
  },

  clear() {
    document.body.removeChild(this.elements.main);
},

  createKeys() {
    const fragment = document.createDocumentFragment();
    const keyLayout = english ? [
      '`', '1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '-', '=', 'backspace',
      'Tab', 'q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p', '[', ']', 'del',
      'caps', 'a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l', ';', '\'', '\\', 'enter',
      'shift', 'z', 'x', 'c', 'v', 'b', 'n', 'm', ',', '.', '/', 'up',
      'ctrl', 'alt', 'space', 'left', 'down', 'right',
    ] : [
      'ё', '1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '-', '=', 'backspace',
      'Tab', 'й', 'ц', 'у', 'к', 'е', 'н', 'г', 'ш', 'щ', 'з', 'х', 'ъ', 'del',
      'caps', 'ф', 'ы', 'в', 'а', 'п', 'р', 'о', 'л', 'д', 'ж', 'э', '\\', 'enter',
      'shift', 'я', 'ч', 'с', 'м', 'и', 'т', 'ь', 'б', 'ю', '.', 'up',
      'ctrl', 'alt', 'space', 'left', 'down', 'right',
    ];

    keyLayout.forEach((key) => {
      const keyElement = document.createElement('button');
      const insertLineBreak = english ? ['backspace', 'del', 'enter', 'up'].indexOf(key) !== -1 : ['backspace', 'del', 'enter', 'up'].indexOf(key) !== -1;

      keyElement.setAttribute('type', 'button');
      keyElement.classList.add('keyboard__key');
      keyElement.textContent = key.toLowerCase();

      keyElement.addEventListener('mousedown', () => {

        for (let i = 0; i < dontWriteBtn.length; i += 1) {
          if (keyElement.id == dontWriteBtn[i]) {
            break;
          }
          if (i === dontWriteBtn.length - 1) {
            if (capsBtn) {
              if (shiftBtn) {
                if (keyElement.id >= 48 && keyElement.id < 58) {
                  document.getElementsByClassName('keyboard__output')[0].value += checkWhithTable(keyElement.id, digit_analog);
                }
                else {
                  document.getElementsByClassName('keyboard__output')[0].value += document.getElementById(keyElement.id.toString(10)).textContent;
                }
              } else {
                document.getElementsByClassName('keyboard__output')[0].value += document.getElementById(keyElement.id.toString(10)).textContent.toUpperCase();
              }
            } else {
              if (shiftBtn) {
                if (keyElement.id >= 48 && keyElement.id < 58 ) {
                  document.getElementsByClassName('keyboard__output')[0].value += checkWhithTable(keyElement.id,digit_analog);
                }
                else{
                  document.getElementsByClassName('keyboard__output')[0].value += document.getElementById(keyElement.id.toString(10)).textContent.toUpperCase();
                }
              }
              else{
                document.getElementsByClassName('keyboard__output')[0].value += document.getElementById(keyElement.id.toString(10)).textContent;
              }
            }
            keyElement.classList.add('selected');
          }
        }
        if (keyElement.id >= 37 && keyElement.id < 41 ) {
          document.getElementsByClassName('keyboard__output')[0].value += checkWhithTable(keyElement.id, arrows);
        }
    
        if (keyElement.id == 18) {
          altbtn = true;
        }
    
        if (keyElement.id == 16) {
          shiftBtn = true;
        }
    
        if (keyElement.id == 8) {
          document.getElementsByClassName('keyboard__output')[0].value = removeChar(document.getElementsByClassName('keyboard__output')[0].value);
        }

        if (keyElement.id == 20) {
          if (capsBtn) {
            capsBtn = false;
          } else {
            capsBtn = true;
          }
        }

        if (keyElement.id == 32) {
          document.getElementsByClassName('keyboard__output')[0].value += ' ';
        }
  
        if (keyElement.id == 13) {
          document.getElementsByClassName('keyboard__output')[0].value += '\n';
        }
        if (keyElement.id == 9) {
          document.getElementsByClassName('keyboard__output')[0].value += '\t';
        }
        keyElement.classList.add('selected');
      });

      keyElement.addEventListener('mouseup', () => {
        keyElement.classList.remove('selected');
    
        if (keyElement.id == 18) {
          altbtn = false;
        }
    
        if (keyElement.i == 16) {
          shiftBtn = false;
        }
    
        if (keyElement.id == 16 && altbtn === true) {
          english = !english;
          localStorage.setItem('english', english);
          keyboard.clear();
          keyboard.init();
        }
      });
      

      switch (key) {
        case '0':
        case '1':
        case '2':
        case '3':
        case '4':
        case '5':
        case '6':
        case '7':
        case '8':
        case '9':
          keyElement.setAttribute('id', keyElement.textContent.charCodeAt());
          break;

        case '-':
          keyElement.setAttribute('id', 189);
          break;

        case '=':
          keyElement.setAttribute('id', 187);
          break;

        case 'ё':
        case '`':
          keyElement.setAttribute('id', 192);
          break;

        case 'х':
        case '[':
          keyElement.setAttribute('id', 219);
          break;

        case 'ъ':
        case ']':
          keyElement.setAttribute('id', 221);
          break;

        case 'ж':
        case ';':
          keyElement.setAttribute('id', 186);
          break;

        case 'э':
        case '\'':
          keyElement.setAttribute('id', 222);
          break;

        case '\\':
          keyElement.setAttribute('id', 220);
          break;

        case 'б':
        case ',':
          keyElement.setAttribute('id', 188);
          break;

        case '/':
          keyElement.setAttribute('id', 191);
          break;

        case 'ю':
        case '.':
          keyElement.setAttribute('id', 190);
          break;

        case 'backspace':
          keyElement.setAttribute('id', 8);
          keyElement.classList.add('key__backspace');
          break;

        case 'Tab':
          keyElement.setAttribute('id', 9);
          break;

        case 'caps':
          keyElement.setAttribute('id', 20);
          break;

        case 'shift':
          keyElement.setAttribute('id', 16);
          break;

        case 'ctrl':
          keyElement.setAttribute('id', 17);
          break;

        case 'alt':
          keyElement.setAttribute('id', 18);
          break;

        case 'space':
          keyElement.setAttribute('id', 32);
          keyElement.classList.add('key__space');
          break;

        case 'enter':
          keyElement.setAttribute('id', 13);
          break;

        case 'del':
          keyElement.setAttribute('id', 46);
          break;

        case 'left':
          keyElement.setAttribute('id', 37);
          keyElement.classList.add('key__left');
          break;
        case 'up':
          keyElement.setAttribute('id', 38);
          keyElement.classList.add('key__up');
          break;
        case 'right':
          keyElement.setAttribute('id', 39);
          break;

        case 'down':
          keyElement.setAttribute('id', 40);
          break;

        default:
          if (english) {
            keyElement.setAttribute('id', keyElement.textContent.charCodeAt() - 32);
          } else {
            keyElement.setAttribute('id', checkWhithTable(keyElement.textContent, rus_layout).charCodeAt() - 32);
          }
          break;
      }
      fragment.appendChild(keyElement);

      if (insertLineBreak) {
        fragment.appendChild(document.createElement('br'));
      }
    });

    return fragment;
  },
};

window.addEventListener('DOMContentLoaded', () => {
  keyboard.init();

  document.addEventListener ( 'keyup', () => {
    document.getElementById(event.keyCode.toString(10)).classList.remove('selected');

    if (event.keyCode === 18) {
      altbtn = false;
    }

    if (event.keyCode === 16) {
      shiftBtn = false;
    }

    if (event.keyCode === 16 && altbtn === true) {
      english = !english;
      localStorage.setItem('english', english);
      keyboard.clear();
      keyboard.init();
    }
  });

  document.addEventListener ( 'keydown', () => {

    document.getElementById(event.keyCode.toString(10)).classList.add('selected');
    for (let i = 0; i < dontWriteBtn.length; i += 1) {
      if (event.keyCode === dontWriteBtn[i]) {
        break;
      }
      if (i === dontWriteBtn.length - 1) {
        if (capsBtn) {
          if (shiftBtn) {
            if (event.keyCode >= 48 && event.keyCode < 58) {
              document.getElementsByClassName('keyboard__output')[0].value += checkWhithTable(event.keyCode, digit_analog);
            }
            else {
              document.getElementsByClassName('keyboard__output')[0].value += document.getElementById(event.keyCode.toString(10)).textContent;
            }
          } else {
            document.getElementsByClassName('keyboard__output')[0].value += document.getElementById(event.keyCode.toString(10)).textContent.toUpperCase();
          }
        } else {
          if (shiftBtn) {
            if (event.keyCode >= 48 && event.keyCode < 58 ) {
              document.getElementsByClassName('keyboard__output')[0].value += checkWhithTable(event.keyCode,digit_analog);
            }
            else{
              document.getElementsByClassName('keyboard__output')[0].value += document.getElementById(event.keyCode.toString(10)).textContent.toUpperCase();
            }
          }
          else{
            document.getElementsByClassName('keyboard__output')[0].value += document.getElementById(event.keyCode.toString(10)).textContent;
          }
        }
      }
    }

    if (event.keyCode >= 37 && event.keyCode < 41 ) {
      document.getElementsByClassName('keyboard__output')[0].value += checkWhithTable(event.keyCode, arrows);
    }

    if (event.keyCode === 18) {
      altbtn = true;
    }

    if (event.keyCode === 16) {
      shiftBtn = true;
    }

    if (event.keyCode === 8) {
      document.getElementsByClassName('keyboard__output')[0].value = removeChar(document.getElementsByClassName('keyboard__output')[0].value);
    }

    if (event.keyCode === 20) {
      if(capsBtn) {
        capsBtn = false;
      }
      else {
        capsBtn = true;
      }
                
    }

    if (event.keyCode === 32) {
      document.getElementsByClassName('keyboard__output')[0].value += ' ';
    }
            
    if (event.keyCode === 13) {
      document.getElementsByClassName('keyboard__output')[0].value += '\n';
    }

    if (event.keyCode === 9) {
      document.getElementsByClassName('keyboard__output')[0].value += '\t';
    }
  });
});
