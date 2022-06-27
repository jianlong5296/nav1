const $siteList =$('.siteList')
const $lastLi = $siteList.find('li.last')
const x =localStorage.getItem('x')  //尝试读取当前网站上的x
const xObject =JSON.parse(x)        //如果x能成功的变成一个对象
const hashMap = xObject ||[         //把这个对象放在hashMap里，如果不行，就初始化含2项的数组
    {logo: 'D',url:'https://developer.mozilla.org/zh-CN/'},
    {logo: 'J',url:'https://www.jd.com/'},
    {logo: 'M',url:'https://music.163.com/'},
    {logo: 'T',url:'https://www.taobao.com/'},
    {logo: 'X',url:'https://xiedaimala.com/'}
    

]
const simplifyUrl = (url)=>{            //定义简化url函数
    return url.replace('https://', '')
              .replace('http://', '')
              .replace('www.', '')
              .replace(/\/.*/, '')   //删除/开头的内容
}
const render = ()=>{
    $siteList. find('li:not(.last)').remove()
    hashMap.forEach((node,index)=>{         /*index加完以后有个括号记得写*/
        const $li =$(`<li>
        <div class="site">
            <div class="logo">${node.logo}</div>
            <div class="link">${simplifyUrl(node.url)}</div>
            <div class="close">         
            <svg class="icon">
            <use xlink:href="#icon-close"></use>
            </svg>
            </div>
        </div>
        </li>`).insertBefore($lastLi)
    $li.on('click',()=>{            //代替a标签功能
        window.open(node.url)
    })
    $li.on('click','.close',(e)=>{
        e.stopPropagation()  //阻止冒泡
        hashMap.splice(index,1)
        render()
        })

    })
}
render()

$('.addButton')
 .on('click',()=>{
   let  url = window.prompt('请问你要添加的网址是啥？')
   if(url.indexOf('http')!==0){
        url = 'https://'+ url
   }
    console.log(url)
    hashMap.push({
        logo:simplifyUrl(url)[0].toUpperCase(),  //直接调用简化url函数，再取大写
        url:url
    }),
    render()
})

window.onbeforeunload = ()=>{           //关闭页面时会把当前的hashMap存到x里面，下次进入时会保存
    console.log('页面要关闭了')
    const string = JSON.stringify(hashMap) //把一个对象变成对象
    localStorage.setItem('x',string)
}

/*$(document).on('keypress',(e) => {
    const {key}= e          
    for (let i = 0; i< hashMap.length; i++) {
        if (hashMap[i].logo.toLowerCase() === key) {
            window.open(hashMap[i].url)
        }
    }})*/
