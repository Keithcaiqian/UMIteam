import { pathToRegexp } from "path-to-regexp";

// 路径匹配
export default function regProgressPath(reg,path){
    const regexp = pathToRegexp(reg);
    const result = regexp.exec(path);
    return result;
}