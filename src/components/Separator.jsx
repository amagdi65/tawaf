import styled from "@emotion/styled";

const SeparatorStyle = styled.div`
  color: #cbaf86;
  border-right: 1px solid #cbaf86;
  height: 48px;
  margin-right: 39px;
  margin-left: 39px;
  float: ${(props) => props.dir === 'ltr' ? 'left': ''}

`;
function Separator({ dir }) {
  return <SeparatorStyle dir={dir}></SeparatorStyle>;
}

export default Separator;
