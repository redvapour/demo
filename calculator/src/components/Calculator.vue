<template>
  <div class="calculate">
    <div class="screen">
      <div class="process">{{ processScreen }}</div>
      <div class="result">{{ resultScreen }}</div>
    </div>
    <div class="buttons" @click="fn">
      <button class="function-top" data-type="clear">AC</button>
      <button class="function-top" data-type="backspace">×</button>
      <button class="function-top" data-type="percent">%</button>
      <button class="function-right" data-type="operation">÷</button>
      <button>7</button>
      <button>8</button>
      <button>9</button>
      <button class="function-right" data-type="operation">*</button>
      <button>4</button>
      <button>5</button>
      <button>6</button>
      <button class="function-right" data-type="operation">-</button>
      <button>1</button>
      <button>2</button>
      <button>3</button>
      <button class="function-right" data-type="operation">+</button>
      <button class="double">0</button>
      <button>.</button>
      <button class="function-right" data-type="equal">=</button>
    </div>
  </div>
</template>

<script>
export default {
  name: "CalculatorCalculator",

  data() {
    return {
      processScreen: "",
      resultScreen: "0",
      flag: 0,
    };
  },
  methods: {
    fn(e) {
      if (e.target.nodeName === "BUTTON") {
        const type = e.target.dataset.type;
        if (type === "clear") {
          this.clear();
        } else if (type === "backspace") {
          this.backspace();
        } else if (type === "percent") {
          this.percent();
        } else if (type === "operation") {
          this.operation(e.target.innerHTML);
        } else if (type === "equal") {
          this.equal();
        } else {
          this.pushNumber(e.target.innerHTML);
        }
      }
    },
    clear() {
      this.processScreen = "";
      this.resultScreen = "0";
      this.flag = 0;
    },
    backspace() {
      this.processScreen = this.processScreen.slice(0, -1);
      if (this.processScreen === "") {
        this.resultScreen = "0";
        this.flag = 0;
      } else {
        this.result = "";
      }
    },
    percent() {
      this.equal();
      this.resultScreen =
        Math.round((this.resultScreen / 100) * 10 ** 8) / 10 ** 8;
    },
    operation(operator) {
      if (this.processScreen === "") return;
      if (this.flag !== 0) {
        this.equal();
        this.processScreen = this.resultScreen;
      }
      this.processScreen += operator;
      this.flag++;
    },
    equal() {
      let a = /\+|\-|\*|\÷/;
      let arr = this.processScreen.split(a);
      let str = this.processScreen;
      let sign = str.split("").reverse().join("").match(a);
      if (sign && !arr[1]) {
        this.resultScreen = arr[0];
        return;
      }
      if (!sign) {
        this.resultScreen = this.processScreen;
        return;
      }
      if (!arr[0]) {
        arr.shift();
        arr[0] = -arr[0];
        console.log(arr[0], arr[1]);
      }
      switch (sign[0]) {
        case "+":
          this.resultScreen = +arr[0] + +arr[1];
          this.resultScreen = Math.round(this.resultScreen * 10 ** 8) / 10 ** 8;
          break;
        case "-":
          this.resultScreen = arr[0] - arr[1];
          this.resultScreen = Math.round(this.resultScreen * 10 ** 8) / 10 ** 8;
          break;
        case "*":
          this.resultScreen = arr[0] * arr[1];
          this.resultScreen = Math.round(this.resultScreen * 10 ** 8) / 10 ** 8;
          break;
        case "÷":
          if (arr[1] === "0") {
            alert("除数不可以是0哦");
            return;
          }
          this.resultScreen = arr[0] / arr[1];
          this.resultScreen = Math.round(this.resultScreen * 10 ** 8) / 10 ** 8;
          break;
        default:
          break;
      }
    },
    pushNumber(num) {
      let a = /\+|\-|\*|\÷/;
      let arr = this.processScreen.split(a);
      if (this.processScreen === "0" && num !== ".") {
        this.backspace();
      }
      if (this.flag) {
        if (arr[1].indexOf(".") !== -1 && num === ".") {
          return;
        }
        if (arr[1][0] === "0" && arr[1].length === 1) {
          if (num === "0") {
            this.backspace();
          } else if (num !== "0" && num !== ".") {
            this.backspace();
          }
        }
      } else {
        if (this.processScreen.indexOf(".") !== -1 && num === ".") {
          return;
        }
      }
      this.processScreen += num;
      this.resultScreen = "";
      if (this.processScreen.length > 12) {
        alert("数据过大");
        this.backspace();
      }
    },
  },
};
</script>

<style lang="css" scoped>
.calculate {
    width: 400px;
    height: 800px;
    background-color: #000;
    border-radius: 50px;
}

.screen {
    height: 250px;
    display: flex;
    color: #fff;
    font-size: 40px;
    flex-direction: column;
    align-items: flex-end;
    padding: 60px 30px;
}

.result {
    font-size: 50px;
}

.buttons {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    grid-template-rows: repeat(4, 1fr);
    grid-gap: 10px;
}

.buttons button {
    width: 60px;
    height: 60px;
    border-radius: 50px;
    background-color: #333;
    font-size: 30px;
    color: #fff;
    border: none;
    margin: 10px;
    justify-self: center;
    align-self: center;
}

.buttons button:active {
    filter: brightness(120%);
}

.buttons .function-top {
    background-color: rgb(165, 165, 165);
    color: #000;
}

.buttons .function-right {
    background-color: rgb(239, 164, 62);
}

.buttons .double {
    width: 160px;
    grid-column: 1 / 3;
    text-align: left;
    padding-left: 25px;
}
</style>