import React from "react";
import { FlatList } from "react-native";

/**
 * Higher-Order Component (HOC) to wrap a component with FlatList listing functionality.
 * @param WrappedComponent Component to be wrapped with FlatList functionality.
 * @param data Array of data to be rendered in the FlatList.
 * @param keyExtractor Function to extract a unique key for each item.
 * @param renderItem Function to render each item.
 * @param ListEmptyComponent Component to render when the list is empty.
 */
const withFlatList = (
  WrappedComponent,
  data,
  keyExtractor,
  renderItem,
  ListEmptyComponent
) => {
  return () => (
    <FlatList
      data={data}
      keyExtractor={keyExtractor}
      renderItem={renderItem}
      ListEmptyComponent={ListEmptyComponent}
      // You can add more props here as needed (e.g., ListHeaderComponent, ListFooterComponent, etc.)
      // {...additionalProps}
    />
  );
};

export default withFlatList;
