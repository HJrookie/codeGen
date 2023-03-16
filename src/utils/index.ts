import moment from "moment";

export function uuid() {
  var temp_url = URL.createObjectURL(new Blob());
  var uuid = temp_url.toString(); // blob:https://xxx.com/b250d159-e1b6-4a87-9002-885d90033be3
  URL.revokeObjectURL(temp_url);
  return uuid.substr(uuid.lastIndexOf("/") + 1);
}

export const getInnerType = (value) => {
  return Object.prototype.toString.call(value).slice(8, -1);
};

export const getRandomDateTime = () => {
  return moment(new Date(new Date().getTime() - 1000 * 60 * 60 * 2 * Math.floor(Math.random() * 10000)).getTime()).format(`YYYY-MM-DD HH:mm`);
};
