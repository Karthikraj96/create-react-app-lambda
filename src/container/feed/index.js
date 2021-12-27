import React, { useState, useEffect } from 'react';
import './index.css';
import { Avatar, Button } from 'antd';
function Feed() {
  return (
    <div className="feed">
      <div className="feed_inputContainer">
        <div className="feed_input">
          <span style={{ marginTop: '4px', fontSize: '20px' }}>
            <i class="fa fa-pencil-square-o"></i>
          </span>
          <form>
            <input
              //   onChange={(e) => setInput(e.target.value)}
              //   value={input}
              type="text"
              placeholder="Type here and press enter to submit"
            />
            <button
              //  onClick={sendPost}
              type="submit"
            >
              Send
            </button>
          </form>
        </div>
        <div className="feed_inputOption">
          <div className="inputOption">
            <span style={{ fontSize: '25px', color: '#70B5F9' }}>
              <i class="fa fa-picture-o"></i>
            </span>
            <h4 style={{ marginTop: '6px' }}>Photo</h4>
          </div>
          <div className="inputOption">
            <span style={{ fontSize: '25px', color: '#E7A33E' }}>
              <i class="fa fa-video-camera"></i>
            </span>

            <h4 style={{ marginTop: '6px' }}>Video</h4>
          </div>
          <div className="inputOption">
            <span style={{ fontSize: '25px', color: '#C0CBCD' }}>
              <i class="fa fa-bar-chart"></i>
            </span>

            <h4 style={{ marginTop: '6px' }}>Poll</h4>
          </div>
        </div>
      </div>

      <div style={{ maxHeight: '80vh', overflow: 'auto' }}>
        <div className="post">
          <div style={{marginBottom:'0px'}} className="post_header">
            <Avatar src={'https://source.unsplash.com/random'}>U</Avatar>
            <div className="post_info">
              <span style={{fontWeight:'bold'}}>Opinion on this</span>
              <p>Admin - Everwin Group of schools (Perambur)</p>
            </div>
            <div className="editOptions"><i class="fa fa-ellipsis-v"></i></div>
          </div>
          <div className="post_body">
            <p>Conducting blood donation camp</p>
            <img style={{ marginTop:"0px"}} className="post_bodyImg" src={'https://source.unsplash.com/random'} alt="No Preview" />
            {/* <p>{message}</p> */}
          </div>
          <div></div>
         
        </div>
        <div className="post">
          <div style={{marginBottom:'0px'}} className="post_header">
            <Avatar src={'https://source.unsplash.com/random'}>U</Avatar>
            <div className="post_info">
              <span style={{fontWeight:'bold'}}>Opinion on this</span>
              <p>Admin - Everwin Group of schools (Perambur)</p>
            </div>
            <div className="editOptions"><i class="fa fa-ellipsis-v"></i></div>
          </div>
          <div className="post_body">
            <p>Conducting blood donation camp</p>
            <img style={{ marginTop:"0px"}} className="post_bodyImg" src={'https://source.unsplash.com/random'} alt="No Preview" />
            {/* <p>{message}</p> */}
          </div>
          <div></div>
         
        </div>
      </div>
    </div>
  );
}
export default Feed;
