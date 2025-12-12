import { Border, Box, Cheese, Crust, Olive, Peperoni, Slice } from './styled';

export const PizzaLoader = () => {
  return (
    <Box>
      <Slice variant={1}>
        <Border>
          <Crust />
          <Cheese>
            <Peperoni variant="p1" />
            <Peperoni variant="p2" />
            <Peperoni variant="p3" />
            <Olive variant="o1" />
            <Olive variant="o3" />
            <Olive variant="o4" />
            <Olive variant="o6" />
            <Olive variant="o7" />
          </Cheese>
        </Border>
      </Slice>
      <Slice variant={2}>
        <Border>
          <Crust />
          <Cheese>
            <Peperoni variant="p1" />
            <Peperoni variant="p2" />
            <Peperoni variant="p3" />
            <Olive variant="o1" />
            <Olive variant="o2" />
            <Olive variant="o3" />
            <Olive variant="o6" />
            <Olive variant="o7" />
          </Cheese>
        </Border>
      </Slice>
      <Slice variant={3}>
        <Border>
          <Crust />
          <Cheese>
            <Peperoni variant="p1" />
            <Peperoni variant="p2" />
            <Peperoni variant="p3" />
            <Olive variant="o3" />
            <Olive variant="o4" />
            <Olive variant="o5" />
            <Olive variant="o6" />
          </Cheese>
        </Border>
      </Slice>
      <Slice variant={4}>
        <Border>
          <Crust />
          <Cheese>
            <Peperoni variant="p1" />
            <Peperoni variant="p2" />
            <Peperoni variant="p3" />
            <Olive variant="o1" />
            <Olive variant="o2" />
            <Olive variant="o3" />
            <Olive variant="o4" />
          </Cheese>
        </Border>
      </Slice>
      <Slice variant={5}>
        <Border>
          <Crust />
          <Cheese>
            <Peperoni variant="p1" />
            <Peperoni variant="p2" />
            <Peperoni variant="p3" />
            <Olive variant="o1" />
            <Olive variant="o2" />
            <Olive variant="o6" />
            <Olive variant="o7" />
          </Cheese>
        </Border>
      </Slice>
    </Box>
  );
};
