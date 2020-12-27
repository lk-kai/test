import axios from 'axios'
export function getList1() {
  return axios.get('/api/list', {}).then((res) => {
    const { code, data } = res.data
    // console.log(res)
    if (code === 0) {
      return data
    }
  }).catch((err) => {
    console.log(err);
  });
}
export function getList2() {
  return axios.get('/api/list2', {}).then((res) => {
    const { code, data } = res.data
    // console.log(res)
    if (code === 0) {
      return data
    }
  }).catch((err) => {
    console.log(err);
  });
}