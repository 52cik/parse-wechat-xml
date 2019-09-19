type XMLTree = { [field: string]: string | XMLTree | XMLTree[] };

interface XMLItmeData {
  field: string;
  value: string | XMLTree;
}

/**
 * 匹配 xml 标签对
 * 微信的数据目前仅简单标签对形式
 */
const RE_FIELD = /<(\w+)>([\s\S]*?)<\/\1>/g;

/**
 * 解析 xml 数据
 * @param xml 数据
 */
export function parseXML(xml: string) {
  const items: XMLItmeData[] = []; // 存储字段匹配结果

  if (!RE_FIELD.test(xml)) {
    return xml.replace(/<!\[CDATA\[(.*)\]\]>/, '$1');
  }

  xml.replace(RE_FIELD, (m, field, value) => {
    items.push({ field, value: parseXML(value) });
    return m;
  });

  const keys = items.map(({ field }) => field);
  const isArray = keys.length > 1 && [...new Set(keys)].length === 1;
  const target: XMLTree = {};

  if (isArray) {
    const arr: XMLTree[] = [];
    target[items[0].field] = arr;
    items.forEach((it) => arr.push(it.value as XMLTree));
  } else {
    items.forEach((it) => (target[it.field] = it.value));
  }

  return target;
}

/**
 * 解析 xml 数据后返回 xml 字段数据
 * @param xml 微信 XML 数据
 */
export function parseWechatXML<T = XMLTree>(xml: string): T {
  const res = parseXML(xml) as any;
  return res.xml || res;
}

export default parseWechatXML;
