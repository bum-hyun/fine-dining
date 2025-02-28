import styled from '@emotion/styled';
import { ChangeEvent } from 'react';

interface ISelectProps<T> {
  menuList: { value: T; name: string }[];
  onClickMenu: (value: string) => void;
}

const Select = <T,>({ menuList, onClickMenu }: ISelectProps<T>) => {
  const handleSelect = (event: ChangeEvent<HTMLSelectElement>) => {
    onClickMenu(event.target.value);
  };

  return (
    <Container>
      <MenuWrap onChange={handleSelect}>
        {menuList.map(menu => (
          <Menu key={menu.name} value={menu.value as string}>
            {menu.name}
          </Menu>
        ))}
      </MenuWrap>
    </Container>
  );
};

export default Select;

const Container = styled.div`
  position: relative;
`;

const MenuWrap = styled.select`
  display: flex;
  flex-direction: column;
  font-size: 14px;
  font-weight: 400;
  line-height: 20px;
  color: #777;
  border: none;
  cursor: pointer;
`;

const Menu = styled.option``;
