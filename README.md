# parse-wechat-xml

> Parsing wechat XML without using xml2js.  
> 微信 XML 解析，非 xml2js

源码非常简单，针对微信 xml 数据做最简化数据解析，核心部分20行，合适自行魔改。

## 安装

```sh
$ yarn add parse-wechat-xml
```

## 使用

```js
// import parseWechatXML from 'parse-wechat-xml';
const { parseWechatXML } = require('parse-wechat-xml');

const xml = `
<xml>
  <ToUserName><![CDATA[toUser]]></ToUserName>
  <FromUserName><![CDATA[fromUser]]></FromUserName>
  <CreateTime>1348831860</CreateTime>
  <MsgType><![CDATA[text]]></MsgType>
  <Content><![CDATA[this is a test]]></Content>
  <MsgId>1234567890123456</MsgId>
</xml>
`;

const msg = parseWechatXML(xml);

msg.ToUserName; // 开发者微信号
msg.FromUserName; // 发送方帐号
msg.CreateTime; // 消息创建时间
msg.Content; // 文本消息内容
```
