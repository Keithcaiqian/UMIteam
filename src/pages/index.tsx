import React,{ useState , useEffect } from 'react';
import styles from './index.less';
import { getProjectList } from '@/service/project';

export default function IndexPage() {
  const [proList,setProList] = useState([]);
  useEffect(() => {
    (async() => {
      const res = await getProjectList();
      setProList(res);
    })();
  },[]);
  let pro = proList.map(item => <li key={item._id}>{item.name}</li> )
  return (
    <div>
      <h1 className={styles.title}>这是首页</h1>
      <ul>
        { pro }
      </ul>
    </div>
  );
}
