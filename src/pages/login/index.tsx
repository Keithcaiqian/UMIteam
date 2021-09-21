import React,{ useState,useEffect} from 'react'
import { connect } from 'umi'
import './index.less'

const mapDispatchToProps = dispatch => ({
    login(account,password){
        dispatch({
            type:'user/loginUser',
            payload:{
                account,
                password
            }
        })
    }
})

function Index(props) {
    const [account,setAccount] = useState('');
    const [password,setPassword] = useState('');

    useEffect(() => {
        function loginBtn(e){
            if(e.key === 'Enter' && account && password){
                props.login(account,password);
            }
        }
        window.addEventListener('keydown',loginBtn);
        return () => {
            window.removeEventListener('keydown',loginBtn);
        }
    },[account,password]);

    let loginBtn;

    if(account && password){
        loginBtn = <button className='loginBtn active' 
        onClick={()=>{
            props.login(account,password)
        }}>登录</button>;
    }else{
        loginBtn = <button className='loginBtn'>登录</button>;
    }

    return (
        <div id='login_page'>
            <input type="text" placeholder='账号' value={account}
                onChange={e=>{
                    setAccount(e.target.value.trim())
                }}
            />
            <input type="text" placeholder='密码' value={password}
                onChange={e=>{
                    setPassword(e.target.value.trim())
                }}
            />
            {loginBtn}
        </div>
    )
}

export default connect(null,mapDispatchToProps)(Index);
