import api from "@/api";

export async function getBlogs(page) {
  try {
    const response = await api.get(`blog_list?page=${page}`);
    return response.data;
  } catch (err) {`    `
    throw new Error(err.response?.data?.message || err.message);
  }
}

export async function getBlog(slug){
  try {
    const response = await api.get(`blog_detail/${slug}`);
    return response.data;

  } catch (err) {
    throw new Error(err.response?.data?.message || err.message);
  }
  
}

export async function registerUser(data){
  try{
    const response = await api.post("register_user/", data)
    return response.data
  }

  catch(err){
    console.log(err)
    if(err.status == 400){
      throw new Error("Username already exists")
    }
    throw new Error(err)
  }
}

export async function signin(data) {
  try{
    const response =await api.post("token/", data)
    return response.data
  }

  catch(err){
    console.log(err)
    if(err.status == 401){
      throw new Error("Invalid Credentials")
    }

    throw new Error(err)
  }
  
}

export async function getUsername(data) {
  try{
    const response = await api.get("get_username/", data)
    return response.data
  }
  catch(err){
    throw new Error(err.message)
  }
}

export async function createBlog(data) {
  try {
    const response = await api.post("create_blog/", data, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return response.data;
        
  } catch (err) {
    throw new Error(err.message);
  }
}

export async function updateBlog(data, id){
  try{
    const response = await api.put(`update_blog/${id}/`, data)
    return response.data
  }

  catch(err){
    if(err.response){
      throw new Error(err.response?.message || "failed to update blog")
    }
    throw new Error(err.message)
  }

}

export async function deleteBlog(id){
  try{
    const response = await api.post(`delete_blog/${id}/`)
    return response.data
  }

  catch(err){
    if(err.response){
      throw new Error(err.response?.message || "failed to delete blog")
    }
    throw new Error(err.message)
  }

}

export async function getUserInfo(username){
  try{
    const response = await api.get(`get_userinfo/${username}`)
    return response.data
  }
  catch(err){
    throw new Error(err.message)
  }
}

export async function updateProfile(data) {
  try{
    const response = await api.put("update_user/", data)
    return response.data
  }
  catch(err){
    if(err.response){
      throw new Error(err?.response?.data.username[0] || "Failed to update profile")
    }
    throw new Error(err.message)
  }

}