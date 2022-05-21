import axios from "axios";
import { downloadType } from "./types";
import { ElNotification, ElMessage } from "element-plus";
import { isUrl } from "/@/utils/is";
import qs from "qs";

// 通过iframe下载文件
function downloadByIFrame(linkUrl: string) {
  const iframe = document.createElement("iframe");
  iframe.id = String(Date.now());
  iframe.src = linkUrl;
  iframe.style.display = "none";
  document.body.appendChild(iframe);
  iframe.onload = function () {
    setTimeout(() => document.body.removeChild(iframe), 2000);
  };
}
// 通过a链接方式进行下载
function downloadByaLink(linkUrl: string, fileName = "下载文件") {
  const link = document.createElement("a");
  link.style.display = "none";
  link.href = linkUrl;
  link.download = fileName;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}
// 获取下载文件的url
function getDownloadUrl(params: downloadType) {
  const { url, query = {} } = params;
  let targetUrl = "";
  if (isUrl(url)) {
    targetUrl =
      url.indexOf("?") > -1
        ? url + "&" + qs.stringify(query)
        : url + "?" + qs.stringify(query);
  } else {
    const origin = window.location.origin;
    targetUrl = `${origin}${url}${
      url.indexOf("?") > -1
        ? `&${qs.stringify(query)}`
        : `?${qs.stringify(query)}`
    }`;
  }
  return targetUrl + "_t=" + Date.now();
}
// 利用浏览器打开下载地址
function downloadByTab(downloadUrl: string) {
  window.open(downloadUrl, "_blank");
}
// 使用ajax进行文件下载，并通过构建blob的URL进行文件下载
function downloadByAxios(downloadUrl: string) {
  const msg = ElMessage({ message: "资源正在下载中....", duration: 0 });
  axios
    .request({
      url: downloadUrl,
      responseType: "blob"
    })
    .then(res => {
      const { data } = res;
      if (data.type === "application/json") {
        const reader = new FileReader();
        reader.readAsText(data, "utf-8");
        reader.onload = function () {
          const result = JSON.parse(String(reader.result)) as Response;
          if (result.success) {
            ElNotification({
              title: "下载出错",
              message: result.message || "下载文件异常",
              type: "warning"
            });
          } else {
            ElMessage({ message: result.message || "下载文件异常" });
          }
          setTimeout(() => msg.close(), 50);
        };
      } else {
        // 获取文件名称
        const contentDisposition = res.headers["content-disposition"];
        const matchName = contentDisposition.match(
          /(?<=filename=|filename\*=utf-8'')(\S*)(?=\.)(\S\w*)/gi
        );
        const fileName: string = matchName
          ? decodeURIComponent(matchName[0])
          : "下载文件";

        // 获取文件的url
        const blob = new Blob([data], { type: "application/vnd.ms-excel" });
        const blobUrl = URL.createObjectURL(blob);
        downloadByaLink(blobUrl, fileName);
        setTimeout(() => msg.close(), 1000);
      }
    })
    .catch(() => {
      downloadByIFrame(downloadUrl);
    });
}

export default {
  downloadFile(params: downloadType) {
    const downloadUrl = getDownloadUrl(params);
    if (params.byTab) {
      downloadByTab(downloadUrl);
      return;
    }
    downloadByAxios(downloadUrl);
  }
};
