import {Badge, Menu, Typography ,Drawer, Table ,InputNumber ,Button , Form , Input, Checkbox, message} from 'antd'
import {HomeFilled , ShoppingCartOutlined} from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import{getCarts} from '../../API/index';
function AppHeader (){
    const navigate = useNavigate();
    const MenuClick =(item) =>{
       navigate(`/${item.key}`)
    }
    return(
        <div className ="appHeader" >
             
            <Menu style={{border:0}}
            onClick={MenuClick}
            mode='horizontal'
            items={[
                {
                    label:<HomeFilled style={{fontSize:20}} />,
                    key:""
                },
                {
                    label:"Men",
                    key:"men",
                    children:[
                        {
                            label:"Men's Shirts" ,
                            key:"mens-shirts"
                        },
                        {
                            label:"Men's Shoes" ,
                            key:"mens-shoes"
                        },
                        {
                            label:"Men's watches",
                            key:"mens-watches"
                        }
                    ]
                },
                {
                    label:"Women",
                    key:"women",
                    children:[
                        {
                            label:"Women's Dresses" ,
                            key:"womens-dresses"
                        },
                        {
                            label:"Women's Shoes" ,
                            key:"womens-shoes"
                        },
                        {
                            label:"Women's watches",
                            key:"womens-watches"
                        },
                        {
                            label:"Women's Bags",
                            key:"womens-bags"
                        },
                        {
                            label:"Women's Jewellery",
                            key:"womens-jewellery"
                        },
                    ]
                },
                {
                    label:"Fragrances",
                    key:"fragrances"
                },
            ]}
            
            />
     
            <AppCart />
        </div>
    )
}
function AppCart (){
    const[drawerCart , setDrawerCart] = useState(false);
    const [cartItem , setCartItem]= useState([]);
    const [checkOutOpen , setCheckOutOpen]= useState(false);
    useEffect( () =>{
        getCarts().then(res =>{
            setCartItem(res.products)
        })
    },[])
    const confirmOrder =()=>{
        setDrawerCart(false);
        setCheckOutOpen(false);
        message.success("Your Order Has Been Placed Successfully..");
    }
    return<>
    <Badge count={cartItem.length}
    onClick={() =>{
        setDrawerCart(true);
    }} className="addCart" >
    <ShoppingCartOutlined />
    </Badge>
    <Drawer open={drawerCart} title="Your Cart" contentWrapperStyle={{width:450}} onClose={()=>{
        setDrawerCart(false);
    }}>
    <Table
    pagination={false}
    columns={[
        {
           title:"Title",
           dataIndex:"title"
        },
        {
            title:"Price",
            dataIndex:"price",
            render:(value) =>{
                return<span>${value}</span>
            }
        },
        {
            title:"Quantity",
            dataIndex:"quantity",
            render:(value , record) =>{
                return<InputNumber min={0} defaultValue={value}
                onChange={(value)=>{
                  setCartItem( rre=>rre.map((cart)=>{
                    if(record.id === cart.id){
                        cart.total = cart.price * value;
                    }
                    return cart;

                   }))
                } }
                ></InputNumber>
            }
        },
        {
            title:"Total",
            dataIndex:"total",
            render:(value) =>{
                return<span>${value}</span>
            }
        }
    ]}
    dataSource={cartItem} 
    summary ={ (data) =>{
        const total= data.reduce((prev, current) =>{
            return prev + current.total;
        } ,0);
        return <span>Total:{total}</span>
     }}
    />

    <Button onClick={()=>{
        setCheckOutOpen(true)
    }} type='primary' style={{margin:"20px 0"}}>CkechOut Your Cart</Button>
    </Drawer>
    <Drawer
    title="Confirm Order"
    open={checkOutOpen}
    onClose={()=>{
        setCheckOutOpen(false)
    }}
    >
    <Form onFinish={confirmOrder}>
        <Form.Item rules={[{
            required:true,
            message:"please enter your full name"

        }]} label="Full Name" name="full_name">
            <Input placeholder='Enter Your Full Name' />
        </Form.Item >
        <Form.Item label="Email" name="email" rules={[{
            required:true,
            message:"please enter a valid email",
            type:"email"
        }]}>
            <Input placeholder='Enter Your Email' />
        </Form.Item>
        <Form.Item  rules={[{
            required:true,
            message:"please enter your full name"

        }]} label="Address" name="address">
            <Input placeholder='Enter Your Address' />
        </Form.Item>
        <Form.Item>
            <Checkbox defaultChecked disabled>Cash On Delivery</Checkbox>
        </Form.Item>

        <Button type='primary' htmlType='submit'>Confirm Order</Button>
    </Form>
    </Drawer>
    </>
    
}
export default AppHeader;