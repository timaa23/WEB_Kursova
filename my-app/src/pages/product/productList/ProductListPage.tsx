import { toast } from "react-toastify";
import { useActions } from "../../../hooks/useActions";
import { useTypedSelector } from "../../../hooks/useTypedSelector";
import { useEffect } from "react";
import { IProductItem } from "../store/types";
import { Grid } from "@mui/material";
import ProductCard from "../../../components/productCard";

const ProductListPage: React.FC = () => {
  const { GetProductList } = useActions();
  const { list } = useTypedSelector((store) => store.product);

  const LoadProducts = async () => {
    try {
      await GetProductList();
    } catch (error: any) {
      toast.error(error);
    }
  };

  useEffect(() => {
    LoadProducts();
  }, []);

  return (
    <Grid container rowSpacing={2}>
      {list.map((product: IProductItem) => (
        <Grid key={product.id} item xs={3}>
          <ProductCard product={product} />
        </Grid>
      ))}
    </Grid>
  );
};

export default ProductListPage;
