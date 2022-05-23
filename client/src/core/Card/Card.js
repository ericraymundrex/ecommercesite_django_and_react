import Styles from './Card.module.css'
import { cart,removeItemFromCart } from '../Cart/Cart';

const Card = ({product,addtoCart = true,removeFromCart = false,reload=undefined,setReload=f=>f,img=false}) => {

  const addToCart=()=>{
        cart(product,()=>{})
    }

    
    return (
      <div className="card border border-info mb-5">
        <div className="card-header lead">{product.name}</div>
        <div className="card-body ">
          {img?<div className="rounded border  p-2">
            <img
              src={product.image?product.image:"https://media.istockphoto.com/vectors/error-404-vector-id538038858?s=612x612"}
              alt=""
              style={{ maxHeight: "100%", maxWidth: "100%" }}
              className="mb-3 rounded"
            />
          </div>:""}
          <p className="lead text-wrap">
            {img?product.description.substring(0,60):""}
          </p>
          <p className={`${Styles.base} btn rounded  btn-sm px-4`}>Rs {product.price}</p>
          <div className="row">
          {addtoCart?<div className="col-12">
              <button
                onClick={addToCart}
                className="btn btn-block btn-outline-success mt-2 mb-2"
              >
                Add to Cart
              </button>
            </div>:""}
            {removeFromCart?<div className="col-12">
              <button
                onClick={() => {removeItemFromCart(product.id)
                setReload(!reload)}}
                className="btn btn-block btn-outline-danger mt-2 mb-2"
              >
                Remove from cart
              </button>
            </div>:""}
          </div>
        </div>
      </div>
    );
  };
export default Card