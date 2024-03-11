import SparkMD5 from 'spark-md5'
import * as Worker  from "./worker.js";
const CHUNK_SIZE = 5 * 1024 * 1025; // 切片大小
const THREAD_COUNT = navigator.hardwareConcurrency || 4;  // 定义一个线程数量
export const createChunk = (file, index, chunkSize) => {
  return new Promise(resolve => {
    const start = index * chunkSize;
    const end = start + chunkSize;
    const spark = new SparkMD5.ArrayBuffer();
    const fileReader = new FileReader();
    fileReader.onload = e => {
      spark.append(e.target.result);
      resolve({
        start,
        end,
        index,
        hash: spark.end()
      });
    };
    fileReader.readAsArrayBuffer(file.slice(start, end));
  });
};

export const cutFile = async file => {
  return new Promise(resolve => {
    const result = [];
    const chunkCount = Math.ceil(file.size / CHUNK_SIZE);
    const workerChunkCount = Math.ceil(chunkCount / THREAD_COUNT);

    let finishCount = 0;
    for (let i = 0; i < THREAD_COUNT; i++) {
      const worker = new Worker();
      let startIndex = i * workerChunkCount;
      let endIndex = startIndex + workerChunkCount;
      if (endIndex > chunkCount) {
        endIndex = chunkCount;
      }
      worker.postMessage({
        file,
        CHUNK_SIZE,
        startIndex,
        endIndex
      });
      worker.onmessage = e => {
        for (let j = startIndex; j < endIndex; j++) {
          result[j] = e.data[j - startIndex];
        }
        worker.terminate();
        finishCount++;
        if (finishCount === THREAD_COUNT) {
          resolve(result);
        }
      };
    }
  });
};

// 合并多个哈希值并计算总体哈希值
export const calculateCombinedHash = hashArray =>{
  const combinedHashString = hashArray.join('-'); // 使用分隔符连接哈希值
  const spark = new SparkMD5();
  spark.append(combinedHashString);
  return spark.end();
}
