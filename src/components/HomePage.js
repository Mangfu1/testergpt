import React from 'react';
import Header from './Header'; // 导入头部导航栏组件
import Sidebar from './Sidebar'; // 导入侧边导航栏组件

const HomePage = () => {
  return (
    <div>
      <Header /> {/* 头部导航栏 */}
      <div className="container">
        <Sidebar /> {/* 侧边导航栏 */}
        {/* 主要内容 */}
      </div>
    </div>
  );
}

export default HomePage;
