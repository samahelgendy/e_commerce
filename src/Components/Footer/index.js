import {Badge  , Space , Typography}from "antd";
import { MailOutlined , FacebookFilled ,  WhatsAppOutlined , LinkedinFilled , GithubFilled} from '@ant-design/icons' ;
import './style.css'

function AppFooter () {
    return(
       <div className ="AppFooter">
           <div className="container">
        <div className="row">
            <div className="pay col-lg-2 col-md-6 col-sm-12">
                <a href="https://www.facebook.com/profile.php?id=100088947797641" target="_blank"><FacebookFilled /></a>
                <a href="https://www.linkedin.com/in/samah-elgendy-5a0b73232/" target="_blank"><LinkedinFilled /></a>
                <a href="https://github.com/samahelgendy" target="_blank"><GithubFilled /></a>
                <a target="_blank" href="tel:+01097226321"><WhatsAppOutlined /></a>
             </div>
            <div className="phone col-lg-2 col-md-6 col-sm-12 ">
             <Typography.Link href="tel:+01097226321" className="block mb-2">+021097226321</Typography.Link>
             <Typography.Link href="tel:+01121134566" className="block">+021121134566</Typography.Link>
            </div>
            <div className="email col-lg-2 col-md-6 col-sm-12">
              <div className="email_1 mb-2">
              <Space>
               <Badge >
                    <MailOutlined style={ {fontSize:20}} />
             </Badge>
            </Space>
                <a className="ms-2" href="/https://mail.google.com/mail/u/0/?tab=rm&ogbl#inbox" target="_blank">samah@gmail.com</a>
              </div>

              <div className="email_2">
              <Space>
               <Badge >
                    <MailOutlined style={ {fontSize:20}} />
             </Badge>
            </Space>
                <a className="ms-2" href="/https://mail.google.com/mail/u/0/?tab=rm&ogbl#inbox" target="_blank">samah@gmail.com</a>
                
              </div>
            </div>
        </div>
    </div>
       </div>
    )
}

export default AppFooter;