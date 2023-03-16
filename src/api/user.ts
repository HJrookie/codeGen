import request from "@/utils/request";
import { AxiosPromise, AxiosResponse } from "axios";
import Mock from "mockjs";
import moment from "moment";
import { getRandomDateTime } from "@/utils";
export interface Result<T = any> {
  code: number;
  message: string;
  data: T;
}

export async function getExamList(data: Record<string, any>): Promise<Result<{ [index: string]: any }[]>> {
  return request.request({
    url: "/lls/newexam/exam/studentPage",
    method: "post",
    data,
  });
}

export async function getMockDataList(data: Record<string, any>): Promise<Result<{ [index: string]: any }[]>> {
  let _data = Mock.mock({
    // 属性 list 的值是一个数组，其中含有 1 到 10 个元素
    "data|10": [
      {
        "id|+1": 1,
        "sex|+1": 1,
        "name|1-5": "1",
        "des|1-3": "1",
      },
    ],
    recordsTotal: 280,
  });

  return Promise.resolve({
    ..._data,
    data: _data.data.map((v) => ({ ...v, beginTime: getRandomDateTime() })),
  });
}

export function deleteExam(data: Record<string, any>) {
  return request({
    url: "/getInfo",
    method: "post",
    data,
  });
}

export function deleteSchool() {
  return request({
    url: "/getInfo",
    method: "get",
  });
}
