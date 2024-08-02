import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react';
import { gettingNotice } from '../../Redux/userRelated/userHandle';

const ShowNotices = () => {
  const {currentUser,noticeList,loading} = useSelector((state) => state.user);
  console.log(noticeList);
  const dispatch = useDispatch();
  let role = currentUser?.role;
  let collegeid;
  if (role === "Admin") {
    collegeid = currentUser?.id;
  } else if (role === "Teacher") {
    collegeid = currentUser?.collegeid;
  }else{
      collegeid = currentUser?.collegeid;
  }

  useEffect(() => {
      dispatch(gettingNotice(collegeid,currentUser));
  },[])
  return (
    <div>
       <h1>Notice</h1>
      {!loading? (noticeList?.length > 0 ? (noticeList?.map((notice,index) => {
                return(
                <div key={index} >
                    <div style={{ whiteSpace: 'pre-wrap' }}>Content: {notice?.notice}</div>
                    <h5 style={{marginTop:"10px"}} > By {notice?.role}</h5>
                    <h4 style={{marginTop:"10px"}} >Date: {notice?.date?.split("T")[0]}</h4>
                    <hr />
                </div>
                )
              })):<h3>No notice.</h3>):<div className='courseDetail'><h3>Loading...</h3></div>}
    </div>
  )
}

export default ShowNotices