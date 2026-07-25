import axios from 'axios'

const API_URL = 'http://localhost:3001/products'

// TODO-02: GET danh sách sản phẩm
export const getProducts = async () => {
  const response = await axios.get(API_URL)
  return response.data
}

// TODO-06: POST thêm sản phẩm mới
export const addProduct = async (product) => {
  const response = await axios.post(API_URL, product)
  return response.data
}

// TODO-07: DELETE xóa sản phẩm theo id
export const deleteProduct = async (id) => {
  const response = await axios.delete(`${API_URL}/${id}`)
  return response.data
}
