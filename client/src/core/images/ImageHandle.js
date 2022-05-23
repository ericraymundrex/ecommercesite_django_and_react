import { Fragment } from "react";

const ImageHandle=({product})=>{
    const imageurl=product?product.image:""
    console.log(product.image)
    return(<Fragment>
        <div className="rounded border border-success p-2">
            <img 
            src={imageurl}
            style={{maxHeight:"100%",maxWidth:"100%"}}
            alt={`${product.name}`}/>
        </div>
    </Fragment>)
}

export default ImageHandle;