import { useState } from "react";

export const ProductList = () => {
  const [name, setName] = useState('');
  const [price, setPrice] = useState(0);
  const [quantity, setQuantity] = useState(0);
  const [edit, setEdit] = useState(false);
  const [active, setActive] = useState(null);

  const [products, setProducts] = useState([
    { id: 1, name: 'Naval Oranges', price: 1.99, quantity: '1 lb' },
    { id: 2, name: 'Gala Apples', price: 0.99, quantity: '1 lb' },
    { id: 3, name: 'Roma Tomatoes', price: 2.29, quantity: '1 lb' },
  ])

  const addProducts = (e) => {
    e.preventDefault();
    const newProduct = {
      id: Date.now(),
      name,
      price,
      quantity
    }
    if (edit) {
      // update product
      let copy = products;
      Object.assign(copy[active], newProduct);
      setProducts([...copy]);
      setEdit(true);
      setActive(null);
    } else {
      // add product
      setProducts([...products, newProduct]);
    }
    setName('');
    setPrice(0);
    setQuantity(0);
  }

  const editProduct = (index) => {
    const newProduct = products[index];    
    setName(newProduct.name);
    setPrice(newProduct.price);
    setQuantity(newProduct.quantity);
    setEdit(true);
    setActive(index);
  }

  const deleteProduct = (product) => {
    let copy = products.filter((item) => item !== product);
    setProducts([...copy]);
  }
  
  return (
    <div>
      <h1 className="text-center my-5">Product List on Sales promotion</h1>
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-md-8">
            <form onSubmit={addProducts}>              
              <div className="form-group">
                <label htmlFor="name">product name</label>
                <input type="text" className="form-control" id="name" value={name} placeholder="Enter product name" onChange={(e)=>setName(e.target.value)} />
              </div>
              <div className="form-group">
                <label htmlFor="price">product price</label>
                <input type="number" className="form-control" id="price" value={price} placeholder="Enter product price" onChange={(e)=>setPrice(e.target.value)} />
              </div>
              <div className="form-group">
                <label htmlFor="quantity">product quantity</label>
                <input type="text" className="form-control" id="quantity" value={quantity} placeholder="Enter product quantity" onChange={(e)=>setQuantity(e.target.value)} />                
              </div>   
              <button type="submit" className="btn btn-info form-control text-light mt-4">{edit ? "Update":"Add"}</button>
            </form>
          </div>
        </div>
      </div>
      <table className="table table-bordered table-striped table-secondary mt-4">
        <thead>
          <tr>
            <th>Product Name</th>
            <th>Product Price</th>
            <th>Product Quantity</th>
            <th>Edit</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product,index) => (
            <tr key={product.id}>
              <td>{product.name}</td>
              <td>${product.price}</td>
              <td>{product.quantity}</td>
              <td><button className="btn btn-warning" onClick={()=>editProduct(index)}>Edit</button></td>
              <td><button className="btn btn-danger" onClick={()=>deleteProduct(product)}>Delete</button></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
};