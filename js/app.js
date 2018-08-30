(function (window) {
	'use strict';

	// Your starting point. Enjoy the ride!
	var vm = new Vue({
		el: "#app",
		data: {
			list: [
			],
			newText:'',
			editIndex:'',
			listStatus:"all"
		},
		methods: {
			add() {
				if(!this.newText.trim()){
					console.log('不能为空');
					this.newText=""
					return ;
				}
				this.list.push({text:this.newText,isCompleted:false})
				this.newText=""
			},
			del(index) {
				this.list.splice(index, 1)
			},
			isShow(value){
				switch (this.listStatus) {
					case "active":
						return !value.isCompleted;
						break;
					case "completed":
						return value.isCompleted;
						break;
					default:
						return true;
						break;
				}
			},
			clearAll(){
				this.list=this.list.filter(value=>{
					return !value.isCompleted
				})
			}
		},
		computed: {
			toggleAll: {
				//设置
				set(newVal) {
					this.list.forEach(value => {
						value.isCompleted = newVal
					})
				},
				//获取
				get() {
					if(this.list.length==0){
						return false;
					}
					return !this.list.filter(value => {
						return !value.isCompleted
					}).length
				}
			}
		},
		mounted () {
			this.list = JSON.parse(localStorage.getItem("todolist"))||[]
		},
		updated () {
			localStorage.setItem('todolist',JSON.stringify(this.list))
		}
	})

})(window);
