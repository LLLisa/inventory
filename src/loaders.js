import axios from 'axios';

export async function pageLoader({ params }) {
  const { data } = await axios.get(`/page/${params.pageNum}`);
  console.log(data);
  return data;
}
