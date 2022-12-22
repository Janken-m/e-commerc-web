import styled from "styled-components";
import { mobile } from "../responsive";
import CategoryItem from "./CategoryItem";
import { useGetCategoriesQuery } from "../store/Api";
import { categories } from "../data";

const Container = styled.div`
  display: flex;
  padding: 20px;
  justify-content: space-between;
  ${mobile({ padding: "0px", flexDirection: "column" })}
`;

const Categories = () => {
  // const { data: categories } = useGetCategoriesQuery("Categories");
  return (
    <Container>
      {categories.map((item: any) => (
        <CategoryItem item={item} key={item.id} />
      ))}
    </Container>
  );
};

export default Categories;
