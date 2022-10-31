import React, { useEffect, useMemo, useRef, useState } from "react";
import '../styles/App.css'
import PostList from "../components/PostList";
import MyButton from "../components/UI/button/MyButton";
import PostForm from "../components/PostForm";
import PostFilter from "../components/PostFilter";
import MyModal from "../components/UI/MyModal/MyModal";
import { usePosts, useSortedPosts } from "../hooks/usePosts";
import axios from "axios";
import PostService from "../API/PostServise";
import Loader from "../components/UI/Loader/Loader";
import { useFetching } from "../hooks/useFetching";
import { getPageCount } from "../utils/pages.js"
import Pagination from "../components/UI/pagination/Pagination";
import { useObserver } from "../hooks/useObserver";
import MySelect from "../components/UI/select/MySelect";

function Posts() {
  const [posts, setPosts] = useState([])
  const [filter, setFilter] = useState({sort: '', query: ''})
  const [modal, setModal] = useState(false);
  const sortedAndSearchedPosts = usePosts(posts, filter.sort, filter.query);
  const [totalPages, setTotalPages] = useState(0);
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(1);
  const lastElement = useRef();
  const [fetchPosts, isPostsLoading, postError] = useFetching( async(limit, page) => {
    const response = await PostService.getAll(limit, page);
    setPosts([...posts, ...response.data]);
    const totalCount = response.headers['x-total-count'];
    setTotalPages(getPageCount(totalCount, limit));
  })

  useObserver(lastElement, page < totalPages, isPostsLoading, () => setPage(page + 1))

  useEffect(() => {
    fetchPosts(limit, page)
  }, [page, limit])

  const createPost = (newPost) => {
    setPosts([...posts, newPost])
    setModal(false)
  }


  const removePost = (post) =>{
    setPosts(posts.filter(p => p.id !== post.id))
  }

  const changePage = (page) => {
    setPage(page);
  }
  return (
    <div className="App">
      <MyButton style={{marginTop: '20px'}} onClick={() => setModal(true)}>
        Create post
      </MyButton>
      <MyModal visible={modal} setVisible={setModal}>
        <PostForm create={createPost}/>
      </MyModal>
      <PostFilter
        filter={filter}
        setFilter={setFilter}
      />
      <MySelect
      value={limit}
      onChange={value => setLimit(value)}
      defaultValue="elements on this page"
      options={[
        {value: 5, name: '5'},
        {value: 10, name: '10'},
        {value: -1, name: 'Show all'},
      ]}
      />
      {postError &&
      <h1 style={{textAlign:'center'}}>ERROR!!!  ${postError}</h1>
      }       
      <PostList remove={removePost} posts={sortedAndSearchedPosts} title={'List'}/>
      <div ref={lastElement} style={{height: '20px', background:'black', opacity:'5%'}}/>
      {isPostsLoading &&
        <div style={{display: 'flex', justifyContent:'center', marginTop:'50px'}}><Loader/></div>
       } 
      
      <Pagination
        page={page}
        changePage={changePage}
        totalPages={totalPages}
      />
    </div>
  );
}

export default Posts;
