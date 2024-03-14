import React, { useEffect, useState } from "react";
import UserTable from "../../components/table/UserTable";
import useWishList from "../../hooks/crudApis/useWishList";
import IWishList from "../../interfaces/IWishList";

const UserWishList = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [wishList, setWishList] = useState<IWishList[]>([]);
  var wishListRequest: any = useWishList();

  const getData = async () => {
    setIsLoading(true);
    try {
      const res = await wishListRequest.getByUser();
      setWishList(res.data);
    } catch (e) {
      console.error(e);
    }
    setTimeout(() => {
      setIsLoading(false);
    }, 400);
  };

  useEffect(() => {
    getData();
  }, []);

  const header = [
    { title: "Plot No.", field: "plotNumber" },
    { title: "Estate", field: "plot.estate" },
    { title: "Size", field: "plot.size" },
    { title: "Price", field: "plot.totalCashPrice" },
    { title: "Day added", field: "dayAdded" },
    { title: "Status", field: "status" }
  ];
  return (
    <UserTable
      plotDetailButton={true}
      removeButton={true}
      buyNowButton={["available"]}
      header={header}
      items={wishList}
      title="WISH LIST"
      loading={isLoading}
    />
  );
};

export default UserWishList;
