window.onload = function () {
	//运行瀑布流主函数
	PBL('wrap', 'box');

	//模拟数据
	var data = [
		{ 'src': '1.jpg', 'title': '【热门菜色】甜酒冲蛋', 'desc': '这个菜，最重要的就是最后一步淋油！所以千万别图省事，要不然味道差太多， 这个菜的味道，麻椒鲜香！绝对刺激！只要是你喜欢吃的蔬菜都是毛血旺！会了这个做法，只要你喜欢，配啥都可以！' },
		{ 'src': '2.jpg', 'title': '【热门菜色】甜酒冲蛋' },
		{ 'src': '3.jpg', 'title': '【热门菜色】甜酒冲蛋', 'desc': '这个菜，最重要的就是最后一步淋油！所以千万别图省事，要不然味道差太多' },
		{ 'src': '4.jpg' },
		{ 'src': '5.jpg', 'title': '【热门菜色】甜酒冲蛋', 'desc': 'This is a desc' },
		{ 'src': '6.jpg', 'title': '【热门菜色】甜酒冲蛋' },
		{ 'src': '7.jpg', 'title': '【热门菜色】甜酒冲蛋' },
		{ 'src': '8.jpg', 'title': '【热门菜色】甜酒冲蛋', 'desc': '这个菜，最重要的就是最后一步淋油！所以千万别图省事，要不然味道差太多' },
		{ 'src': '9.jpg', 'title': '【热门菜色】甜酒冲蛋' },
		{ 'src': '10.jpg', 'title': '【热门菜色】甜酒冲蛋', 'desc': '这个菜，最重要的就是最后一步淋油！所以千万别图省事，要不然味道差太多' }
	];


	//设置滚动加载
	window.onscroll = function () {
		//校验数据请求
		if (getCheck()) {
			var wrap = document.getElementById('wrap');
			for (i in data) {
				//创建box
				var box = document.createElement('div');
				box.className = 'box';
				wrap.appendChild(box);
				//创建info
				var info = document.createElement('div');
				info.className = 'info';
				box.appendChild(info);
				//创建a标记
				var a = document.createElement('a');
				a.href = "https://v.qq.com";
				a.target = "_blank"
				info.appendChild(a);
				if (!data[i].title) {
					var mark = document.createElement('div');
					mark.className = 'mark adv';
					mark.innerHTML = '推广';
					a.appendChild(mark);
				}else if(Math.floor(Math.random()*10) < 3){
					var mark = document.createElement('div');
					mark.className = 'mark hot';
					mark.innerHTML = '热';
					a.appendChild(mark);
				}
				//创建pic
				var pic = document.createElement('div');
				pic.className = 'pic';
				a.appendChild(pic);
				//创建img
				var img = document.createElement('img');
				img.src = './static/images/' + data[i].src;
				img.style.height = 'auto';
				pic.appendChild(img);
				//创建title
				if (data[i].title) {
					var title = document.createElement('div');
					title.className = 'title';
					title.innerHTML = data[i].title;
					a.appendChild(title);
				}
				//创建描述
				if (data[i].desc) {
					var desc = document.createElement('div');
					desc.className = 'desc';
					desc.innerHTML = data[i].desc;
					info.appendChild(desc);
				}
				//创建more标记
				if (data[i].title) {
					var more = `<div class="more">
						<div class="author">
							<img src="https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=425476039,1607789192&fm=26&gp=0.jpg" onerror="javascript:this.src='./static/images/default_head.png'">
							<span>喵星人</span>
						</div>
						<div class="like">
							<i class="heart"></i>
							<span class="likes">12</span>
						</div>
					</div>`
					info.insertAdjacentHTML('beforeEnd', more)
				}
			}
			PBL('wrap', 'box');
		}
	}
}
/**
* 瀑布流主函数
* @param  wrap	[Str] 外层元素的ID
* @param  box 	[Str] 每一个box的类名
*/
function PBL(wrap, box) {
	//	1.获得外层以及每一个box
	var wrap = document.getElementById(wrap);
	var boxs = getClass(wrap, box);
	//	2.获得屏幕可显示的列数
	var boxW = boxs[0].offsetWidth;
	var colsNum = Math.floor(document.documentElement.clientWidth / boxW);
	wrap.style.width = boxW * colsNum + 'px';//为外层赋值宽度
	//	3.循环出所有的box并按照瀑布流排列
	var everyH = [];//定义一个数组存储每一列的高度
	for (var i = 0; i < boxs.length; i++) {
		if (i < colsNum) {
			everyH[i] = boxs[i].offsetHeight;
		} else {
			var minH = Math.min.apply(null, everyH);//获得最小的列的高度
			var minIndex = getIndex(minH, everyH); //获得最小列的索引
			getStyle(boxs[i], minH, boxs[minIndex].offsetLeft, i);
			everyH[minIndex] += boxs[i].offsetHeight;//更新最小列的高度
		}
	}
}
/**
* 获取类元素
* @param  warp		[Obj] 外层
* @param  className	[Str] 类名
*/
function getClass(wrap, className) {
	var obj = wrap.getElementsByTagName('*');
	var arr = [];
	for (var i = 0; i < obj.length; i++) {
		if (obj[i].className == className) {
			arr.push(obj[i]);
		}
	}
	return arr;
}
/**
* 获取最小列的索引
* @param  minH	 [Num] 最小高度
* @param  everyH [Arr] 所有列高度的数组
*/
function getIndex(minH, everyH) {
	for (index in everyH) {
		if (everyH[index] == minH) return index;
	}
}
/**
* 数据请求检验
*/
function getCheck() {
	var documentH = document.documentElement.clientHeight;
	var scrollH = document.documentElement.scrollTop || document.body.scrollTop;
	return documentH + scrollH >= getLastH() ? true : false;
}
/**
* 获得最后一个box所在列的高度
*/
function getLastH() {
	var wrap = document.getElementById('wrap');
	var boxs = getClass(wrap, 'box');
	return boxs[boxs.length - 1].offsetTop + boxs[boxs.length - 1].offsetHeight;
}
/**
* 设置加载样式
* @param  box 	[obj] 设置的Box
* @param  top 	[Num] box的top值
* @param  left 	[Num] box的left值
* @param  index [Num] box的第几个
*/
var getStartNum = 0;//设置请求加载的条数的位置
function getStyle(box, top, left, index) {
	if (getStartNum >= index) return;
	$(box).css({
		'position': 'absolute',
		'top': top,
		"left": left,
		"opacity": "0"
	});
	$(box).stop().animate({
		"opacity": "1"
	}, 999);
	getStartNum = index;//更新请求数据的条数位置
}