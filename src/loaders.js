import axios from 'axios';

export async function pageLoader({ params }) {
  try {
    const { data } = await axios.get(`/page/${params.pageNum}`);
    return data;
  } catch (error) {
    throw error;
  }
}
