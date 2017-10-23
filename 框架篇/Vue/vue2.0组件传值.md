- 普通值的传递
```
<!--父组件-->
<child :inputValue="msg"></child>
<!--子组件-->
export default{
        props: {
          inputValue: String
        }
    }
```
- 函数的传递

```
<!--父组件，recieveMessage为函数-->
<child2 v-on:message="recieveMessage"></child2>
<!--子组件-->
methods: {
      onInput: function () {
        if (this.msg.trim()) {  <!--trim()去两边空格-->
          this.$emit('message', this.msg);
        }
      }
    }
```
