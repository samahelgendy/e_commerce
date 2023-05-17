import { useEffect, useState } from "react";
import { addToCart, getAllProducts, getProductsByCatogery } from "../../API/index";
import { List , Card ,Image, Typography, Badge, Rate ,Button, Input, message, Spin } from "antd";
import { useParams } from "react-router-dom";
function Products(){
    const prams = useParams();
    const [items , setItems] = useState([])
    const [loading , setLoadin] = useState(false)
    useEffect( () =>{
        setLoadin(true);
         
          (prams?.cateoryId ?  getProductsByCatogery(prams.cateoryId):getAllProducts())
            .then( (res) =>{
          setItems(res.products);
          setLoadin(false);
       })
    },[prams])
    if(loading){
      return  <Spin className="spin" spinning />
    }
 return <>
 <List
 grid={{xs:1 , sm:1 , md:2 , lg:3 ,xl:4 , xxl:5}}
  renderItem={(product , index) =>{
    return<Badge.Ribbon className="badget" text={`${product.discountPercentage} Off`} color="pink">
    <Card hoverable className="cardProduct" style={{fontFamily:"monospace"}} 
    title={product.title} key={index}
     cover={<Image className="imageProduct"src={product.thumbnail} />}
     actions={[
        <Rate value={product.rating} allowHalf disabled /> ,<AddProductToCart item={product} />
     ]}
     
     >
        <Card.Meta  title={<Typography.Paragraph>${product.price}{" "}
        <Typography.Text delete type="danger">${parseFloat(product.price + product.price * product.discountPercentage).toFixed(2)}</Typography.Text>
        </Typography.Paragraph>}
        description={<Typography.Paragraph ellipsis={{rows:2 , expandable:true , symbol:"more"}}>{product.description}</Typography.Paragraph>}
        >
        
        </Card.Meta>
        
     </Card>
     </Badge.Ribbon>
 }} 
 dataSource={items}>

 </List>
 </>
}
function AddProductToCart({item}){
    const [loading  , setLoading] = useState(false);
    const AddProduct =() =>{
        setLoading(true);
    addToCart(item.id).then(res =>{
       
        message.success(`${item.title} Has Been Added To Cart`);
        setLoading(false);
      })
    }
    return  <Button onClick={()=>{
        AddProduct()
    }} type="link" loading={loading}>Add To Cart</Button> 
}


export default Products;