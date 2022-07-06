import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom/client";
import { useDispatch, useSelector } from "react-redux";
import { useFormik } from "formik";
import { supplierGetListAction } from "../../redux/actions/supplier";
import { fetchCreateSupplier, fetchDeleteSupplier, fetchSupplierUpdate } from "../../Api/supplier";

function Supplier() {
  const [currentPage, setCurrentPage] = useState(1);
  const [limit, setLimit] = useState(5);
  const [search, setSearch] = useState(null);
  const [changeSupplierInfo, setChangeSupplierInfo] = useState("");
  const [loading, setLoading] = useState(true);
  // const [minPage, setMinPage] = useState(1);
  // const [maxPage, setMaxPage] = useState(0);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(supplierGetListAction(currentPage, limit, search));
  }, [
    limit, search, currentPage, setCurrentPage, loading
  ]);
  const { suppliers } = useSelector((state) => state.suppliers);
  const formik = useFormik({
    initialValues: {
      name: "",
      surname: "",
      email: "",
      address: "",
      phoneNumber: "",
    },
    onSubmit: async (values, bag) => {
      // let element = document.getElementById("addSupplierBtn")
      // element.setAttribute("data-bs-dismiss","modal")
      setLoading(true);
      try {
        await fetchCreateSupplier(values);
        // setCurrentPage(
        //   suppliers?.total % 5 === 0 ? suppliers?.page + 1 : suppliers?.page
        // );
        setCurrentPage(1)
        formik.resetForm({});
      } catch (error) {
        bag.setErrors({ general: "Hata" });
      }
      setLoading(false);
    },
  });
  const deleteSupplierHandler = async (id) => {
    if(window.confirm("Silme işlemini onaylıyor musunuz.")){
      setLoading(true);
      await fetchDeleteSupplier(id);
      setLoading(false);
    }
    
  };
  const supplierChangeHandle = async(id) =>{
    const res = await fetchSupplierUpdate(id,changeSupplierInfo);
    setChangeSupplierInfo(res)    
  }
  return (
    <>
      <div
        className="modal fade"
        id="changeSupplierModal"
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
                Tedarikçi Güncelle
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
                    Ad
                  </label>
                  <input
                    onChange={e=>setChangeSupplierInfo({...changeSupplierInfo, name:e.target.value})}
                    value={changeSupplierInfo.name}                    
                    type="text"
                    className="form-control"
                    id="exampleFormControlInput1"
                    placeholder="Ad"
                  />
                </div>
                <div className="mb-3">
                  <label
                    htmlFor="exampleFormControlInput2"
                    className="form-label"
                  >
                    Soyad
                  </label>
                  <input
                  onChange={e=>setChangeSupplierInfo({...changeSupplierInfo, surname:e.target.value})}
                    value={changeSupplierInfo.surname} 
                    type="text"
                    className="form-control"
                    id="exampleFormControlInput2"
                    placeholder="Soyad"
                  />
                </div>
                <div className="mb-3">
                  <label
                    htmlFor="exampleFormControlInput3"
                    className="form-label"
                  >
                    Email
                  </label>
                  <input
                    onChange={e=>setChangeSupplierInfo({...changeSupplierInfo, email:e.target.value})}
                    value={changeSupplierInfo.email} 
                    type="email"
                    className="form-control"
                    id="exampleFormControlInput3"
                    placeholder="Email"
                  />
                </div>
                <div className="mb-3">
                  <label
                    htmlFor="exampleFormControlInpu4"
                    className="form-label"
                  >
                    Telefon
                  </label>
                  <input
                    onChange={e=>setChangeSupplierInfo({...changeSupplierInfo, phoneNumber:e.target.value})}
                    value={changeSupplierInfo.phoneNumber} 
                    type="text"
                    className="form-control"
                    id="exampleFormControlInput4"
                    placeholder="0555 555 55 55"
                  />
                </div>
                <div className="mb-3">
                  <label
                    htmlFor="exampleFormControlTextarea1"
                    className="form-label"
                  >
                    Adres
                  </label>
                  <textarea
                    onChange={e=>setChangeSupplierInfo({...changeSupplierInfo, address:e.target.value})}
                    value={changeSupplierInfo.address} 
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
                  id="updateSupplierBtn"                  
                  className="btn btn-primary"
                  onClick={()=>supplierChangeHandle(changeSupplierInfo._id)}
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
                Tedarikçi Ekle
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
                    Ad
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
                    htmlFor="exampleFormControlInput2"
                    className="form-label"
                  >
                    Soyad
                  </label>
                  <input
                    name="surname"
                    value={formik.values.surname}
                    onChange={formik.handleChange}
                    type="text"
                    className="form-control"
                    id="exampleFormControlInput2"
                    placeholder="Soyad"
                  />
                </div>
                <div className="mb-3">
                  <label
                    htmlFor="exampleFormControlInput3"
                    className="form-label"
                  >
                    Email
                  </label>
                  <input
                    name="email"
                    value={formik.values.email}
                    onChange={formik.handleChange}
                    type="email"
                    className="form-control"
                    id="exampleFormControlInput3"
                    placeholder="Email"
                  />
                </div>
                <div className="mb-3">
                  <label
                    htmlFor="exampleFormControlInpu4"
                    className="form-label"
                  >
                    Telefon
                  </label>
                  <input
                    name="phoneNumber"
                    value={formik.values.phoneNumber}
                    onChange={formik.handleChange}
                    type="text"
                    className="form-control"
                    id="exampleFormControlInput4"
                    placeholder="0555 555 55 55"
                  />
                </div>
                <div className="mb-3">
                  <label
                    htmlFor="exampleFormControlTextarea1"
                    className="form-label"
                  >
                    Adres
                  </label>
                  <textarea
                    name="address"
                    value={formik.values.address}
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
                  id="addSupplierBtn"
                  type="submit"
                  className="btn btn-primary"
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
              <h4 className="card-title">Tedarikçiler Tablosu</h4>
              <div className="form-outline ">
                <input
                  type="search"
                  onChange={(e) => setSearch(e.target.value)}
                  onFocus = {(e)=> setCurrentPage(1)}
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
                    <th className="border-0">Ad</th>
                    <th className="border-0">Soyad</th>
                    <th className="border-0">Adres</th>
                    <th className="border-0">Email</th>
                    <th className="border-0">Telefon</th>
                    <th className="border-0">Güncelle</th>
                    <th className="border-0">Sil</th>
                  </tr>
                </thead>
                <tbody>
                  {suppliers?.value.map((supplier, id) => (
                    <tr key={id + 1}>
                      <td>
                        {limit === "all"
                          ? id + 1
                          : id + 1 + (currentPage - 1) * limit}
                      </td>                      
                          <td>{supplier.name}</td>
                          <td>{supplier.surname}</td>
                          <td>{supplier.address}</td>
                          <td>{supplier.email}</td>
                          <td>{supplier.phoneNumber}</td>
                          <td className="table-update-td">
                            <i
                              onClick={() => setChangeSupplierInfo(supplier)}
                              data-bs-toggle="modal"
                              data-bs-target="#changeSupplierModal"                              
                              className="fa-solid fa-pen-to-square"
                            ></i></td>
                            <td>
                            <i
                              onClick={() =>
                                deleteSupplierHandler(supplier._id)
                              }
                              className="fa-solid fa-trash-can"
                            ></i>
                          </td>                        
                    </tr>
                  ))}
                </tbody>
              </table>
              {suppliers?.value.length < 1 && (
                <div
                  style={{
                    textAlign: "center",
                    fontSize: "22px",
                    color: "#767676",
                  }}
                >
                  Tedarikçi Bulunamadı
                </div>
              )}

              {(limit === "all"||suppliers?.value.length < 1) ? (
                ""
              ) : (
                <div className="page-buttons">
                  <span>
                    {limit === "all"
                      ? ""
                      : `${currentPage * limit + 1 - limit}-${
                          suppliers?.page === currentPage
                            ? suppliers?.total
                            : currentPage * limit
                        } of ${suppliers?.total}`}
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
                  {/* {!loading &&
                    [...Array(suppliers?.page)].map((x, i) => (
                      <button
                        key={i + 1}
                        className={
                          currentPage === i + 1? "current-page":""
                        }
                        disabled={currentPage === i + 1}
                        onClick={() => setCurrentPage(i + 1)}
                        type="button"
                      >
                        {i + 1}
                      </button>
                    ))} */}
                  <button
                    disabled={currentPage === suppliers?.page}
                    className={
                      currentPage === suppliers?.page ? "current-page" : ""
                    }
                    onClick={() => setCurrentPage(currentPage + 1)}
                    type="button"
                  >
                    <i className="fa-solid fa-angle-right"></i>
                  </button>
                  <button
                    disabled={currentPage === suppliers?.page}
                    className={
                      currentPage === suppliers?.page ? "current-page" : ""
                    }
                    onClick={() => setCurrentPage(suppliers?.page)}
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

export default Supplier;
