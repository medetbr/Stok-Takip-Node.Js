import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import {
  fetchUpdateProduct,
  fetchCreateProduct,
  fetchGetProductList,
  fetchDeleteProduct,
} from "../../Api/product";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { supplierGetListAction } from "../../redux/actions/supplier";

function Product() {
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [limit, setLimit] = useState(5);
  const [search, setSearch] = useState(null);
  const [changeProductInfo, setChangeProductInfo] = useState("");
  const [supplier_id, set_supplier_id] = useState("");
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch()
  const { suppliers } = useSelector((state) => state.suppliers);
  useEffect(() => {
    (async () => {
      dispatch(supplierGetListAction(null,"all",""))
      const products = await fetchGetProductList(
        currentPage,
        limit,
        search?.length > 0 ? search : ""
      );
       setProducts(products);   
    })();
  }, [limit, search, currentPage, setCurrentPage, loading]);
  
  const formik = useFormik({
    initialValues: {
      name: "",
      buy: "",
      sell: "",
      description: "",
      stock: "",
    },
    onSubmit: async (values, bag) => {
      // let element = document.getElementById("addSupplierBtn")
      // element.setAttribute("data-bs-dismiss","modal")
      setLoading(true);
      try {
        await fetchCreateProduct({...values,supplier_id});
        setCurrentPage(1)
        set_supplier_id(null)
        formik.resetForm({});
      } catch (error) {
        bag.setErrors({ general: "Hata" });
      }
      setLoading(false);
    },
  });
  const deleteProductHandler = async (id) => {
    if (window.confirm("Silme işlemini onaylıyor musunuz.")) {
      setLoading(true);
      await fetchDeleteProduct(id);
      setLoading(false);
    }
  };
  const productChangeHandle = async (id) => {
    const res = await fetchUpdateProduct(id, changeProductInfo);
    setChangeProductInfo(res);
  };
  
  return (
    <>
    
      <div
        className="modal fade"
        id="changeProductModal"
        data-bs-backdrop="static"
        data-bs-keyboard="false"
        tabIndex="-1"
        aria-labelledby="staticBackdropLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="staticBackdropLabel">
                Ürün Güncelle
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <form>
              <div className="modal-body">
                <div className="mb-3">
                  <label
                    htmlFor="exampleFormControlInput1"
                    className="form-label"
                  >
                    Adı
                  </label>
                  <input
                    onChange={(e) =>
                      setChangeProductInfo({
                        ...changeProductInfo,
                        name: e.target.value,
                      })
                    }
                    value={changeProductInfo.name}
                    type="text"
                    className="form-control"
                    id="exampleFormControlInput1"
                  />
                </div>
                <div className="mb-3">
                  <label
                    htmlFor="exampleFormControlInput2"
                    className="form-label"
                  >
                    Satış
                  </label>
                  <input
                    onChange={(e) =>
                      setChangeProductInfo({
                        ...changeProductInfo,
                        sell: e.target.value,
                      })
                    }
                    value={changeProductInfo.sell}
                    type="text"
                    className="form-control"
                    id="exampleFormControlInput2"
                  />
                </div>
                {/* <div className="mb-3">
                  <label
                    htmlFor="exampleFormControlInput3"
                    className="form-label"
                  >
                    Stok
                  </label>
                  <input
                    onChange={(e) =>
                      setChangeProductInfo({
                        ...changeProductInfo,
                        stock: e.target.value,
                      })
                    }   
                    type="text"
                    className="form-control"
                    id="exampleFormControlInput3"
                  />
                </div>                */}
               </div>
              <div className="modal-footer">
                <button
                  type="reset"
                  className="btn btn-secondary"
                  data-bs-dismiss="modal"
                >
                  İptal
                </button>
                <button
                  id="updateSupplierBtn"
                  className="btn btn-primary"
                  onClick={() => productChangeHandle(changeProductInfo._id)}
                  data-bs-dismiss="modal"
                >
                  Güncelle
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
      <div
        className="modal fade"
        id="staticBackdrop"
        data-bs-backdrop="static"
        data-bs-keyboard="false"
        tabIndex="-1"
        aria-labelledby="staticBackdropLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="staticBackdropLabel">
                Ürün Ekle
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <form onSubmit={formik.handleSubmit}>
              <div className="modal-body">
                <div className="mb-3">
                  <label
                    htmlFor="exampleFormControlInput1"
                    className="form-label"
                  >
                    Adı
                  </label>
                  <input
                    name="name"
                    value={formik.values.name}
                    onChange={formik.handleChange}
                    type="text"
                    className="form-control"
                    id="exampleFormControlInput1"
                    placeholder="Ad"
                  />
                </div>

                <div className="mb-3">
                  <label
                    htmlFor="exampleFormControlInput3"
                    className="form-label"
                  >
                    Alış Fiyatı
                  </label>
                  <input
                    name="buy"
                    value={formik.values.buy}
                    onChange={formik.handleChange}
                    type="text"
                    className="form-control"
                    id="exampleFormControlInput3"
                    placeholder="Alış"
                  />
                </div>
                <div className="mb-3">
                  <label
                    htmlFor="exampleFormControlInpu4"
                    className="form-label"
                  >
                    Satış Fiyatı
                  </label>
                  <input
                    name="sell"
                    value={formik.values.sell}
                    onChange={formik.handleChange}
                    type="text"
                    className="form-control"
                    id="exampleFormControlInput4"
                    placeholder="Satış"
                  />
                </div>
                <div className="mb-3">
                  <label
                    htmlFor="exampleFormControlInput2"
                    className="form-label"
                  >
                    Stok Miktarı
                  </label>
                  <input
                    name="stock"
                    value={formik.values.stock}
                    onChange={formik.handleChange}
                    type="text"
                    className="form-control"
                    id="exampleFormControlInput2"
                    placeholder="Stok"
                  />
                </div>
                <div className="mb-3">
                    <label
                      htmlFor="exampleFormControlInput3"
                      className="form-label"
                    >
                      Tedarikçi Seç
                    </label>
                    <select className="form-control"
                    onChange={(e) => set_supplier_id(e.target.value)}                    
                    >
                      <option>Tedarikçi Seç</option>
                      {suppliers?.value.map((supplier) => (
                        <option value={supplier._id}>{supplier.name}</option>
                      ))}
                    </select>                   
                  </div>
                <div className="mb-3">
                  <label
                    htmlFor="exampleFormControlTextarea1"
                    className="form-label"
                  >
                    Açıklama
                  </label>
                  <textarea
                    name="description"
                    value={formik.values.description}
                    onChange={formik.handleChange}
                    className="form-control"
                    id="exampleFormControlTextarea1"
                    rows="3"
                  ></textarea>
                </div>
              </div>
              <div className="modal-footer">
                <button
                  type="reset"
                  className="btn btn-secondary"
                  data-bs-dismiss="modal"
                >
                  İptal
                </button>
                <button
                  id="addProductBtn"
                  type="submit"
                  className="btn btn-primary"
                  aria-label="Close"
                  data-bs-dismiss="modal"
                >
                  Ekle
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col-md-12">
          <div className="strpied-tabled-with-hover card">
            <div className="card-header" style={{ backgroundColor: "#fff" }}>
              <h4 className="card-title">Ürünler Tablosu</h4>
              <div className="form-outline ">
                <input
                  type="search"
                  onChange={(e) => setSearch(e.target.value)}
                  onFocus={(e) => setCurrentPage(1)}
                  placeholder="Aramak istediğinizi bir kaç kelime ile yazınız..."
                  className="form-control"
                />
                <button
                  className="btn-updated "
                  data-bs-toggle="modal"
                  data-bs-target="#staticBackdrop"
                >
                  Ekle
                </button>
              </div>

              <div className="limit-buttons">
                {[...Array(4)].map((x, i) => (
                  <button
                    key={i}
                    className={limit === (i + 1) * 5 ? "current-page" : ""}
                    disabled={limit === (i + 1) * 5}
                    onClick={() => {
                      setLimit((i + 1) * 5);
                      setCurrentPage(1);
                    }}
                    type="button"
                  >
                    {(i + 1) * 5}
                  </button>
                ))}
                <button
                  style={{ width: "50px" }}
                  className={limit === "all" ? "current-page" : ""}
                  disabled={limit === "all"}
                  onClick={() => {
                    setLimit("all");
                    setCurrentPage(1);
                  }}
                  type="button"
                >
                  Tümü
                </button>
              </div>
            </div>
            <div className="table-full-width table-responsive px-0 card-body">
              <table className="table-hover table-striped table">
                <thead>
                  <tr>
                    <th className="border-0">#</th>
                    <th className="border-0">Adı</th>
                    <th className="border-0">Ürün No</th>
                    <th className="border-0">Satış Fiyatı</th>
                    <th className="border-0">Açıklama</th>
                    <th className="border-0">Stok</th>
                    {/* <th className="border-0">Sil</th> */}
                  </tr>
                </thead>
                <tbody>
                  {products?.value?.map((product,id) => (                    
                    <tr key={id+1}>
                      <td>
                        {limit === "all"
                          ? id + 1
                          : id + 1 + (currentPage - 1) * limit}
                      </td>                      
                      <td>{product.name}</td>
                      <td>{product.stock_no}</td>
                      <td>{product.sell}</td>
                      <td>{product.description}</td>
                      <td>{product.stock}</td>
                      <td className="table-icon-td">
                        <div>
                          <Link state={product._id} to={"/products/detail"}>
                          <i className="fa-solid fa-circle-info"                           
                          ></i>
                          </Link>                                            
                         <i
                           onClick={() => setChangeProductInfo(product)}
                          data-bs-toggle="modal"
                          data-bs-target="#changeProductModal"
                          className="fa-solid fa-pen-to-square"
                        ></i>  
                        <i
                          onClick={() => deleteProductHandler(product._id)}
                          className="fa-solid fa-trash-can"
                        ></i>
                        </div>                        
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              {products?.value?.length < 1 && (
                <div
                  style={{
                    textAlign: "center",
                    fontSize: "22px",
                    color: "#767676",
                  }}
                >
                  Ürün Bulunamadı
                </div>
              )} 

              {(limit === "all"||products?.value?.length < 1) ? (
                ""
              ) : (
                
                <div className="page-buttons">
                  <span>
                    {limit === "all"
                      ? ""
                      : `${currentPage * limit + 1 - limit}-${
                          products?.page === currentPage
                            ? products?.total
                            : currentPage * limit
                        } of ${products?.total}`}
                  </span>
                  <button
                    disabled={currentPage === 1}
                    className={currentPage === 1 ? "current-page" : ""}
                    onClick={() => setCurrentPage(1)}
                    type="button"
                  >
                    <i className="fa-solid fa-angles-left"></i>
                  </button>
                  <button
                    disabled={currentPage === 1}
                    className={currentPage === 1 ? "current-page" : ""}
                    onClick={() => setCurrentPage(currentPage - 1)}
                    type="button"
                  >
                    <i className="fa-solid fa-angle-left"></i>
                  </button>

                  <button
                    disabled={currentPage === products?.page}
                    className={
                      currentPage === products?.page ? "current-page" : ""
                    }
                    onClick={() => setCurrentPage(currentPage + 1)}
                    type="button"
                  >
                    <i className="fa-solid fa-angle-right"></i>
                  </button>
                  <button
                    disabled={currentPage === products?.page}
                    className={
                      currentPage === products?.page ? "current-page" : ""
                    }
                    onClick={() => setCurrentPage(products?.page)}
                    type="button"
                  >
                    <i className="fa-solid fa-angles-right"></i>
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Product;
