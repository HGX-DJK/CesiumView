
import request from "@/api/request";

export const getGeojson = (url) => {
    return request(url, "get");
};

export const getTest = url => {
   return request(url, "get")
}
