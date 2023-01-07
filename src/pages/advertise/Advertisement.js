import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../firebase/AuthProvider";
import BookModal from "../bookModal/BookModal";

const Advertisement = () => {
  const { user, theme } = useContext(AuthContext);
  console.log(user?.email);

  const [advertises, setAdvertise] = useState([]);
  useEffect(() => {
    axios
      .get(`https://sh-server-site.vercel.app/advertise?email=${user?.email}`, {
        headers: {
          authorization: `bearer ${localStorage.getItem("accessToken")}`,
        },
      })
      .then((data) => {
        //   console.log(data.data);
        setAdvertise(data.data);
      });
  }, [user?.email]);

  const [paids, setPaid] = useState([]);

  useEffect(() => {
    axios.get(`https://sh-server-site.vercel.app/payment`).then((data) => {
      //   console.log(data.data);
      setPaid(data.data);
    });
  }, []);

  // console.log(paids);

  const [productInfo, setproducts] = useState({});
  const [isModal, setModal] = useState(true);

  const productData = (data) => {
    setproducts(data);
    // console.log(data);
  };

  return (
    <div className={` max-w-[98%] my-10 mx-auto  mt-[30px] ${theme || "t"}`}>
      <h1 className="text-5xl text-center py-5 font-bold mt-10 font-serif">
        Available Products{" "}
      </h1>
      <p   className={` text-lg font-semibold text-center ${theme ? "textColorHover1" : "textColorHover2"}`}> These Projects are advertised by the Seller who are verified .The Products did not sell yet .</p>
      <div
        className="mt-9 grid sm:grid-cols-1
    md:grid-cols-2  lg:grid-cols-3 gap-5"
      >
        {advertises?.map((advertise) => {
          const { name, price, img, descriptions } = advertise;
          // console.log(paids);
          const alreadyPaid = paids.find(
            (pay) => pay?.name === advertise?.name
          );
          // console.log(alreadyPaid);
          if (!alreadyPaid) {
            return (
              <div className="card  mx-auto w-[90%] shadow-lg  ">
                <figure className="">
                  <img className="w-[90%] mx-auto h-[250px] rounded-[3%]" src={img} alt="img" />
                </figure>
                <div className="card-body">
                  <h2 className="text-2xl textColor1 font-bold font-serif">{name}</h2>
                  <p className={` font-semibold ${theme ? "textColorHover1" : "textColorHover2"}`}>{descriptions}</p>
                  <div className="flex justify-between bg-slate-100 shadow pr-2">
                    <label
                      onClick={() => productData(advertise)}
                      htmlFor="my-modal-6"
                      className="btn1 py-2 px-2  hover:translate-x-7 duration-500 ease-in-out cursor-pointer"
                    >
                      Book Now
                    </label>
                    <button className="font-bold text-slate-500 text-lg font-mono rounded">
                    Price:${price}
                    </button>
                  </div>
                </div>
                {isModal && (
                  <BookModal productInfo={productInfo} setModal={setModal} />
                )}
              </div>
            );
          }
        })}
      </div>
    </div>
  );
};

export default Advertisement;
