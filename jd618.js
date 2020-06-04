//京东618叠蛋糕js脚本0521
/**
 * 作者: dkl78167816
 * 代码参考并感谢:ZainCheung, Mr.Lih,以及没有找到出处的一位大佬
 */

var speed = 1;
var taskList = ['去加购','8秒', '浏览5个', '浏览可得'];
var appName = "京东";

dialogs.alert("请确认无障碍和悬浮窗权限已开启,感谢使用\n作者:dkl78167816\n仅供学习参考");
menu: while (true) {
  var choose = dialogs.select("请根据你的手机性能(卡不卡)以及网速选择速度", "快速", "一般", "缓慢");
  switch (choose) {
    case -1:
      toast("请选择");
      continue menu;
    case 0:
      toast("即将快速执行脚本");
      speed = 1;
      break menu;
    case 1:
      toast("即将一般速度执行脚本");
      speed = 1.5;
      break menu;
    case 2:
      toast("即将低速执行脚本");
      speed = 2;
      break menu;

    default:
      break;
  }
}
console.show();
auto.waitFor();

var i = 0;
var j = 0;
sleep(1000);
//打开活动页面
log("正在进入个人中心");
gotoJd();

sleep(1000 * speed);
//签到
decay = 200
while (!text("已签到").exists()) {
    text("去签到").findOne().click();
    sleep(decay * speed);
    decay += 200
}
log("已签到")

while (1) {
  var next = false;
  var a = text("去完成").findOnce(j);
  if (a != null) {
      //获取父控件
      var b = a.parent().parent().parent();
      //获取第一个子控件
      var c = b.child(0).child(1).text();
      taskList.forEach(task => {
          switch (task) {
              case '8秒':
                  if (c.search(task) != -1) {
                      i++;
                      next = true;
                      log("开始执行8秒任务");
                      sleep(random(501, 515) * speed);
                      a.click();
                      sleep(random(5001, 5011) * speed);
                      textStartsWith("恭喜完成").findOne(8000);
                      sleep(random(201, 211) * speed);
                      back();
                      log("已完成第" + i + "次任务！");
                      sleep(random(201, 211) * speed);
                      j = 0;
                  }
                  break;
              case '浏览5个':
                  if (c.search(task) != -1) {
                      i++;
                      next = true;
                      log("开始执行浏览5个商品任务");
                      sleep(random(501, 515) * speed);
                      a.click();
                      sleep(random(1001, 1031) * speed);
                      for (var t = 0; t < 5; t++) {
                          if (textContains("浏览以下").findOnce()) {
                              log("正在浏览第" + (t + 1) + "个商品！");
                              idContains("view_").findOnce(t).click();
                              sleep(random(1501, 1535) * speed)
                              back()
                              sleep(random(1501, 1535) * speed)
                          } else { }
                      }
                      textStartsWith("已完成").findOne(8000);
                      sleep(random(1001, 1031) * speed);
                      try {
                          // 点击左上角的返回键
                          id("fe").findOne().click();
                      } catch (error) {
                          back();
                      }
                      log("已完成第" + i + "次任务！");
                      sleep(random(2001, 2051) * speed);
                      j = 0;
                  }
                  break;
              case '去加购':
                  if (c.search(task) != -1) {
                      i++;
                      next = true;
                      a.click();
                      log("开始执行加购任务");
                      sleep(random(1001, 1031) * speed);
                      for (var t = 0; t < 5; t++) {
                          //修复加购问题,删掉了.child(2)子节点
                          idContains("cart_").findOnce(t).click();
                          sleep(random(1001, 1031) * speed)
                      }
                      try {
                        id("fe").findOne().click();
                      } catch (error) {
                          back();
                      }
                      log("已完成第" + i + "次任务！");
                      sleep(random(2001, 2051) * speed);
                      j = 0;
                  }
                  break;
              case '浏览可得':
                  if (c.search(task) != -1) {
                      i++;
                      next = true;
                      a.click();
                      log("开始执行快速浏览任务");
                      sleep(random(1001, 1031) * speed);
                      back();
                      log("已完成第" + i + "次任务！");
                      sleep(random(2001, 2051) * speed);
                      j = 0;
                  }
                  break;
              default:
                  break;
          }
      });
      if (next) { j = 0; }
      else { j++; }
  } else {
      correct();
  }
}

/**
 * 偏离脚本预期界面，进行纠正
 */
function correct() {
  log("可能出了点问题,正在尝试第一次纠正");
  for (let index = 0; index < 3; index++) {
    back();
    sleep(1000 * speed);
    var d = text("去完成").findOnce(j);
    if (d != null) {
      return
    }
  }

  if (d == null) {
    log("正在尝试第二次纠正");
    gotoJd();
    var e = text("去完成").findOnce(j);
    if (e == null) {
      log("貌似没有任务了，脚本退出\n如未完成，请重新运行");
      exit();
    }
  }
}

/**
 * 打开京东App并跳转到任务栏
 */
function gotoJd() {
    // 打开京东APP
    launchApp(appName);
    log("进入活动中.......");
    // 睡眠5秒，等待程序加载
    sleep(5000 * speed);
    // 进入京东主界面，检查是否存在“我的”右下角，如果存在，点击进去，接着判断是否存在全民叠蛋糕活动，如果有则点击进入
    if(descContains("我的").exists()){
        descContains("我的").findOne().click();
        sleep(1000 * speed);
        // 判断是否有全民叠蛋糕活动
        if(textContains("全民").exists()){
            log("进入叠蛋糕界面");
            idContains("us").findOne().click();
        }
    }

  sleep(1000 * speed);
  className("android.view.View").text("做任务领金币").waitFor();

  sleep(1000 * speed);
  if (!textContains("任务每日0点刷新").exists()) {
    className("android.view.View").text("做任务领金币").findOne().parent().click()

  }

  textContains("任务每日0点刷新").waitFor()
  sleep(1000 * speed);
}